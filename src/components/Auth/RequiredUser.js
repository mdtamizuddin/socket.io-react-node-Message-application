import { useAuthState } from "react-firebase-hooks/auth"
import Loading from "../Loading"
import { auth } from "./firebase/firebase.init"
import Login from "./Login"


const RequiredUser = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    if (loading) {
        return <Loading />
    }
    if (user) {
        return children
    }
    else if (!user) {
        return <Login />
    }
}

export default RequiredUser