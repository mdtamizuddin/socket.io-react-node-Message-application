import React, { useEffect } from 'react'

const Message = () => {
    useEffect(() => {
        const messageContainer = document.getElementById("messageContainer")
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight
    }, [])
    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className='h-16 w-full shadow'>

            </div>

            <div className='overflow-y-auto h-full p-5'
                id='messageContainer'
            >
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />

                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />

                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
                <MessageBox />
                <MessageBoxR />
            </div>

            <div className="sendBox flex items-center py-1 px-5 border-t mb-2 shadow mx-2">
                <div className='flex items-center'>
                    <button className='bg-blue-400 p-1 rounded-full text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 font-bold  h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <button className=' p-1 rounded-full text-blue-500 ml-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>

                    </button>
                    <button className=' p-1 rounded-full text-blue-500 ml-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                    </button>
                </div>
                {/* btns End Here  */}

                <div className='input w-full ml-5'>
                    <input
                        className='text-black w-full bg-blue-50 rounded-full h-8 focus:outline-none px-5'
                        type="Write Your Message Here" />
                </div>

                <button className='px-3 bg-blue-400 text-white py-1 rounded-xl ml-3'>Send</button>
            </div>
        </div>
    )
}

export default Message
const MessageBox = () => {
    return (
        <div className='w-full flex justify-start items-center'>
            <div className='w-10 rounded-full overflow-hidden mr-3'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" />
            </div>
            <div className='max-w-[40%] min-w-[80px] shadow py-1 rounded-3xl bg-[#E4E6EB] px-3'>

                <p className='text-gray-600 text-[15px]'>
                    Hello
                </p>
            </div>
        </div>
    )
}

const MessageBoxR = () => {
    return (
        <div className='w-full flex justify-end items-center'>
            <div className='max-w-[40%] min-w-[80px] shadow py-1 rounded-3xl bg-[#E4E6EB] px-3'>

                <p className='text-gray-600 text-[15px]'>
                    How Are You ?
                </p>
            </div>
            <div className='w-10 h-10 rounded-full overflow-hidden ml-3'>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" />
            </div>
        </div>
    )
}