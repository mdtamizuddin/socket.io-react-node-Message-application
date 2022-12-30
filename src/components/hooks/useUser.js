import api from "../../instance/instance"
import { auth } from "../Auth/firebase/firebase.init"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from "@tanstack/react-query"

const useUser = () => {
    const [user, loading] = useAuthState(auth)

    const { isLoading: working, data: currentUser, refetch } = useQuery({
        queryKey: [`Current User`], queryFn:
            async () => {
                const res = await api.get(`/users/get/${user.email}`)
                return res.data
            },
        refetchInterval: 5000
    })
    
    if (loading || working) {
        return {}
    }
    return { refetch, currentUser, working }
}

export default useUser