import React from 'react'
import api from '../../instance/instance'

const GifCard = ({ currentUser, selected, socket, refetch }) => {
    const date = new Date
    const send = (link) => {
        const newMessage = {
            sender: {
                email: currentUser?.email,
                image: currentUser?.photoURL
            },
            receiver: {
                email: selected?.email,
                image: selected?.photoURL
            },
            image: "", emoji: link, message: "", date,
            user: `${currentUser?.email}&${selected?.email}`
        }
        if (link) {
            socket.emit("send_message", {
                message: newMessage
            })
            api.post('/message/message-in', newMessage)
                .then(res => {
                    refetch()
                })
        }
    }
    return (
        <div className='w-full h-full overflow-x-hidden overflow-y-auto grid grid-cols-2 gap-3 p-2 justify-items-center'>
            {
                gifs.map((img, index) => {
                    return <img onClick={() => send(img)} className='cursor-pointer' key={index} src={img} alt="" />
                })
            }
        </div>
    )
}

export default GifCard

const gifs = [
    "https://media.tenor.com/26KPxVvw_X8AAAAC/newyear-2022.gif",
    "https://media.tenor.com/53glqoSe9LMAAAAC/happy-new-year.gif",
    "https://media.tenor.com/YxXn07ofanQAAAAC/patrick-star-in-love.gif",
    "https://media.tenor.com/4-C47Bn_MUgAAAAd/friday-happy-dance.gif",
    "https://media.tenor.com/6AFZ06tb48MAAAAC/khela-hobe-gifgari.gif",
    "https://media.tenor.com/TDoaU1-fcDgAAAAC/pout-girl.gif",
    "https://media.tenor.com/N1bAnKCt00kAAAAM/cute-iu.gif",
    "https://media.tenor.com/NxnXcvTDM84AAAAC/cute-baby-mochi.gif",
    "https://media.tenor.com/hBN6EG9hS8oAAAAM/gifgari-manna.gif",
    "https://i.pinimg.com/originals/dc/4f/a2/dc4fa2186f1cfe5f30d871218cd41a3c.gif",
    "https://media.tenor.com/WPYgL7EKUMcAAAAd/gifgari-dipjol.gif",
    "https://media.tenor.com/RsSNHQuS998AAAAd/gifgari-bangla-cinema.gif",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJ7R9Pc2A5R3TvO7F-CshzcvEKF8Dk1TwKTdPSfGnY3ljt06Slpqc6kZ0GCHdAfyJXnU&usqp=CAU",
    "https://i.makeagif.com/media/10-04-2015/lDZOya.gif",
    "https://media0.giphy.com/media/OH5zzzDf4SQzAmnygu/200w.gif?cid=6c09b952ccfcdjl90uvhnd3f6crgfbqeasz3dfrtost93c8a&rid=200w.gif&ct=g",
    "https://media4.giphy.com/media/jOheo9Bdl9PTcRfI25/200w.gif?cid=6c09b952y9ulquujb37wh7xp6ay0hwf2ct7lu826ytq71wpa&rid=200w.gif&ct=g",
    "https://media.tenor.com/eu--C7nwdqYAAAAC/gifgari-bangla.gif",
    "https://media.tenor.com/FL5OlmyaueAAAAAC/funny.gif",
    "https://media2.giphy.com/media/8Odq0zzKM596g/giphy.gif",
    "https://i.pinimg.com/originals/06/86/7f/06867fbdc21c31c39499a6d0749fae36.gif",
    "https://media.tenor.com/dp_hQBGT0rIAAAAd/think-smart.gif",
    "https://media.tenor.com/BGZz48x9384AAAAC/the-rock-the-rock-sus.gif",
    "https://media.tenor.com/j9jNzd01cnsAAAAM/baby.gif",
    "https://media.tenor.com/iRhuTT1qhaIAAAAM/laughing-funny.gif",
    "https://media.tenor.com/GfSX-u7VGM4AAAAC/coding.gif",
    "https://media.tenor.com/3klZkDif0nsAAAAd/gaming-gif.gif",
    "https://thumbs.gfycat.com/UnrulyNegligibleLeopardseal-max-1mb.gif"
]