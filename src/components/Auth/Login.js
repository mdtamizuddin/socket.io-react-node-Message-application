import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase/firebase.init'
import Social from './Social'

const Login = () => {
    const navigate = useNavigate()
    const login = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        // const userInfo = { email, password }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast.success("Login Success")
                if (user) {
                    navigate('/')
                    localStorage.removeItem("selectedE")
                    localStorage.removeItem("selectedN")
                    localStorage.removeItem("selectedP")
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                toast.error(errorCode)
            });
    }
    return (
        <div>
            <section className="h-screen">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
                        <div className="md:w-8/12 hidden lg:block lg:w-6/12 mb-12 md:mb-0">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="w-full" alt="Phone" />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                            <form onSubmit={login}>
                                {/* Email input */}
                                <div className="mb-6">
                                    <input type="email"
                                        name='email'
                                        className="form-control block w-full px-4 py-2  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Email address"
                                        required
                                    />
                                </div>
                                {/* Password input */}
                                <div className="mb-6">
                                    <input name='password' type="password" className="form-control block w-full px-4 py-2  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck3" defaultChecked />
                                        <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
                                    </div>
                                    <a href="#!" className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">Forgot password?</a>
                                </div>
                                {/* Submit button */}
                                <button type="submit" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                    Sign in
                                </button>
                                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>
                                <p className='py-3 '>Not a user
                                    <Link className='ml-3 text-blue-500' to={'/signup'}>Signup</Link></p>
                                <Social />
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login