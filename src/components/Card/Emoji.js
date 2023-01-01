import EmojiPicker from 'emoji-picker-react'
import React from 'react'
import api from '../../instance/instance'

const Emoji = ({ currentUser, selected, socket, refetch }) => {
    const date = new Date
    const send = (sticker) => {
        const newMessage = {
            sender: {
                email: currentUser?.email,
                image: currentUser?.photoURL
            },
            receiver: {
                email: selected?.email,
                image: selected?.photoURL
            },
            image: "", emoji: "", message: "", date, sticker,
            user: `${currentUser?.email}&${selected?.email}`
        }
        if (sticker) {
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
        <EmojiPicker
            onEmojiClick={(e) => send(e.emoji)}
            lazyLoadEmojis={true}
        />
    )
}

export default Emoji