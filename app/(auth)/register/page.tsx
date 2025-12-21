import FormRegister from '@/components/auth/form-register'
import React from 'react'
import Image from 'next/image'

const Register = () => {
  return (
    <div className='w-full flex'>
        <div className='relative w-2/3 rounded-lg overflow-hidden'>
          <Image
            src="/ZZZ Burnice and Anby Zenless Zone Zero.jpg"
            alt="Register Illustration"
            fill
            className='object-cover'
          />
        </div>
        <div className='mx-4 w-1/2'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Create an account</h1>
          <FormRegister/>
        </div>
    </div>
  )
}

export default Register