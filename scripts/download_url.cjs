const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

// Usage:
// node scripts/download_url.cjs <url> <output-relative-path>
// Example:
// node scripts/download_url.cjs "https://example.com/image.jpg" "public/assets/portfolio-2.jpg"

async function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 6) return reject(new Error('Too many redirects'))
    const file = fs.createWriteStream(dest)
    const urlObj = new URL(url)
    const client = urlObj.protocol === 'https:' ? https : http
    const req = client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume()
        const nextUrl = new URL(res.headers.location, url).toString()
        download(nextUrl, dest, redirects + 1).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url} (status ${res.statusCode})`))
        return
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    })
    req.on('error', (err) => {
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

;(async () => {
  const [,, url, outRel] = process.argv
  if (!url || !outRel) {
    console.error('Usage: node scripts/download_url.cjs <url> <output-relative-path>')
    process.exit(1)
  }
  const outPath = path.isAbsolute(outRel) ? outRel : path.join(process.cwd(), outRel)
  const dir = path.dirname(outPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  try {
    process.stdout.write(`Downloading ${url} -> ${outPath}... `)
    await download(url, outPath)
    console.log('done')
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(2)
  }
})()
