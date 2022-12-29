import React, { useEffect, useState } from 'react'

const UserCard = ({ user }) => {
    const [message, setMessage] = useState([])
    useEffect(() => {
        
    }, [])
    return (
        <div className='my-2 flex items-center'>
            <div className="avater w-10 h-10 rounded-full overflow-hidden">
                <img src={user.photoURL} alt="" />
            </div>
            <div className='ml-2'>
                <h2 className='text-sm'>{user.name}</h2>

            </div>
        </div>
    )
}

export default UserCard