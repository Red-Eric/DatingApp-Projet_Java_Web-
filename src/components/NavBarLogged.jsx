import love from '../assets/love.svg'
import Search from './search';
import Notif from './notif';
import { getUserFromId } from '../func/getAllUser';
import { useState } from 'react';

const NavBarLogged = () => {

    const [notifNumber, setNotifNumber] = useState(0)

    useState(()=>{
        getUserFromId(parseInt(sessionStorage.getItem("id")))
        .then(data => setNotifNumber(data?.notif.length))
    },[])

    return (
        <div className='bg-gray-800 sticky top-0'>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src={love}
                                    alt='logo'
                                />
                            </div>
                            <div className="w-[100%]">
                                <Search />
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className='flex gap-4'>
                                <Notif num={notifNumber} param={2}>Notification</Notif>
                                <Notif num={2} param={4}>Message</Notif>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBarLogged;
