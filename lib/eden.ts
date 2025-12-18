import { treaty } from '@elysiajs/eden'
import type { App } from '../app/api/[[...slugs]]/route'

const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
const base = typeof window !== 'undefined'
	? window.location.origin
	: (process.env.NEXT_PUBLIC_BASE_URL ?? vercelUrl ?? 'http://localhost:3000')

export const client = treaty<App>(base).api
