import { supabaseServer } from './supabase-client'

const BUCKET = 'marketing-assets'

/**
 * Upload a buffer to Supabase Storage and return the public URL.
 * Uses service role key (bypasses RLS).
 */
export async function uploadAsset(
  path: string,
  buffer: Buffer,
  contentType = 'image/png'
): Promise<string> {
  const { error } = await supabaseServer.storage.from(BUCKET).upload(path, buffer, {
    contentType,
    upsert: true,
  })

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`)
  }

  const { data } = supabaseServer.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Delete an asset from Supabase Storage.
 */
export async function deleteAsset(path: string): Promise<void> {
  const { error } = await supabaseServer.storage.from(BUCKET).remove([path])
  if (error) {
    throw new Error(`Storage delete failed: ${error.message}`)
  }
}
