import React, { useEffect, useState } from 'react'
import api from '../instance/instance'
import useUser from './hooks/useUser'

const UserCard = ({ user }) => {
    const [message, setMessage] = useState([{}])
    const [use, setUser] = useState({})
    // get Last message of user 
    const { currentUser } = useUser()

    useEffect(() => {
        api.get(`/users/get/${user}`)
            .then(res => setUser(res.data))

        api.get(`/message/message/${currentUser?.email}/${user}`)
            .then(res => setMessage(res.data?.reverse()))
    }, [])
    return (
        <div className='my-3 flex items-center cursor-pointer'>
            <div className="avater w-10 h-10 rounded-full overflow-hidden">
                <img src={use.photoURL} alt="" />
            </div>
            <div className='ml-2'>
                <h2 className='text-[15px]'>{use?.name}</h2>
                {
                    message[0]?.message ?
                        <p className='text-xs primary'>{message[0]?.message}</p>
                        :
                        <p className='text-xs primary'>{message[0]?.sticker}</p>
                }
            </div>
        </div>
    )
}

export default UserCard