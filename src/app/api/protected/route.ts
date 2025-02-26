import { NextResponse } from 'next/server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const GET = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    return new Response('Unauthorized', { status: 401 })
  }

  const user = await getUser(),
    data = { id: user.given_name, message: 'Hello User' }

  return NextResponse.json({ data })
}
