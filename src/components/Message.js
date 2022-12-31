import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import api from '../instance/instance'
// import AddFriendModel from './AddFriendModel'
import { auth } from './Auth/firebase/firebase.init'
import useUser from './hooks/useUser'
import Loading from './Loading'
import tune from '../drop.mp3'

const Message = ({ show, setShow, socket, showSide, setShowSide, selected, setSelected, }) => {

    const { currentUser, } = useUser()
    // const [allmessage, setallmessage] = useState([])
    // const { isLoading, data: allmessage, refetch } = useQuery({
    //     queryKey: [`All Messages`], queryFn:
    //         () =>
    //           .then(res => {
    //                 // setallmessage(res.data)
    //                 return res.data
    //             })
    // })
    const { isLoading, data: allmessage, refetch } = useQuery({
        queryKey: [`our Messages`, currentUser, selected],
        queryFn: () => api.get(`/message/message/${currentUser?.email}/${selected?.email}`).
            then(res => res.data)
        ,
        refetchInterval: 10000
    })

    useEffect(() => {
        if (selected.length < 1) {
            const messageContainer = document.getElementById("messageContainer")
            messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight
        }
    }, [allmessage])
    // console.log(selected)
    useEffect(() => {
        const sound = new Audio(tune)
        socket.on("recive_message", (data) => {
            if (data?.message?.message?.receiver?.email === currentUser?.email) {
                refetch()
                sound.play()
            }

            // toast.success(`New Message ${data.message.sender.email}`)
        })
        // socket.on("user-joined", (data) => {
        //     setActive(data)
        //     clear()
        // })

        // socket.on("gaya", (data) => {
        //     console.log(data)
        // })
        api.get(`/users/get/${currentUser?.lastChat?.email}`)
            .then(res => setSelected(res.data))

    }, [currentUser])

    const { } = useQuery({
        queryKey: [`selected user`], queryFn:
            () => api.get(`/users/get/${currentUser?.lastChat?.email}`).then(res => {
                setSelected(res.data)
                return res.data
            }),
        refetchInterval: 5000
    })
    const [image, setImage] = useState("")
    const [emoji, setEmoji] = useState("")
    const date = new Date
    const formData = (e) => {
        e.preventDefault()
        const message = e.target.message.value
        const newMessage = {
            sender: {
                email: currentUser?.email,
                image: currentUser?.photoURL
            },
            receiver: {
                email: selected.email,
                image: selected.photoURL
            },
            image, emoji, message, date,
            user: `${currentUser?.email}&${selected?.email}`
        }
        if (message) {
            socket.emit("send_message", {
                message: newMessage
            })
            api.post('/message/message-in', newMessage)
                .then(res => {
                    refetch()
                    e.target.reset()
                })
        }
    }

    // if (!selected?.email) {
    //     return <div className='px-3'>
    //         <h1 onClick={() => {
    //             setShowSide(true)
    //         }} className='text-center text-2xl font-semibold py-10' > Select A User</h1 >
    //         <AddFriendModel />
    //     </div>
    // }

    return (
        <div className='w-full h-full flex flex-col justify-between'>
            {
                isLoading && <Loading />
            }
            <div className='h-16 w-full shadow flex items-center justify-between'>
                <div className='flex items-center'
                    onClick={() => showSide ? setShowSide(false) : setShowSide(true)}
                >
                    <div className='w-10 rounded-full overflow-hidden ml-5'>
                        <img src="https://scontent.xx.fbcdn.net/v/t39.30808-1/321072341_718713952952209_8614081684658335640_n.jpg?stp=c0.0.100.100a_dst-jpg_p100x100&_nc_cat=101&ccb=1-7&_nc_sid=dbb9e7&_nc_eui2=AeFgOhimAEG3rzx-mp_cox1X-juV4x70pyn6O5XjHvSnKaQ_cSTMvgoyH3y1D6wctLtp2LmF_2CXwCi0fj96jkGc&_nc_ohc=OHNlCK1GLXAAX-ViboE&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AfBLbIyoQOFDLNaa3sl7GCqcR6QyRF3moa_RmUw_sDksrQ&oe=63B0189B" alt="" />
                    </div>
                    <div className='ml-2'>
                        <h2 className='text-[16px] mb-0 pb-0 font-semibold'>
                            {selected?.name}
                        </h2>
                        {
                            selected?.active === true
                                ?
                                <div className='text-sm mt-0 pt-0 text-green-500 flex items-center'>
                                    <div className='w-3 h-3 rounded-full bg-green-500 mr-1'></div>
                                    <span>Active now</span>
                                </div>
                                :
                                <div className='text-sm mt-0 pt-0 text-red-500 flex items-center'>
                                    <div className='w-3 h-3 rounded-full bg-red-500 mr-1'></div>
                                    <span>Offline</span>
                                </div>
                        }
                    </div>
                </div>
                <div className='pr-5'>
                    <button className='primary font-extrabold'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-extrabold" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>

                    </button>
                    <button className='primary font-extrabold ml-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            show ? setShow(false) : setShow(true)
                        }}
                        className='primary font-extrabold ml-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>

                    </button>
                </div>
            </div>

            {/* Top Part End  */}
            {/* Top Part End  */}
            {/* Top Part End  */}

            <div className='overflow-y-scroll overflow-x-hidden h-full p-5'
                id='messageContainer'
            >
                {
                    allmessage?.map(m => {
                        return <MessageBoxR message={m} key={m._id} />
                    })
                }



            </div>

            <div className="sendBox flex items-center py-1 px-5 border-t mb-2 shadow mx-2">
                <div className='flex items-center'>
                    <button className='bg-primary p-1 rounded-full text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 font-bold  h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <button className=' p-1 rounded-full primary ml-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>

                    </button>
                    <button className=' p-1 rounded-full primary ml-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                    </button>
                </div>
                {/* btns End Here  */}

                <form className='input w-full flex ml-5'
                    onSubmit={formData}
                >
                    <input
                        className='text-black w-full bg-blue-50 rounded-full h-8 focus:outline-none px-5'
                        type="Write Your Message Here"
                        name='message'
                    />
                    <button type='submit' className='px-3 bg-primary text-white py-1 rounded-xl ml-3'>Send</button>
                </form>


            </div>
        </div>
    )
}

export default Message


const MessageBoxR = ({ message }) => {

    const [user, loading] = useAuthState(auth)
    const isYou = user?.email === message.sender.email
    if (loading) {
        return <Loading />
    }
    return (
        <div className={`${isYou ? "w-full flex justify-end items-center animate__animated animate__fadeInRight" : "w-full flex justify-start items-center animate__animated animate__fadeInLeft"}`}>
            {
                !isYou &&
                <div className='w-10 h-10 rounded-full overflow-hidden mr-3'>
                    <img src={message.receiver?.image} alt="" />
                </div>
            }
            <div className={`max-w-[40%] min-w-[80px] shadow py-1 rounded-3xl ${message.sender.email === user?.email ? "bg-primary text-white" : "bg-[#E4E6EB] text-gray-900"}   px-3`}>

                <p className=' text-[15px]'>
                    {message.message}
                </p>
            </div>
            {
                isYou &&
                <div className='w-10 h-10 rounded-full overflow-hidden ml-3'>
                    <img src={message.sender.image} alt="" />
                </div>
            }

        </div>
    )
}