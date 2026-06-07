import { config } from 'dotenv'
config({ path: '.env.local' })

async function testKimiModels() {
  const apiKey = process.env.KIMI_API_KEY
  const res = await fetch('https://api.moonshot.cn/v1/models', {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  console.log('Status:', res.status)
  const data = await res.json()
  console.log('Models:', JSON.stringify(data, null, 2).slice(0, 500))
}

testKimiModels()
