import NavBarLogged from "../components/NavBarLogged"
import bg from "../assets/bg.jpg"
import { useEffect, useState } from "react"
import { getUserFromId } from "../func/getAllUser"
import SideBar from "../components/sideBar"
import { useParams } from "react-router-dom"



const ProfilePage = () => {
    const {idToShow} = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        return ()=>{
            getUserFromId(parseInt(sessionStorage.getItem("id")))
            .then(data => setUser(data))
            console.log("kill")
        }
    }, [])




    return (
        <div>
            <NavBarLogged />
            <SideBar mode={"v"} user={user ? user : null}/>
        </div>
    )
}

export default ProfilePage