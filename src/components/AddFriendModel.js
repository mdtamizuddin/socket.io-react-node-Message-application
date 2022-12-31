import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import api from '../instance/instance'
import useUser from './hooks/useUser'

const AddFriendModel = () => {
    const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [exist, setExist] = useState(false)
    const { currentUser, refetch } = useUser()
    const search = (email) => {
        const eemail = email.toLowerCase()

        setEmail(email)
        const isEmail = email.includes("@", ".")
        if (isEmail) {
            api.get(`/users/get/${eemail}`)
                .then(res => {
                    setUser(res.data)
                    setExist(currentUser?.friendList?.filter(u => u === res.data.email))
                })
        }
    }

    const addFriend = () => {
        const newFriend = { email: user.email, user: currentUser?.email }
        api.put('/users/add-friend', newFriend)
            .then(res => {
                if (res.data.success === true) {
                    toast.success(`${user.email} Is Now added On Your Friend List`)
                    refetch()
                }
                else {
                    toast.error(res.data.message)
                    console.log(res.data)
                }
            })
    }

    return (
        <div className='h-72 w-full bg-gray-300 rounded-lg p-2 
        animate__animated animate__fadeInLeft
        '>
            <div className="relative  md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                    <span className="sr-only">Search icon</span>
                </div>
                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Friend Email"
                    onChange={(e) => search(e.target.value)}
                />
            </div>

            <div>
                {
                    email.length > 5 && <p>
                        {
                            !user.email &&
                            <span>{email} Not Found</span>
                        }
                    </p>
                }
                {
                    user.email
                    &&
                    <div className='my-2 flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div className="avater w-10 h-10 rounded-full overflow-hidden">
                                <img src={user.photoURL} alt="" />
                            </div>
                            <div className='ml-2'>
                                <h2 className='text-sm'>{user.name}</h2>
                                {
                                    user.email === currentUser?.email &&
                                    <h2 className='text-green-400'>You</h2>
                                }
                            </div>
                        </div>
                        {
                            user.email !== currentUser?.email &&
                            <button
                                onClick={addFriend}
                                className={`text-center ${exist ? "bg-green-600" : "bg-primary"} text-white font-bold py-1 px-3 text-sm rounded`}>
                                {
                                    "Add"
                                }
                            </button>
                        }

                    </div>
                }
            </div>
        </div>
    )
}

export default AddFriendModel