import { Link } from 'react-router-dom';
import love from '../assets/love.svg'

const NavBarNoLog = (props) => {
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-inset"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    className="hidden h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src={love}
                                    alt='logo'
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link 
                                        to="/"
                                        className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 text-white"
                                        aria-current="page"
                                    >
                                        Acceuil
                                    </Link>
                                    <a
                                        href="#"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Match
                                    </a>
                                    <a
                                        href="#"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Statistiques
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link hidden={props.hide} to={"/Login"} type="button" className="text-white bg-pink-500 hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ">Se connecter</Link>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white"
                            aria-current="page"
                        >
                            Acceuil
                        </a>
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Profile
                        </a>
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Match
                        </a>
                        <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Statistiques
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBarNoLog;
