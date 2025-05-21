import { useEffect, useState } from "react";
import bg from "../assets/bg.jpg"
import NavBarNoLog from "../components/NavBarNoLog";
import { GetAllUser } from "../func/getAllUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [showedLog, setShowedLog] = useState(true)
    const [email_, setEmail_] = useState("")
    const [password_, setPassword_] = useState("")
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const saveLog = (data, emailParam, passParam) => {
        let logged = false



        data.forEach((user) => {

            if (user.email === emailParam && user.password === passParam) {
                sessionStorage.setItem("id", user.id)
                navigate("/feed")
                logged = true
            }
        })

        if(emailParam === "admin" && passParam === "123"){
            logged = true
            navigate("/admin0")
        }

        if (!logged) {
            Swal.fire({
                title: "Erreur",
                icon: "error",
                text: "Erreur lors de l auth"
            })
        }
    }

    const handleEmailChange = (e) => {
        setEmail_(e.target.value)
    }

    const handlePassWordChange = (e) => {
        setPassword_(e.target.value)
    }

    useEffect(() => {
        GetAllUser().then(data => setUsers(data))
        document.body.style.backgroundImage = `url(${bg})`
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundPosition = "center"
        document.body.style.backgroundRepeat = "no-repeat"

        return () => {
            document.body.style.backgroundImage = ""
        }

    }, [])

    const tryLog = () => {
        users.length > 0 ? saveLog(users, email_, password_) : console.log("can Log no users in DB")
    }

    return (
        <div>
            <NavBarNoLog hide={showedLog} />
            <div className="w-[32%] h-screen ml-auto mr-auto mt-52">
                <div className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8">
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2">
                            E-mail
                        </label>
                        <input
                            className="shadow appearance-none border text-white rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            autoComplete="off"
                            onChange={handleEmailChange}
                            placeholder="Example@gmail.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2">
                            Mot de Passe
                        </label>
                        <input
                            onChange={handlePassWordChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            autoComplete="off"
                            placeholder="************"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button

                            onClick={tryLog}
                            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto mr-auto"
                            type="button"
                        >
                            Se connecter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
