import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { init, Organizations, Roles } from '@kinde/management-api-js'

import Submit from '~/components/submit'

const Buy = ({ orgCode, userId }: { readonly orgCode: string; readonly userId: string }) => {
  init()
  return (
    <form
      action={async () => {
        'use server'
        const { roles } = await Roles.getRoles(),
          role_id = roles?.find(({ key }) => key === 'owner')?.id
        console.log(
          await Organizations.createOrganizationUserRole({
            orgCode,
            requestBody: { role_id },
            userId
          })
        )
        await getKindeServerSession().refreshTokens()
      }}>
      <Submit>Buy</Submit>
    </form>
  )
}

export default Buy
