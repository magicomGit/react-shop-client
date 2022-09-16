import { StarIcon } from "@heroicons/react/24/solid"
import { FC, useEffect, useState } from "react"
import { useAppDispatch } from "../../../store"
import { useGetRatingQuery, useNewRatingMutation } from "../../../store/slices/commentApiSlice"
import { showLoginForm } from "../../../store/slices/showLoginFormSlice"

interface IProps{
    setShowNewComment:(value:boolean)=>void
    setProductRating:(value:string)=>void
    productId:number,
    userId:number,
    isAuth:boolean
}

const NewComment:FC<IProps> = ({setShowNewComment,setProductRating, productId, userId, isAuth}) => {
    const [rating, setRating] = useState(0)
    const [ratingArray, setRatingArray] = useState([false, false, false, false, false])
    //const [productRating, setProductRating] = useState('')

    const dispatch = useAppDispatch()
    

    const [sendNewRating, { data: newRating }] = useNewRatingMutation()
    const { data: oldRating, isSuccess: isSuccessOldRating } = useGetRatingQuery({ productId:productId , userId: Number(userId), rating: 0 })


    useEffect(() => {
        if (isSuccessOldRating && oldRating) {
            setRating(oldRating)
            const tempRating = []
            for (let i = 0; i < 5; i++) {
                if (oldRating > i) {
                    tempRating.push(true)
                } else {
                    tempRating.push(false)
                }
            }
            setRatingArray(tempRating)
        }
    }, [isSuccessOldRating])


    const hendleNewComment = () => {
        if (isAuth) {
            setShowNewComment(true)
        } else {
            dispatch(showLoginForm(true))
        }
    }

    function hendleMouseOut() {
        const tempRating = []
        for (let i = 0; i < 5; i++) {
            if (rating > i) {
                tempRating.push(true)
            } else {
                tempRating.push(false)
            }
        }
        setRatingArray(tempRating)
    }

    function hendleMouseMove(e: any) {
        let currentTargetRect = e.currentTarget.getBoundingClientRect();
        const event_offsetX = e.pageX - currentTargetRect.left
        if (event_offsetX >= 5 && event_offsetX < 25) { setRatingArray([true, false, false, false, false]) }
        if (event_offsetX >= 25 && event_offsetX < 45) { setRatingArray([true, true, false, false, false]) }
        if (event_offsetX >= 45 && event_offsetX < 65) { setRatingArray([true, true, true, false, false]) }
        if (event_offsetX >= 65 && event_offsetX < 85) { setRatingArray([true, true, true, true, false]) }
        if (event_offsetX >= 85 && event_offsetX < 105) { setRatingArray([true, true, true, true, true]) }
    }

    async function hendleMouseClick(e: any) {
        if (isAuth) {
            let currentTargetRect = e.currentTarget.getBoundingClientRect();
            const event_offsetX = e.pageX - currentTargetRect.left

            let tempRating = 0

            if (event_offsetX >= 5 && event_offsetX < 25) { setRating(1); tempRating = 1; }
            if (event_offsetX >= 25 && event_offsetX < 45) { setRating(2); tempRating = 2; }
            if (event_offsetX >= 45 && event_offsetX < 65) { setRating(3); tempRating = 3; }
            if (event_offsetX >= 65 && event_offsetX < 85) { setRating(4); tempRating = 4; }
            if (event_offsetX >= 85 && event_offsetX < 105) { setRating(5); tempRating = 5; }

            await sendNewRating({ productId: productId, userId: Number(userId), rating: tempRating })
                .then((res: any) => setProductRating(res.data.productRating))
        } else {
            dispatch(showLoginForm(true))
        }


    }

    return (
        <div className='lg:w-1/5 flex flex-col items-center gap-1'>
            <div>Ваша оценка</div>
            <div onMouseMove={(e: any) => hendleMouseMove(e)} onMouseOut={hendleMouseOut}
                onClick={(e: any) => hendleMouseClick(e)} className='mb-2 flex w-28'>
                <StarIcon className={`${ratingArray[0] ? 'text-yellow-600 ' : 'text-gray-400'} h-5 w-5   `} />
                <StarIcon className={`${ratingArray[1] ? 'text-yellow-600 ' : 'text-gray-400'} h-5 w-5   `} />
                <StarIcon className={`${ratingArray[2] ? 'text-yellow-600 ' : 'text-gray-400'} h-5 w-5   `} />
                <StarIcon className={`${ratingArray[3] ? 'text-yellow-600 ' : 'text-gray-400'} h-5 w-5   `} />
                <StarIcon className={`${ratingArray[4] ? 'text-yellow-600 ' : 'text-gray-400'} h-5 w-5   `} />

            </div>
            <button className='w-full h-9 mx-5 py-1 px-4 bg-teal-700 text-white rounded-md' onClick={() => hendleNewComment()}>
                Оставить отзыв
            </button>
        </div>
    )
}

export default NewComment