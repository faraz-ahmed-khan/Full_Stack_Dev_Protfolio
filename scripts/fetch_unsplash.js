const https = require('https')
const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'public', 'assets')
const testDir = path.join(__dirname, '..', 'public', 'testimonials')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true })

const items = [
  { url: 'https://source.unsplash.com/1200x800/?workspace,developer,portrait', dest: path.join(outDir, 'hero.jpg') },
  { url: 'https://source.unsplash.com/800x600/?portrait,headshot', dest: path.join(outDir, 'about.jpg') },
  { url: 'https://source.unsplash.com/600x400/?ecommerce,web', dest: path.join(outDir, 'portfolio-1.jpg') },
  { url: 'https://source.unsplash.com/600x400/?restaurant,food,website', dest: path.join(outDir, 'portfolio-2.jpg') },
  { url: 'https://source.unsplash.com/600x400/?task,app,productivity', dest: path.join(outDir, 'portfolio-3.jpg') },
  { url: 'https://source.unsplash.com/600x400/?portfolio,photography', dest: path.join(outDir, 'portfolio-4.jpg') },
  { url: 'https://source.unsplash.com/600x400/?learning,education,platform', dest: path.join(outDir, 'portfolio-5.jpg') },
  { url: 'https://source.unsplash.com/600x400/?crypto,dashboard', dest: path.join(outDir, 'portfolio-6.jpg') },
  { url: 'https://source.unsplash.com/600x400/?nextjs,web', dest: path.join(outDir, 'blog-1.jpg') },
  { url: 'https://source.unsplash.com/600x400/?3d,webgl', dest: path.join(outDir, 'blog-2.jpg') },
  { url: 'https://source.unsplash.com/600x400/?smallbusiness', dest: path.join(outDir, 'blog-3.jpg') },
  { url: 'https://source.unsplash.com/600x400/?framer-motion,animation', dest: path.join(outDir, 'blog-4.jpg') },
  { url: 'https://source.unsplash.com/600x400/?typescript,code', dest: path.join(outDir, 'blog-5.jpg') },
  { url: 'https://source.unsplash.com/600x400/?css,grid', dest: path.join(outDir, 'blog-6.jpg') },
  // testimonials (some already exist but we re-download to ensure they're jpgs from Unsplash)
  { url: 'https://source.unsplash.com/400x400/?woman,portrait', dest: path.join(testDir, 'sarah.jpg') },
  { url: 'https://source.unsplash.com/400x400/?man,portrait', dest: path.join(testDir, 'ahmed.jpg') },
  { url: 'https://source.unsplash.com/400x400/?woman,portrait,smile', dest: path.join(testDir, 'maria.jpg') },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
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
  console.log('Starting downloads:', items.length)
  for (const it of items) {
    try {
      process.stdout.write('Downloading ' + path.basename(it.dest) + '... ')
      await download(it.url, it.dest)
      console.log('done')
    } catch (err) {
      console.error('ERROR downloading', it.url, err.message)
    }
  }
  console.log('All downloads attempted')
})()
