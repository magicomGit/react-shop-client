import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelctor } from '../../store'
import SlideOver from '../UI/SlideOver'
import Footer from './Footer'
import LoginModal from './LoginModal'
import NavBar from './NavBar'

const Layout = () => {
    const { isShowForm } = useAppSelctor(state => state.loginFormReducer)
    const [slideOverIsShow, setSlideOverIsShow] = useState(false)
    return (
        <>
            <header>
                <NavBar setSlideOverIsShow={setSlideOverIsShow} />
            </header>
            <main>
                <LoginModal isShow={isShowForm} />
                <SlideOver setIsShow={setSlideOverIsShow} isShow={slideOverIsShow}/>
                <Outlet />
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}

export default Layout