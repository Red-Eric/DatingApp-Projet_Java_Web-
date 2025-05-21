import NavBarLogged from "../components/NavBarLogged"
import bg from "../assets/bg.jpg"
import { useEffect, useState } from "react"
import { GetAllUser } from "../func/getAllUser"
import SideBar from "../components/sideBar"



const Feed = () => {
    const [Users, setUsers] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        document.body.style.backgroundImage = `url(${bg})`
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundPosition = "center"
        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.height = "100vh"

        GetAllUser().then(data => setUsers(data))

        return () => {
            document.body.style.backgroundImage = ""
        }
    }, [])

    const getMeByID = () => {
        let id = parseInt(sessionStorage.getItem("id"))
        Users.forEach((u)=>{
            if(u.id === id){
                setUser(u)
            }
        })    
    }

    useEffect(() => {
        getMeByID()
    }, [Users])



    return (
        <div>
            <NavBarLogged />
            {
                Users.length > 0 ? <SideBar user={user ? user : {}} /> : <h2>No User</h2>
            }
        </div>
    )
}

export default Feed