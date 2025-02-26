import Image from 'next/image'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { init, Organizations, Roles, Users } from '@kinde/management-api-js'

import info from '~/components/info'
import Submit from '~/components/submit'

const Page = async () => {
  const {
      getAccessToken,
      getIdToken,
      getOrganization,
      getPermissions,
      getRoles,
      getUser,
      getUserOrganizations
    } = getKindeServerSession(),
    accessToken = await getAccessToken(),
    idToken = await getIdToken(),
    my_roles = await getRoles(),
    organization = await getOrganization(),
    permissions = await getPermissions(),
    user = await getUser(),
    userOrgs = await getUserOrganizations()
  init()
  const { roles } = await Roles.getRoles(),
    { users } = await Users.getUsers(),
    { organizations } = await Organizations.getOrganizations()

  return (
    <>
      <form
        action={async () => {
          'use server'
          await getKindeServerSession().refreshTokens()
        }}>
        <Submit>Refresh</Submit>
      </form>
      my_roles: {info(my_roles)}
      all_roles: {info(roles ?? [])}
      users: {info(users ?? [])}
      organizations: {info(organizations ?? [])}
      {user.picture ? <Image alt='' height={100} src={user.picture} width={100} /> : null}
      accessToken: {info(accessToken ?? {})}
      idToken: {info(idToken)}
      organization: {info(organization)}
      permissions: {info(permissions)}
      user: {info(user)}
      userOrgs: {info(userOrgs)}
    </>
  )
}

export default Page
