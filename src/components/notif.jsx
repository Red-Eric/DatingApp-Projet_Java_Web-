import { useEffect, useState, useRef } from "react";
import { getUserFromId, getUsersWithoutId } from "../func/getAllUser";
import axios from "axios";

const Notif = ({ num, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifArr, setNotifArr] = useState([]);
    const [allMess, setAllMess] = useState([]);
    const notifRef = useRef(null);
    const popUpRef = useRef(null);
    const [popUp, setPopUp] = useState(false);
    const [room, setRoom] = useState("");
    const [mess, setMess] = useState("")
    const [userMessageTo, setUserMessageTo] = useState(null);
    const [userMessageSender, setUserMessageSender] = useState(null)
    const [messToShow, setMessToShow] = useState([])


    useEffect(() => {
        console.log(messToShow)
        axios.get(`http://localhost:8080/api/message/${room}`)
            .then(res => {
                const sortedMessages = res.data.items.sort((x, y) => {
                    const numX = parseInt(x.split(" ")[0], 10);
                    const numY = parseInt(y.split(" ")[0], 10);
                    return numX - numY;
                });
                setMessToShow(sortedMessages);
            })
    }, [messToShow]);

    useEffect(() => {
        getUsersWithoutId(parseInt(sessionStorage.getItem("id")))
            .then(data => setAllMess(data));
    }, []);

    useEffect(() => {
        getUserFromId(parseInt(sessionStorage.getItem("id")))
            .then(data => setNotifArr(data.notif));
    }, []);

    const deleteAll = () => {
        fetch('http://localhost:8080/api/user/notify/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: parseInt(sessionStorage.getItem("id"))
            })
        })
            .then(res => res.text())
            .then(() => setNotifArr([]));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (popUpRef.current && !popUpRef.current.contains(event.target)) {
                setPopUp(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const refInput = useRef(null)

    const SendMessage = () => {
        if (mess.length === 0) {
            console.log("No mess")
        } else {
            //`${userMessageSender.id} ${userMessageSender.name} ${userMessageSender.fname} ${userMessageSender.image} ${mess}`
            axios.post('http://localhost:8080/api/message/add', {
                id: room,
                mess: `${new Date().getTime()} ${userMessageSender.id} ${userMessageSender.name} ${userMessageSender.fname} ${userMessageSender.image} ${mess} `
            })
                .then(res => {
                    console.log(res.data)
                    refInput.current.value = ""

                })
                .catch(err => {
                    console.error(err)
                });
        }
    }


    return (
        <div className="relative inline-flex">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
            >
                {children}
            </button>

            {num === 0 ? <span></span> : (
                <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-1 px-1 text-xs text-white">
                    {notifArr.length}
                </span>
            )}

            {isOpen && children === "Notification" && (
                <div
                    ref={notifRef}
                    className="bg-gray-900 shadow-xl h-[400px] w-[350px] absolute top-[68px] right-[10px] rounded-2xl overflow-hidden border border-gray-700 flex flex-col"
                >
                    <div className="w-full bg-gray-800 py-3 flex justify-center items-center border-b border-gray-700">
                        <h1 className="text-white font-semibold text-lg">{children}</h1>
                    </div>

                    <div className="p-3 space-y-3 overflow-y-auto flex-1">
                        {notifArr.length > 0 ? (
                            notifArr.map((el, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 rounded-lg p-3 shadow-md transition-all hover:bg-gray-600"
                                >
                                    <h1 className="text-white text-sm">{el}</h1>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-center mt-10">Aucune notification</p>
                        )}
                    </div>

                    {notifArr.length > 0 && (
                        <button
                            onClick={deleteAll}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 w-full rounded-b-2xl transition-all"
                        >
                            Tout lire
                        </button>
                    )}
                </div>
            )}

            {isOpen && children === "Message" && (
                <div
                    ref={notifRef}
                    className="bg-gray-800 h-[500px] w-[380px] absolute top-[200px] right-[10px] rounded-2xl"
                >
                    <div className="w-full bg-gray-700 py-3 flex justify-center items-center border-b border-gray-700">
                        <h1 className="text-white font-semibold text-lg">{children}</h1>
                    </div>

                    <div className="h-[89%] flex flex-col bg-gray-800 overflow-y-auto">
                        {allMess.map((e) => (
                            <div
                                key={e.id}
                                className="flex items-center gap-4 w-[90%] ml-auto mr-auto mb-3 mt-3 cursor-pointer hover:bg-gray-500 rounded-2xl duration-500"
                                onClick={() => {
                                    let arr = [parseInt(sessionStorage.getItem('id')), e.id].sort();
                                    setRoom(`${arr[0]}and${arr[1]}`);
                                    setPopUp(true);
                                    getUserFromId(e.id).then(data => setUserMessageTo(data));
                                    getUserFromId(parseInt(sessionStorage.getItem("id")))
                                        .then(data => setUserMessageSender(data))
                                }}
                            >
                                <img src={e.image} alt="pfp" className="rounded-full w-10 h-10" />
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-medium text-white">{e.name + " " + e.fname}</h2>
                                    <h2 className="font-light text-white">Voir vos messages</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Messssssssssssssssssssssssssss 22222222222222222222222*/}

            {popUp && (
                <div
                    onLoad={() => {
                        axios.post("http://localhost:8080/api/message", {
                            id: room,
                            items: []
                        }).then(res => {
                            const sortedMessages = res.data.items.sort((x, y) => {
                                const numX = parseInt(x.split(" ")[0], 10);
                                const numY = parseInt(y.split(" ")[0], 10);
                                return numX - numY;
                            });
                            setMessToShow(sortedMessages);
                        }).catch(error => {
                            console.error("Erreur lors de la récupération des messages:", error);
                        });

                        // axios.get("http://localhost:8080/api/message/2and5")
                        // .then(res => console.log(res.data))
                    }}
                    ref={popUpRef}
                    className="bg-gray-800 h-[600px] w-[420px] absolute top-[120px] right-[400px] rounded-2xl"
                >
                    <div className="w-full bg-gray-700 py-3 flex gap-4 pl-3 items-center border-b border-gray-700">
                        <img src={userMessageTo?.image} alt="pfpMessageTo" className="w-10 h-10 rounded-full" />
                        <h2 className="text-white font-medium">{userMessageTo?.name + " " + userMessageTo?.fname}</h2>
                    </div>

                    <div className="h-[80%] overflow-y-scroll">

                        {
                            // "1742116641483 2 Lovasoa Nantenaina /src/images/7f57a85d-46b4-4eb7-b521-c8ecfe54e52d.jpg red is meje suis red "
                            messToShow.length === 0 ? <p className="font-bold text-2xl text-red-600 text-center">Aucun message pour l instant</p> : messToShow.map(mess => (
                                <div className="flex gap-3 items-center mt-1 mb-1" key={mess + "time"}>
                                    <img src={mess.split(" ")[4]} alt="pfp2" className="w-10 h-10 rounded-full" />
                                    <div className="bg-gray-300 w-[70%] rounded-2xl p-3">
                                        <h2 className="font-medium">{mess.split(" ")[2] + mess.split(" ")[3] + `${sessionStorage.getItem('id') === mess.split(" ")[1] ? "  (Vous)" : ""}`}</h2>
                                        <h2 className="font-extralight">{mess.split(" ").slice(5).join(' ')}</h2>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex h-[7%] items-center mt-1.5 gap-2 ml-auto mr-auto">
                        <input ref={refInput} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message" onChange={(e) => setMess(e.target.value)} />
                        <h2 className="text-white bg-blue-500 duration-500 w-[18%] text-center p-2 cursor-pointer hover:bg-blue-800 rounded-2xl font-medium" onClick={SendMessage}>Envoyer</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notif;
