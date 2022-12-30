import React, { useEffect, useState } from 'react'
import api from '../instance/instance'

const UserCard = ({ user }) => {
    const [message, setMessage] = useState([])
    const [use, setUser] = useState({})

    useEffect(() => {
        api.get(`/users/get/${user}`)
            .then(res => setUser(res.data))
    }, [])
    return (
        <div className='my-2 flex items-center'>
            <div className="avater w-10 h-10 rounded-full overflow-hidden">
                <img src={use.photoURL} alt="" />
            </div>
            <div className='ml-2'>
                <h2 className='text-sm'>{use.name}</h2>

            </div>
        </div>
    )
}

export default UserCard