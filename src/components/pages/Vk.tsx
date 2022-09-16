import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { useVkAuthMutation } from '../../store/slices/accountApiSlice';
import { setCredentials } from '../../store/slices/authSlice';

const Vk = () => {
   
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('')

    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code")
    
    //var urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //var access_token = urlParams.get('access_token');
    
   
console.log(code)
    

    const [VkAuth, { data }] = useVkAuthMutation()

    //axios.get('https://oauth.vk.com/access_token?client_id=51414570&client_secret=jxFMW2CVT3mN6p1X3IbC&code='+code).then((respvk)=>{console.log(5555555555555,respvk)})
   
    //const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (code) {

            

            VkAuth(code)
                .then((resp: any) => {
                    if (resp.error) {
                        setErrorMessage(resp.error.data)
                        
                    }else{
                        dispatch(setCredentials({
                            userId: resp.data.id,
                            userName: resp.data.firstName,
                            userRole: resp.data.role,
                            accessToken: resp.data.accessToken,
                            emailConfirmed: resp.data.emailConfirmed
                        }))
                        //navigate('/')
                    }
                    
                    
                })            
        }else{
            //navigate('/')
        }
        

    }, [])

    

  return (
    <div className='max-w-[1200px] mx-auto min-h-[700px]'>
        <div className='text-center text-xl text-deep-orange-800 p-10'>
        {errorMessage}
        </div>
        </div>
  )
}

export default Vk