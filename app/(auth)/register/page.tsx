import FormRegister from '@/components/auth/form-register'
import React from 'react'
import Image from 'next/image'

const Register = () => {
  return (
    <div className='space-y-4 w-full flex'>
        <div className='relative w-2/3'>
          <Image
            src=""
            alt="Register Illustration"
            fill
          />
        </div>
        <div className='mx-4 w-1/2'>
          <h1 className='text-2xl font-bold text-gray-900'>Create an account</h1>
          <FormRegister/>
        </div>
    </div>
  )
}

export default Register