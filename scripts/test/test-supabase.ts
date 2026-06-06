#!/usr/bin/env tsx
/**
 * Test Supabase connection.
 * Usage: npx tsx scripts/test/test-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'
import ws from 'ws'
import { config } from 'dotenv'

config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('FAIL: Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
  realtime: { transport: ws as unknown as typeof WebSocket },
})

async function main() {
  // Test 1: List tables
  const { data: tables, error } = await supabase
    .from('marketing_content_pieces')
    .select('id')
    .limit(1)

  if (error) {
    console.error('FAIL: Cannot query marketing_content_pieces:', error.message)
    console.error('Make sure tables are created: run SQL from docs/operations/database-schema.md')
    process.exit(1)
  }

  console.log('PASS: Supabase connected')
  console.log(`  URL: ${url}`)
  console.log(`  Tables found: marketing_content_pieces`)
  console.log(`  Rows: ${tables?.length ?? 0}`)

  // Test 2: Write test row
  const { data: inserted, error: insertError } = await supabase
    .from('marketing_content_pieces')
    .insert({ title: 'TEST — delete me', type: 'carousel', content: 'test', status: 'draft' })
    .select('id')
    .single()

  if (insertError) {
    console.error('FAIL: Cannot write to Supabase:', insertError.message)
    process.exit(1)
  }

  console.log('PASS: Write test row succeeded')

  // Test 3: Delete test row
  const { error: deleteError } = await supabase
    .from('marketing_content_pieces')
    .delete()
    .eq('id', inserted.id)

  if (deleteError) {
    console.error('FAIL: Cannot delete from Supabase:', deleteError.message)
    process.exit(1)
  }

  console.log('PASS: Delete test row succeeded')
  console.log('\nSupabase is READY')
}

main().catch((err) => {
  console.error('FAIL: Unexpected error:', err)
  process.exit(1)
})
