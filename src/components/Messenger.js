import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import api from '../instance/instance'
import Loading from './Loading'
import Message from './Message'
import UserCard from './UserCard'
import io from 'socket.io-client'
const socket = io.connect('https://mdtamiz.xyz')

const Messenger = () => {
    const [showInfo, setShowInfo] = useState(false)
    const [showSide, setShowSide] = useState(false)
    const [selected, setSelected] = useState({})
    const { isLoading, data } = useQuery({
        queryKey: ['All User'], queryFn:
            () => api.get('/users').then(res => {
                return res.data
            })
    })
    useEffect(() => {
        const sel = localStorage.getItem("selectedE")
        const nam = localStorage.getItem("selectedN")
        const selectedP = localStorage.getItem("selectedP")
        setSelected({
            email: sel,
            photoURL
                : selectedP, name: nam
        })
    }, [])
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='flex md:h-screen h-[92vh] w-full overflow-hidden'>
            <div className={`w-[300px]  ${showSide ? "" : "hidden md:block "} animate__animated animate__fadeInLeft h-full bg-blue-50 shadow-lg p-5 absolute md:relative z-30 `}>
                <div className='flex justify-end'>
                    <button className='text-3xl block md:hidden primary px-2'
                        onClick={() => setShowSide(false)}
                    >
                        <i className="fa-solid fa-toggle-on"></i>
                    </button>
                </div>
                <h1 className='text-3xl font-semibold mb-5'>
                    Chats
                </h1>
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User ..." />
                </div>
                <h2 className='text-[16px] font-semibold mt-2 ml-1'>
                    Inbox
                </h2>


                <div>
                    {
                        data?.map(user => {
                            return <div onClick={() => {
                                setSelected(user)
                                localStorage.setItem("selectedE", user.email)
                                localStorage.setItem("selectedN", user.name)
                                localStorage.setItem("selectedP", user.
                                    photoURL
                                )
                            }} key={user._id}>
                                <UserCard user={user} />
                            </div>
                        })
                    }
                </div>
            </div>

            {/* Users Profile section  */}
            {/* Users Profile section  */}

            <div className='w-full h-full'>
                <Message socket={socket} show={showInfo} setShow={setShowInfo} selectedUser={selected} showSide={showSide} setShowSide={setShowSide} />


            </div>
            {
                showInfo &&
                <div className='w-[15%] h-full bg-blue-50 shadow-lg p-5'>
                    <h1>Profiles</h1>
                </div>
            }
        </div>
    )
}

export default Messenger