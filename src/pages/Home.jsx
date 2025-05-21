import { useEffect } from "react";
import NavBarNoLog from "../components/NavBarNoLog";
import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg"

const Home = () => {
    useEffect(()=>{
        document.body.style.backgroundImage = `url(${bg})`
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundPosition = "center"
        document.body.style.backgroundRepeat = "no-repeat"
        
        return () => {
          document.body.style.backgroundImage = ""
        }
    },[])
    return (
        <div>
            <NavBarNoLog />
            <div className="bg-gray-700 w-[30%] mt-20 ml-12 h-96">
                <div className="flex flex-col justify-center space-y-6 bg-gray-700 p-8 rounded-2xl ">
                    <h1 className="text-5xl font-bold text-white leading-tight text-left">
                        Trouvez la personne qui rendra vos jours plus beaux.
                    </h1>
                    <p className="text-lg font-light text-white text-left">
                        Inscrivez-vous dès aujourd'hui et explorez des milliers de profils qui partagent vos passions, vos envies et votre vision de l'amour. Chaque rencontre est une opportunité de créer une belle histoire, unique comme vous.
                    </p>
                    <Link to={"/Sign"} type="button" className="text-center ml-auto mr-auto w-[32%] text-white bg-pink-500 hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ">S'inscrire</Link>
                    
                </div>

            </div>
        </div>
    );
};

export default Home;
