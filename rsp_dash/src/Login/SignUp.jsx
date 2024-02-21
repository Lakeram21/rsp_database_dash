import React from 'react'

function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">Register Your Account</h2>

            <form className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email address
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border py-2 text-gray-900 placeholder:text-gray-400 focus:ring focus:ring-orange-300"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border py-2 text-gray-900 placeholder:text-gray-400 focus:ring focus:ring-orange-300"
                    />
                </div>

            
                <div>
                    <button
                    type="submit"
                    className="w-full rounded-md bg-orange-400 py-2 text-sm font-semibold text-white hover:bg-orange-300 focus:ring-orange-300"
                    >
                    Register
                    </button>
                </div>
            </form>

            {/* <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
            </a>
            </p> */}
        </div>
    </div>


  

)
}

export default SignUp