import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `useCdn` true = faster, cached reads (fine for public, mostly-static content)
  useCdn: process.env.NODE_ENV === 'production',
})
