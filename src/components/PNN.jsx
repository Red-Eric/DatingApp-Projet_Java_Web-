import { useNavigate } from "react-router-dom"

const PNN = ({user}) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="flex items-center gap-4">
                <img className="w-14 h-14 rounded-full cursor-pointer" src={user?.image} alt="" onClick={()=> navigate(`/profile/${parseInt(sessionStorage.getItem("id"))}`)}/>
                    <div className="font-medium dark:text-white">
                        <h2 className="text-center">Vous</h2>
                        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">{user?.tel}</div>
                    </div>
            </div>
        </div>
    )
}

export default PNN