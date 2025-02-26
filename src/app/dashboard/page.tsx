import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import Buy from './buy'
import CreateOrg from './create-org'
import OwnerView from './owner-view'

const Page = async () => {
  const { getIdToken, getOrganization, getRoles, getUser } = getKindeServerSession(),
    { organizations } = await getIdToken(),
    { orgCode } = await getOrganization(),
    orgName = organizations?.find(({ id }) => id === orgCode)?.name,
    roles = await getRoles(),
    roles_key = roles?.map(({ key }) => key),
    roles_name = roles?.map(({ name }) => name),
    userId = (await getUser()).id

  return orgName && orgCode ? (
    <>
      Welcome to {orgName}, you can try free features
      <Buy orgCode={orgCode} userId={userId} />
      My roles: {roles_name?.join(', ')}
      <br />
      {roles_key?.includes('owner') ? <OwnerView orgCode={orgCode} /> : null}
    </>
  ) : (
    <CreateOrg />
  )
}

export default Page
