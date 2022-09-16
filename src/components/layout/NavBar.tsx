import { Disclosure, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelctor } from "../../store";
import { useLogoutMutation } from "../../store/slices/accountApiSlice";
import { logOut } from "../../store/slices/authSlice";
import { showLoginForm } from "../../store/slices/showLoginFormSlice";
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/solid'

const burgerMenu = [
    { name: 'Магазин', href: '/', },
    { name: 'О проекте', href: '/about', },
]



interface Props {    
    setSlideOverIsShow: (isShow: boolean) => void;
}


const NavBar: FC<Props> = ({  setSlideOverIsShow}) => {
    const {pathname} = useLocation();
    


    //--------------- account ----------------
    const [authText, setAuthText] = useState('')
    const [userNameText, setUserNameText] = useState('')
    const { userId, userRole, userName, isAuth } = useAppSelctor(state => state.authReducer)
    const dispatch = useAppDispatch()
    const [logoutAction, { isError }] = useLogoutMutation()
    
    async function logout() {
        try {
            await logoutAction(userId)
        } catch (error) {

        }
        dispatch(logOut())
    }

    useEffect(()=>{
        if (isAuth) {
            setAuthText('Выйти')
            setUserNameText(userName)
        }else{
            setAuthText('Войти')
            setUserNameText('')
        }
    },[isAuth])

    const hendleAuthClick =()=>{
        if (isAuth) {
            logout()
        }else{            
            dispatch(showLoginForm(true))
        }
    }
    //--------------- ----------------    
    const navigation = [
        { name: 'Магазин', href: '/', current: pathname === '/' ? true : false },
        //{ name: 'Телефоны', href: '/oauth/yandex?code=1422261', current: pathname === '/phones' ? true : false },
        { name: 'О проекте', href: '/about', current: pathname === '/about' ? true : false },
        //{ name: 'vk', href: '/oauth/vk' + param, current: pathname === '/vk' ? true : false },
        
    ]


    function hendleProfile(){
        if (userRole === 'ADMIN') {
            setSlideOverIsShow(true)
            
        }
    }
    //------------------------------------------
    return (
        <Disclosure as="nav" className="bg-teal-800 ">
            {({ open }) => (
                <>
                    <div className="max-w-[1200px] mx-auto px-2  ">
                        <div className="relative flex justify-between items-center h-16">
                            <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-teal-600 focus:outline-none ">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="h-7 w-7  text-white "/>
                                    ) : (
                                        <Bars4Icon className="h-7 w-7  text-white "/>
                                        
                                    )}
                                </Disclosure.Button>
                            </div>


                            <div className="hidden  lg:ml-6 lg:flex  ">
                                <div className="flex ">
                                    {navigation.map((item) => (
                                        <Link className={`${item.current ? 'text-white bg-teal-700' : 'text-gray-200  hover:text-white'}  
                                        px-5 py-2 rounded-md text-sm font-medium`} key={item.name}  to={item.href}>
                                            {item.name}</Link>
                                    ))}

                                </div>


                            </div>
                            <div className='flex items-center'>
                                <div className='hidden  lg:block text-white p-2 cursor-pointer' onClick={()=> hendleProfile()}>
                                    {userNameText}</div>
                                <div onClick={()=> hendleAuthClick()}
                                className="ml-3 border border-blue-gray-200 cursor-pointer text-gray-200  hover:text-white py-2 px-4 rounded-md text-sm font-medium"
                                >{authText}</div>
                                
                            </div>


                        </div>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Disclosure.Panel className="lg:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {burgerMenu.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className='text-gray-200 hover:bg-teal-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium'


                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}
export default NavBar