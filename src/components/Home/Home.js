import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import api from '../../instance/instance'
import PostCard from '../Card/PostCard'
import Shotcut2 from './Shotcut2'
import Sortcut from './Sortcut'
import Loading from '../Loading'
import PostModal from '../Card/PostModal'
const Home = () => {
    const { isLoading, data, refetch } = useQuery({
        queryKey: ["All Posts"],
        queryFn: () => api.get('/posts').then(res => res.data)
    })
    const [show, setShow] = useState(false)
    return (
        <div>
            {
                show && <PostModal setShow={setShow} refetch={refetch} />
            }
            <div>
                {/*navbar*/}

                {/*content*/}
                <div className="wrapper">
                    <Sortcut />
                    {/*posts*/}
                    <div className="posts">
                        {/* stories */}

                        {/*create post*/}
                        <div className="timeline">

                            <div className="view create-post">
                                <div className="input">
                                    <div className="user">
                                        <div className="profile">
                                            <img src="img/avatar/hero.png" alt="" />
                                        </div>
                                    </div>
                                    <input
                                        onClick={() => setShow(true)}
                                        type="text" placeholder="What on your mind, Anne?" />
                                </div>
                                <div className="media">
                                    <div className="category">
                                        <div className="option">
                                            <div className="icon">
                                                <img src="img/icons/photos.svg" alt="" />
                                            </div>
                                            <span>photo/video</span>
                                        </div>
                                        {/* <div className="option">
                                            <div className="icon">
                                                <img src="img/icons/smile.svg" alt="" />
                                            </div>
                                            <span>feeling/activity</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            {/*post container*/}
                            {
                                isLoading
                                    ?
                                    <Loading />
                                    :
                                    <>
                                        {
                                            data?.posts?.map(post => {
                                                return <PostCard key={post._id} data={post} />
                                            })
                                        }
                                    </>
                            }


                            {/*people you may know*/}
                            <div className="view friends smaller-margin">
                                <div className="upper">
                                    <h6>people you may know</h6>
                                    <div className="dots">
                                        <div className="dot" />
                                    </div>
                                </div>
                                <div className="owl-carousel owl-theme people">
                                    <div className="item">
                                        <div className="person-img">
                                            <div className="icon">
                                                ×
                                            </div>
                                            <img src="img/avatar/1.jpg" alt="" />
                                        </div>
                                        <div className="info">
                                            <h4>
                                                rosie pie
                                            </h4>
                                            <span>4 mutual friend</span>
                                            <button>
                                                add friend
                                            </button>
                                        </div>
                                    </div>
                                    {/**/}
                                    <div className="item">
                                        <div className="person-img">
                                            <div className="icon">
                                                ×
                                            </div>
                                            <img src="img/avatar/4.jpg" alt="" />
                                        </div>
                                        <div className="info">
                                            <h4>
                                                sarah jones
                                            </h4>
                                            <span>4 mutual friend</span>
                                            <button>
                                                add friend
                                            </button>
                                        </div>
                                    </div>
                                    {/**/}
                                    <div className="item">
                                        <div className="person-img">
                                            <div className="icon">
                                                ×
                                            </div>
                                            <img src="img/avatar/3.jpg" alt="" />
                                        </div>
                                        <div className="info">
                                            <h4>
                                                chris doe
                                            </h4>
                                            <span>4 mutual friend</span>
                                            <button>
                                                add friend
                                            </button>
                                        </div>
                                    </div>
                                    {/**/}
                                    <div className="item">
                                        <div className="person-img">
                                            <div className="icon">
                                                ×
                                            </div>
                                            <img src="img/avatar/2.jpg" alt="" />
                                        </div>
                                        <div className="info">
                                            <h4>
                                                katie adam
                                            </h4>
                                            <span>4 mutual friend</span>
                                            <button>
                                                add friend
                                            </button>
                                        </div>
                                    </div>
                                    {/**/}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*shortcuts 2 -events and chat- */}
                    <Shotcut2 />
                </div>
            </div>

        </div>
    )
}

export default Home