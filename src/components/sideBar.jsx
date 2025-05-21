import PNN from "./PNN"
import find from "../assets/find.svg"
import matche from "../assets/matche.png"
import visitor from "../assets/visitor.png"
import ppl from "../assets/ppl.png"
import heart from "../assets/heart.png"
import dislike from "../assets/dislike.png"
import Show from "./show"
import { useEffect, useState } from "react"
import Profile from "./Profile"
import { useParams, useNavigate } from "react-router-dom"
import { getUserFromId } from "../func/getAllUser"
import MatchesPage from "./matches"
import VisitorPage from "./Visitor"
import IlikePage from "./ILike"
import IhatePage from "./Ihate"
import LikesPage from "./Likes"
import logout from "../assets/logout.png"
import sett from "../assets/set.png"
import SettingPage from "../pages/Setting"


const Navigation = (n) => {
    if (n === 0) {
        return <Show />
    }
    if (n === 1) {
        return <MatchesPage />
    }
    if (n === 2) {
        return <VisitorPage />
    }
    if (n === 3) {
        return <LikesPage />
    }
    if (n === 4) {
        return <IlikePage />
    }
    if (n === 5) {
        return <IhatePage />
    }
    if(n === 6){
        return <SettingPage/>
    }
}

const SideBar = ({ user, mode }) => {

    const [navigation, setNavigation] = useState(0)
    const [userToSee, SetUserToSee] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        getUserFromId(parseInt(id))
            .then(data => SetUserToSee(data))
    }, [])

    const navigate = useNavigate()
    const logOut = ()=>{
        sessionStorage.clear()
        navigate("/")

    }

    return (
        <div className="flex">
            <div className="bg-gray-700 h-[calc(100vh-64px)] w-[20%] sticky top-16 shadow-lg flex flex-col items-center">

                <div className="flex justify-center pt-6 w-full">
                    <PNN user={user} />
                </div>

                <hr className="mt-4 w-[80%] border-t-0 bg-white/20" />

                <div className="flex flex-col mt-6 w-full">
                    <div onClick={() => {
                        setNavigation(0)
                        navigate("/feed")
                    }} className="flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer">
                        <img src={find} alt="find" className="w-6 h-6 opacity-80" />
                        <p className="text-gray-300 font-medium">Trouver des Matches</p>
                    </div>

                    <div onClick={() => setNavigation(1)} className="flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer">
                        <img src={matche} alt="matches" className="w-6 h-6 opacity-80" />
                        <p className="text-gray-300 font-medium">Matches</p>
                    </div>

                    <div onClick={() => setNavigation(2)} className="flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer">
                        <img src={visitor} alt="visitor" className="w-6 h-6 opacity-80" />
                        <p className="text-gray-300 font-medium">Visiteur</p>
                    </div>
                </div>

                <hr className="mt-6 w-[80%] border-t-0 bg-white/20" />

                <div className="flex flex-col mt-6 w-full">
                    <div onClick={() => setNavigation(3)} className="flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer">
                        <img src={heart} alt="likes" className="w-6 h-6 opacity-80" />
                        <p className="text-gray-300 font-medium">J'aimes</p>
                    </div>

                    <div onClick={() => setNavigation(4)} className="flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer">
                        <img src={ppl} alt="favorite people" className="w-6 h-6 opacity-80" />
                        <p className="text-gray-300 font-medium">Personnes que j'aime</p>
                    </div>

                    <div onClick={() => setNavigation(5)} className="flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer">
                        <img src={dislike} alt="dislikes" className="w-6 h-6 opacity-80" />
                        <p className="text-gray-300 font-medium">Personnes que je n'aime pas</p>
                    </div>

                    <div onClick={() => setNavigation(6)} className="flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer">
                        <img src={sett} alt="dislikes" className="w-6 h-6 opacity-80" />
                        <p className="text-gray-300 font-medium">Parametre</p>
                    </div>

                </div>

                <div className="flex flex-col mt-24 w-full">
                    <div onClick={logOut} className="flex items-center gap-3 py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out cursor-pointer">
                        <img src={logout} alt="dislikes" className="w-6 h-6 opacity-80" />
                        <p className="text-gray-300 font-medium">Se deconnecter</p>
                    </div>
                </div>
            </div>


            <div className="bg-gray-200 w-[80%]">
                {
                    mode == "v" ? <Profile user={userToSee ? userToSee : null} /> : Navigation(navigation)
                }
            </div>
        </div>
    )
}

export default SideBar