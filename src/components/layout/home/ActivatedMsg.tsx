import { FC } from "react"

interface IProps {
    message: string
}

const ActivatedMsg: FC<IProps> = ({ message }) => {
    return (
        <>
            {message === 'true' && <div className={`p-3 m-2 bg-light-green-100 text-green-900 rounded-lg`}>
                Активация аккаунта прошла успешно. Теперь вы можете войти на сайт со своими регистрационными данными.
            </div>}

            {message === 'false' && <div className={`p-3 m-2  bg-red-100  text-red-900 rounded-lg`}>
                Ошибка активации аккаунта!
            </div>}
        </>
    )
}

export default ActivatedMsg