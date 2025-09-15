const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

// This script downloads themed images from picsum.photos using fixed seeds to produce
// more relevant-consistent images for the portfolio (e.g. 'workspace', 'restaurant', 'app', 'photography', 'learning', 'finance').
// It saves them into public/assets and public/testimonials. Run with: node scripts/fetch_seeded_picsum.cjs

const outDir = path.join(__dirname, '..', 'public', 'assets')
const testimonialsDir = path.join(__dirname, '..', 'public', 'testimonials')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
if (!fs.existsSync(testimonialsDir)) fs.mkdirSync(testimonialsDir, { recursive: true })

const items = [
  { name: 'hero', seed: 'studio-workspace', size: '1200/700' },
  { name: 'about', seed: 'creative-portrait', size: '1000/700' },
  { name: 'portfolio-1', seed: 'ecommerce-ui', size: '800/600' },
  { name: 'portfolio-2', seed: 'restaurant-interior', size: '800/600' },
  { name: 'portfolio-3', seed: 'mobile-app', size: '800/600' },
  { name: 'portfolio-4', seed: 'photography-gallery', size: '800/600' },
  { name: 'portfolio-5', seed: 'online-course', size: '800/600' },
  { name: 'portfolio-6', seed: 'crypto-dashboard', size: '800/600' },
  { name: 'blog-1', seed: 'design-process', size: '800/520' },
  { name: 'blog-2', seed: 'product-launch', size: '800/520' },
  { name: 'blog-3', seed: 'mobile-tutorial', size: '800/520' },
  { name: 'blog-4', seed: 'photography-tips', size: '800/520' },
  { name: 'blog-5', seed: 'education-platform', size: '800/520' },
  { name: 'blog-6', seed: 'market-analysis', size: '800/520' }
]

const testimonials = [
  { name: 'sarah', seed: 'sarah-profile', size: '400/400' },
  { name: 'ahmed', seed: 'ahmed-profile', size: '400/400' },
  { name: 'maria', seed: 'maria-profile', size: '400/400' }
]

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'))
    const file = fs.createWriteStream(dest)
    const urlObj = new URL(url)
    const client = urlObj.protocol === 'https:' ? https : http

    const req = client.get(url, (res) => {
      // follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // close current response and try again
        res.resume()
        const nextUrl = new URL(res.headers.location, url).toString()
        // retry with incremented redirect count
        download(nextUrl, dest, redirects + 1).then(resolve).catch(reject)
        return
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get ${url} (status ${res.statusCode})`))
        return
      }

      res.pipe(file)
      file.on('finish', () => {
        file.close(resolve)
      })
    })

    req.on('error', (err) => {
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

async function tryDownload(url, dest, attempts = 5) {
  let attempt = 0
  while (attempt < attempts) {
    try {
      await download(url, dest)
      return true
    } catch (err) {
      attempt++
      const wait = Math.min(2000 * Math.pow(2, attempt - 1), 15000)
      console.warn(`Attempt ${attempt} failed for ${url}: ${err.message}. Retrying in ${wait}ms...`)
      await new Promise((r) => setTimeout(r, wait))
    }
  }
  return false
}

;(async () => {
  const failed = []
  for (const it of items) {
    const url = `https://picsum.photos/seed/${encodeURIComponent(it.seed)}/${it.size}.jpg`
    const dest = path.join(outDir, `${it.name}.jpg`)
    process.stdout.write(`Downloading ${it.name} from ${url}... `)
    const ok = await tryDownload(url, dest)
    if (ok) {
      console.log('done')
    } else {
      console.log('failed')
      failed.push({ type: 'asset', name: it.name, url })
    }
  }

  for (const t of testimonials) {
    const url = `https://picsum.photos/seed/${encodeURIComponent(t.seed)}/${t.size}.jpg`
    const dest = path.join(testimonialsDir, `${t.name}.jpg`)
    process.stdout.write(`Downloading testimonial ${t.name} from ${url}... `)
    const ok = await tryDownload(url, dest)
    if (ok) {
      console.log('done')
    } else {
      console.log('failed')
      failed.push({ type: 'testimonial', name: t.name, url })
    }
  }

  if (failed.length) {
    console.warn('Some downloads failed after retries:')
    failed.forEach((f) => console.warn(`${f.type} ${f.name}: ${f.url}`))
    process.exitCode = 2
  } else {
    console.log('All seeded picsum downloads completed.')
  }
})()
