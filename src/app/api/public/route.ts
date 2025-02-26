import { NextResponse } from 'next/server'

export const GET = () => {
  const data = { message: 'Hello world' }
  return NextResponse.json({ data })
}
