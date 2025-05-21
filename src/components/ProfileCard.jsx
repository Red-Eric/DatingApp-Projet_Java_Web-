import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromId } from "../func/getAllUser";

const ProfileCard = ({ user, mode }) => {
    const [me, setMe] = useState(null);
    const [likeArray, setLikeArray] = useState([]);
    const [hateArray, setHateArray] = useState([]);

    useEffect(() => {
        getUserFromId(parseInt(sessionStorage.getItem("id"))).then((data) => {
            setMe(data);
            setLikeArray(data.ilikes);
            setHateArray(data.ihates);
        });
    }, []);

    const navigate = useNavigate();

    const viewProfile = () => {
        navigate(`/profile/${user?.id}`);
        const visitorId = parseInt(sessionStorage.getItem("id"));

        if (me) {
            fetch("http://localhost:8080/api/user/notify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    notif: `${me.name} ${me.fname} a vu votre profile`,
                    idNotified: user.id,
                }),
            });
        }

        fetch("http://localhost:8080/api/user/visitor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUser: user?.id,
                idVisitor: visitorId,
            }),
        });
    };

    const likePPL = () => {
        setLikeArray([...likeArray, user.id]);
        setHateArray(hateArray.filter(id => id !== user.id));

        fetch("http://localhost:8080/api/user/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idLiked: user?.id,
                idLiker: parseInt(sessionStorage.getItem("id")),
            }),
        });

        if (me) {
            fetch("http://localhost:8080/api/user/notify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    notif: `${me.name} ${me.fname} vous aime`,
                    idNotified: user.id,
                }),
            });
        }
    };

    const disLikePPL = () => {
        setHateArray([...hateArray, user.id]);
        setLikeArray(likeArray.filter(id => id !== user.id));

        fetch("http://localhost:8080/api/user/hate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hatedId: user?.id,
                haterId: parseInt(sessionStorage.getItem("id")),
            }),
        });
    };

    const isLiked = likeArray.includes(user?.id);
    const isHated = hateArray.includes(user?.id);

    return (
        <div className="w-1/3 text-center mb-8 md:mb-0 bg-white rounded-2xl">
            <img
                onClick={viewProfile}
                src={user?.image}
                alt="Profile Picture"
                className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 mt-4"
            />
            <h1 className="text-2xl font-bold text-indigo-800 dark:text-gray-800 mb-2">
                {user?.name} {user?.fname}
            </h1>
            <p className="text-gray-600 dark:text-gray-700">
                Je suis {user?.sexe === "H" ? "un Homme" : "une Femme"}
            </p>

            <div className="flex justify-center gap-3 mb-2 items-center">
                <button
                    onClick={likePPL}
                    type="button"
                    className={`text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800 ${isLiked ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"}`}
                >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                    </svg>
                </button>
                <button
                    onClick={disLikePPL}
                    type="button"
                    className={`text-red-700 border border-red-700 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:focus:ring-red-800 ${isHated ? "bg-red-700 text-white" : "hover:bg-red-700 hover:text-white"}`}
                >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M3 11H1a1 1 0 0 1-1-1V2a2 2 0 0 1 4 0v8a1 1 0 0 1-1 1Zm12.954 0H12l1.558 4.5a1.778 1.778 0 0 1-3.331 1.06A24.859 24.859 0 0 0 6 10.2V0.614h.114C8.223 1.031 11.015 0 13.6 0c1.4 0 1.592.526 1.88 1.317l2.354 7A2 2 0 0 1 15.954 11Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;