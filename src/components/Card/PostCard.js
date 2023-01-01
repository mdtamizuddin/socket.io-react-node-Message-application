import moment from 'moment'
import React, { useEffect, useState } from 'react'
import api from '../../instance/instance'

const PostCard = ({ data }) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        api.get(`/users/get/${data.email}`)
            .then(res => setUser(res.data))
    }, [data])
    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return '<a target="_blank" href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }
    return (
        <div className="view view-post-container smaller-margin">
            <div className="view-post">
                <div className="upper">
                    <div className="d-flex">
                        <div className="user">
                            <div className="profile">
                                <img
                                    src={user?.photoURL}
                                    alt={`${user?.name}`}
                                />
                            </div>
                        </div>
                        <div className="info">
                            <h6 className="name">
                                {user?.name}
                            </h6>
                            <span className="time">
                                {
                                    moment(data?.date).calendar()
                                }
                            </span>
                        </div>
                    </div>
                    <div className="dots">
                        <div className="dot" />
                    </div>
                </div>
                <div className="desc" >
                    <p className='posts-text' dangerouslySetInnerHTML={{ __html: urlify(data?.text) }}></p>
                </div>
                {
                    data.image &&
                    <div className="post-img">
                        <img src={data.image} alt="" />
                    </div>
                }
                <div className="actions-container">
                    <div className="action">
                        <div className="icon">
                            <img src="img/icons/thumbs-up.svg" alt="" />
                        </div>
                        <span>
                            like
                        </span>
                    </div>
                    <div className="action">
                        <div className="icon">
                            <img src="img/icons/comment.svg" alt="" />
                        </div>
                        <span>
                            comment
                        </span>
                    </div>
                    <div className="action">
                        <div className="icon">
                            <img src="img/icons/share.svg" alt="" />
                        </div>
                        <span>
                            share
                        </span>
                    </div>
                </div>
                <div className="write-comment">
                    <div className="user">
                        <div className="profile">
                            <img src="img/avatar/hero.png" alt="" />
                        </div>
                    </div>
                    <div className="input">
                        <input style={{fontSize: "16px"}} type="text" placeholder="Write a comment" />
                        <div className="media">
                            <div className="icon">
                                <img src="img/icons/camera.svg" alt="" />
                            </div>
                            <div className="icon">
                                <img src="img/icons/image.svg" alt="" />
                            </div>
                            <div className="icon">
                                <img src="img/icons/smile-2.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard