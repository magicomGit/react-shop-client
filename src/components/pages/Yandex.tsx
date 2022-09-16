import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const req = async (code: any) => {
  var FormData = require('form-data');
  const formData = new FormData()
  formData.append('grant_type', 'authorization_code')
  formData.append('code', '7349417')
  formData.append('client_id', '74294c854986418fb0cbb047602f071b')
  formData.append('client_secret', 'fce0aff9db5c4dc8b198d44eaa2f2f5b')

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }



  const resp = await axios.post('https://oauth.yandex.ru', formData, { headers })
  console.log(resp)

}

const Yandex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code")


  req(code)




  return (
    <div>Yandex</div>
  )
}

export default Yandex