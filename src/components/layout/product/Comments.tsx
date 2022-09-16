import { UserCircleIcon } from "@heroicons/react/24/solid"
import { FC } from "react"
import { IComment } from "../../../models/models"

interface IProps{
    comments:IComment[]
    
}

const Comments:FC<IProps> = ({comments}) => {
    return (
        <>
            {comments.map(comment =>
                <div key={comment.id}>
                    <div className='flex items-center mb-2'>
                        <UserCircleIcon className="h-8 w-8  text-teal-700 " />
                        <span className='p-1 text-light-blue-700 '>{comment.userName}</span>
                    </div>

                    <div>{comment.content}</div>

                </div>
            )}
        </>
    )
}

export default Comments