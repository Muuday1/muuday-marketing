// Simulate Vercel serverless environment
import fs from 'fs'
import path from 'path'

console.log('process.cwd():', process.cwd())
console.log('__dirname:', typeof __dirname !== 'undefined' ? __dirname : 'undefined')

const candidates = [
  path.join(process.cwd(), 'public', 'fonts'),
  path.join(process.cwd(), 'fonts'),
  path.join('/var/task', 'public', 'fonts'),
]

for (const dir of candidates) {
  console.log('Checking:', dir)
  console.log('  Exists:', fs.existsSync(dir))
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir)
    console.log('  Files:', files)
  }
}
