'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@a/ui/button'

const Submit = ({ children }: { readonly children: React.ReactNode }) => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type='submit'>
      {children}
    </Button>
  )
}

export default Submit
