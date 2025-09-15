const https = require('https')
const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'public', 'assets')
const testDir = path.join(__dirname, '..', 'public', 'testimonials')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true })

const items = [
  { url: 'https://picsum.photos/1200/800', dest: path.join(outDir, 'hero.jpg') },
  { url: 'https://picsum.photos/800/600', dest: path.join(outDir, 'about.jpg') },
  { url: 'https://picsum.photos/600/400?random=1', dest: path.join(outDir, 'portfolio-1.jpg') },
  { url: 'https://picsum.photos/600/400?random=2', dest: path.join(outDir, 'portfolio-2.jpg') },
  { url: 'https://picsum.photos/600/400?random=3', dest: path.join(outDir, 'portfolio-3.jpg') },
  { url: 'https://picsum.photos/600/400?random=4', dest: path.join(outDir, 'portfolio-4.jpg') },
  { url: 'https://picsum.photos/600/400?random=5', dest: path.join(outDir, 'portfolio-5.jpg') },
  { url: 'https://picsum.photos/600/400?random=6', dest: path.join(outDir, 'portfolio-6.jpg') },
  { url: 'https://picsum.photos/600/400?random=7', dest: path.join(outDir, 'blog-1.jpg') },
  { url: 'https://picsum.photos/600/400?random=8', dest: path.join(outDir, 'blog-2.jpg') },
  { url: 'https://picsum.photos/600/400?random=9', dest: path.join(outDir, 'blog-3.jpg') },
  { url: 'https://picsum.photos/600/400?random=10', dest: path.join(outDir, 'blog-4.jpg') },
  { url: 'https://picsum.photos/600/400?random=11', dest: path.join(outDir, 'blog-5.jpg') },
  { url: 'https://picsum.photos/600/400?random=12', dest: path.join(outDir, 'blog-6.jpg') },
  { url: 'https://picsum.photos/400/400?random=13', dest: path.join(testDir, 'sarah.jpg') },
  { url: 'https://picsum.photos/400/400?random=14', dest: path.join(testDir, 'ahmed.jpg') },
  { url: 'https://picsum.photos/400/400?random=15', dest: path.join(testDir, 'maria.jpg') },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, dest))
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Failed to get ' + url + ', status ' + res.statusCode))
      }
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => file.close(() => resolve(dest)))
      file.on('error', (err) => reject(err))
    }).on('error', (err) => reject(err))
  })
}

;(async () => {
  console.log('Starting picsum downloads:', items.length)
  for (const it of items) {
    try {
      process.stdout.write('Downloading ' + require('path').basename(it.dest) + '... ')
      await download(it.url, it.dest)
      console.log('done')
    } catch (err) {
      console.error('ERROR downloading', it.url, err.message)
    }
  }
  console.log('All picsum downloads attempted')
})()
