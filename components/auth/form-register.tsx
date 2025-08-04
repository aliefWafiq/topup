'use client'
import { SubmitButton } from '@/components/button'
import Link from 'next/link'
import { signUpCredentials } from '@/lib/action'
import { useFormState } from 'react-dom'

const FormRegister = () => {
  const [state, formAction] = useFormState(signUpCredentials, null)
  return (
    <form action={formAction} className='space-y-6'>
        {state?.message ? (
        <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100' role='alert'>
            <span className='font-medium'>{state?.message}</span>
        </div>
        ): null}
        <div>
            <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900'>Name</label>
            <input type="text" name='name' placeholder='Slim shady' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5'/>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.name}</span>
            </div>
        </div>
         <div>
            <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
            <input type="email" name='email' placeholder='slimshady@gmail.com' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5'/>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.email}</span>
            </div>
        </div>
         <div>
            <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
            <input type="password" name='password' placeholder='*******' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5'/>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.password}</span>
            </div>
        </div>
         <div>
            <label htmlFor="confirmPassword" className='block mb-2 text-sm font-medium text-gray-900'>Confrim Password</label>
            <input type="password" name='confrimPassword' placeholder='*******' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5'/>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.confrimPassword}</span>
            </div>
        </div>
        <SubmitButton label='submit'/>
        <Link href="/login" className='text-blue-600'>Already have an account?</Link>
    </form>
  )
}

export default FormRegister