
import { useEffect, useState } from "react"
import api from "../../instance/instance"
import { auth } from "../Auth/firebase/firebase.init"
import { useAuthState } from 'react-firebase-hooks/auth'

const useUser = () => {
    const [user, loading] = useAuthState(auth)
    const [data, setData] = useState({})
    useEffect(() => {
        if (user?.email) {
            api.get(`/users/get/${user?.email}`)
                .then(res => setData(res.data))
        }
    }, [user])
    if (loading) {
        return {}
    }
    return data
}

export default useUser