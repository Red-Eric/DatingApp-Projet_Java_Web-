import logo from "../assets/like-svgrepo-com.svg"

const NavBAr = () => {
    const naviagte = useNavigate()

    return (
        <div className="w-full bg-gray-800 h-[10vh] flex justify-between">
            <div className="w-[40%] h-full flex items-center ml-9">
                <img src={logo} alt="logo" className="w-10 h-10" />
                <h1 className="text-2xl text-pink-500 font-medium">ADMIN</h1><span className="font-light text-gray-200 ml-1">Panel</span>
            </div>
            <div className="h-full flex items-center ml-9 w-[40%] justify-end mr-6 gap-5">
                <h1 className="text-center text-white font-medium duration-500  cursor-pointer hover:bg-pink-600 p-3 rounded-2xl w-[20%]" onClick={() => naviagte("/admin0")}>DashBoard</h1>
                <h1 className="text-center text-white font-medium duration-500  cursor-pointer hover:bg-pink-600 p-3 rounded-2xl w-[20%]" onClick={() => naviagte("/admin1")}>Statistique</h1>
                <h1 className="text-center text-white font-medium duration-500  cursor-pointer hover:bg-pink-600 p-3 rounded-2xl w-[20%]" onClick={() => naviagte("/")}>Deconnection</h1>
            </div>
        </div>
    )
}

import userLogo from "../assets/icons8-utilisateur-50.png"
import male from "../assets/icons8-mâle-100.png"
import femelle from "../assets/icons8-femelle-100.png"
import geo from "../assets/icons8-géorepérage-50.png"
import { Tableau } from "../components/tableau"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const Admin0 = () => {
    // all male fem loc
    const [dashData, SetdashData] = useState([0, 0, 0, 0])

    useEffect(() => {
        axios.get("http://localhost:8080/api/user")
            .then(res => {
                let allUsr = res.data
                let all = allUsr.length
                let males = allUsr.filter(el => el.sexe === "H").length
                let fems = allUsr.filter(el => el.sexe === "F").length
                let loc = allUsr.filter((item, index, self) =>
                    index === self.findIndex((t) => t.place === item.place)
                ).length

                SetdashData([all, males, fems, loc])
            })
    }, [])

    return (
        <div>
            <NavBAr />
            <div className="w-[90%] h-[200px] bg-white ml-auto mr-auto mt-4 flex items-center justify-around">

                <div className="w-[17%] h-[80%] bg-blue-400 rounded-2xl">
                    <div className="flex items-center justify-center">
                        <h2 className="text-3xl text-white font-medium">Utilisateur(s)</h2>
                        <img src={userLogo} alt="ss" className="w-8 h-8" />
                    </div>
                    <h2 className="text-white text-5xl font-medium text-center mt-8">{dashData[0]}</h2>
                </div>

                <div className="w-[17%] h-[80%] bg-red-400 rounded-2xl">
                    <div className="flex items-center justify-center">
                        <h2 className="text-3xl text-white font-medium">Homme(s)</h2>
                        <img src={male} alt="ss" className="w-8 h-8" />
                    </div>
                    <h2 className="text-white text-5xl font-medium text-center mt-8">{dashData[1]}</h2>
                </div>

                <div className="w-[17%] h-[80%] bg-pink-400 rounded-2xl">
                    <div className="flex items-center justify-center">
                        <h2 className="text-3xl text-white font-medium">Femme(s)</h2>
                        <img src={femelle} alt="ss" className="w-8 h-8" />
                    </div>
                    <h2 className="text-white text-5xl font-medium text-center mt-8">{dashData[2]}</h2>
                </div>

                <div className="w-[17%] h-[80%] bg-green-400 rounded-2xl">
                    <div className="flex items-center justify-center">
                        <h2 className="text-3xl text-white font-medium">Localisation(s)</h2>
                        <img src={geo} alt="ss" className="w-8 h-8" />
                    </div>
                    <h2 className="text-white text-5xl font-medium text-center mt-8">{dashData[3]}</h2>
                </div>

            </div>
            {/*   TEST              */}

            <div className="w-[90%] ml-auto mr-auto bg-white mt-6">
                <Tableau />
            </div>
        </div>
    )
}

import { PieChart } from "@mui/x-charts"
import { countElements } from "../func/arrayFunc"

export const Admin1 = () => {

    const [sexData, setSexeData] = useState([0, 0])
    const [placeData, setPlaceData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/user")
            .then(res => {
                let alls = res.data
                let males = alls.filter(el => el.sexe === "H").length
                let fems = alls.filter(el => el.sexe === "F").length
                setSexeData([males, fems])
                ////////////////////
                let arrPlace = []
                alls.forEach((e) => arrPlace.push(e.place))
                setPlaceData(countElements(arrPlace))
            })
    }, [])

    const [data1, setData1] = useState([])

    useEffect(() => {
        /*
        [
        { id: 0, value: sexData[0], label: 'Homme', color: "oklch(0.707 0.165 254.624)" },
        { id: 1, value: sexData[1], label: 'Femme', color: "#fb64b6" },
        ]
        */

        placeData.forEach((e, i) => {
            data1.push({
                id: i,
                value: e[1],
                label: e[0]
            })
        })

    }, [placeData])

    return (
        <div>
            <NavBAr />
            <div className="mr-auto ml-auto w-[90%] h-[300px] mt-6 flex justify-around">
                <div className="w-[45%] h-full  rounded-2xl bg-white flex flex-col items-center">
                    <h1 className=" text-2xl text-blue-400  font-bold text-center">Comparatif des genres</h1>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: sexData[0], label: 'Homme', color: "oklch(0.707 0.165 254.624)" },
                                    { id: 1, value: sexData[1], label: 'Femme', color: "#fb64b6" },
                                ],
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                paddingAngle: 1,
                                innerRadius: 50,
                                cx: "50%",
                                cy: "50%"

                            },
                        ]}
                        width={400}
                        height={240}

                    />
                </div>

                <div className="w-[45%] h-full  rounded-2xl bg-white flex flex-col items-center">
                    <h1 className=" text-2xl text-blue-400  font-bold text-center">Localisation(s)</h1>
                    <PieChart
                        series={[
                            {
                                data: data1,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                paddingAngle: 1,
                                innerRadius: 50,
                                cx: "50%",
                                cy: "50%"

                            },
                        ]}
                        width={400}
                        height={240}
        
                    />
                </div>


            </div>
        </div>
    )
}