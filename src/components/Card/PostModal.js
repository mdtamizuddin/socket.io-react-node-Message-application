import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import api from '../../instance/instance'
import useUser from '../hooks/useUser'
import Loading from '../Loading'

const PostModal = ({ setShow, refetch }) => {
    const { currentUser } = useUser()
    const [mode, setMode] = useState('public')
    const [image, setImage] = useState('')
    const [file, setFile] = useState()
    const URL = 'https://api.imgbb.com/1/upload?key=1ae2104bbe0fd466f597e879bd2cb77f'
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const post = () => {
        setLoading(true)
        if (file) {
            const formData = new FormData()
            formData.append('image', file)
            fetch(URL, {
                method: "post",
                body: formData
            }).then(res => res.json())
                .then(data => {
                    setLoading(false)
                    setImage(data.data.url)
                    const newPost = { email: currentUser?.email, text, image: data.data.url, date: new Date }
                    postData(newPost)
                })
        }
        else {
            const newPost = { email: currentUser?.email, text, image, date: new Date }
            postData(newPost)
        }
    }
    if (loading) {
        return <Loading />
    }
    const postData = (newPost) => {
        setLoading(true)
        api.post('/posts', newPost).then(res => {
            setLoading(false)
            if (res.status === 200) {
                setShow(false)
                refetch()
                toast.success("Your Post I Published")
            }
            else {
                toast.error("Something Went Wrong")
            }
        })
    }
    return (
        <div className='post-modal '>
            <div className="box bg-white shadow-xl shadow-gray-800 p-2 relative">
                <i onClick={() => setShow(false)} className="fa-solid fa-x absolute right-[10px] bg-gray-200 p-[10px] text-gray-500 rounded-full"></i>
                <h1 className='text-xl text-center font-semibold'>
                    Create post
                </h1>
                <div className='flex items-center mt-3'>
                    <div className='w-12 h-12 rounded-full'>
                        <img src={currentUser?.photoURL} alt="" />
                    </div>
                    <div className='ml-3'>
                        <h3 className='text-[20px]'>{currentUser?.name}</h3>
                        <select onChange={(e) => setMode(e.target.value)} className='text-sm w-[90px] px-1 mt-1 focus:border-none focus:outline-none'>
                            <option value="public">
                                Public
                            </option>
                            <option value="private">
                                Only Me
                            </option>
                        </select>
                    </div>
                </div>

                <div>

                    <textarea
                        className='text-black w-full text-xl mt-4 min-h-10 h-auto p-2 border-none outline-none'
                        placeholder='Write Your Feeling'
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    >

                    </textarea>
                </div>

                <div >
                    {
                        !image && <div className='absolute bottom-2'>
                            <input
                                id='image'
                                className='hidden'
                                type="file"
                                name="image"
                                onChange={e => {
                                    setImage(window.URL.createObjectURL(e.target.files[0]))
                                    setFile(e.target.files[0])
                                }}
                            />
                            <label htmlFor="image">
                                <img className='w-12' src="img/img-icon.jpg" alt="" />
                            </label>
                        </div>
                    }
                    <div className='h-52 overflow-y-auto px-3'>
                        <img className='w-full' src={image} alt="" />
                    </div>

                    <button
                        onClick={post}
                        className={`${text || image ? "primary" : "text-gray-600"} w-full py-2 text-xl bg-slate-300 rounded-lg mt-3 `}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostModal