import FormLogin from '@/components/auth/form-login'

const Login = () => {
  return (
    <div className='space-y-4 w-full'>
        <h1 className='text-2xl font-bold text-gray-900'>Sign in to your account</h1>
        <FormLogin/>
    </div>
  )
}

export default Login