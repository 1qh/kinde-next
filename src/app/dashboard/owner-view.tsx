import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { init, Organizations, Permissions, Users } from '@kinde/management-api-js'

import { Input } from '@a/ui/input'

import info from '~/components/info'
import Submit from '~/components/submit'

const OwnerView = async ({ orgCode }: { readonly orgCode: string }) => {
  init()
  const orgUsers = (await Organizations.getOrganizationUsers({ orgCode, pageSize: 100 }))
    .organization_users
  return (
    <>
      Users in my org: {info(orgUsers ?? [])}
      Add new user to my org:
      <form
        action={async (fd: FormData) => {
          'use server'
          const email = fd.get('email') as string,
            { users } = await Users.getUsers({ email }),
            id = users?.[0]?.id,
            role = fd.get('role') as string

          if (id) {
            console.log(
              await Organizations.addOrganizationUsers({
                orgCode,
                requestBody: { users: [{ id, roles: [role] }] }
              })
            )
            await getKindeServerSession().refreshTokens()
          }
        }}>
        email: <Input name='email' />
        role: <Input name='role' />
        <Submit>Add user</Submit>
      </form>
      Grant permissions to user in my org:
      <form
        action={async (fd: FormData) => {
          'use server'
          const email = fd.get('email') as string,
            { users } = await Users.getUsers({ email }),
            permission = fd.get('permission') as string,
            userId = users?.[0]?.id

          if (userId) {
            const { permissions } = await Permissions.getPermissions({ pageSize: 100 }),
              permission_id = permissions?.find(({ key }) => key === permission)?.id
            console.log(
              await Organizations.createOrganizationUserPermission({
                orgCode,
                requestBody: { permission_id },
                userId
              })
            )
            await getKindeServerSession().refreshTokens()
          }
        }}>
        email: <Input name='email' />
        permission: <Input name='permission' />
        <Submit>Grant</Submit>
      </form>
    </>
  )
}

export default OwnerView
