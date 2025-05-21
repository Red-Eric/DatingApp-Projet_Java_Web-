import { useNavigate } from "react-router-dom";
import "../pages/SignIn.css"

const Profile = ({user}) => {

    const navigate = useNavigate()

    const goBack = ()=>{
        navigate(-1)
    }

    return (
        <div>
            <div className="ml-auto mr-auto mt-32 bg-white dark:bg-gray-700 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 text-center mb-8 md:mb-0">
                        <img src={user?.image} alt="Profile Picture" className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105" />
                        <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">{user?.name} {user?.fname}</h1>
                        <p className="text-gray-600 dark:text-gray-300">Je suis {user?.sexe == "H" ? "un Homme" : "une femme"}</p>
                        <button onClick={goBack} className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Retour</button>


                    </div>
                    <div className="md:w-2/3 md:pl-8">
                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Bio</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {user?.bio}
                        </p>
                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">centre d'intérêt</h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {
                                user?.hobby.map((e)=>(
                                    <span key={e} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{e}</span>
                                ))
                            }
                        </div>
                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Contact Information</h2>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {user?.email}
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {user?.tel}
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {user?.place}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
