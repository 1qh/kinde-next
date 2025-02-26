'use client'

import { useState } from 'react'
import { CreateOrgLink } from '@kinde-oss/kinde-auth-nextjs/components'

import { Dialog, DialogContent, DialogTrigger } from '@a/ui/dialog'
import { Input } from '@a/ui/input'

const CreateOrg = () => {
  const [orgName, setOrgName] = useState('')
  return (
    <Dialog>
      <DialogTrigger>Create an Organization to try free feature</DialogTrigger>
      <DialogContent>
        <Input onChange={e => setOrgName(e.target.value)} value={orgName} />
        <CreateOrgLink orgName={orgName}>Create</CreateOrgLink>
      </DialogContent>
    </Dialog>
  )
}

export default CreateOrg
