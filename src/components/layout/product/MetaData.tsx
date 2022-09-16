import { ChatBubbleBottomCenterTextIcon, StarIcon } from "@heroicons/react/24/solid"
import { FC } from "react"
import { IProductRequest } from "../../../models/models"

interface IProps{
    product: IProductRequest,
    productRating: string
}

const MetaData:FC<IProps> = ({product, productRating}) => {
  return (
    <div className='lg:pl-16 pl-5'>
                                <div className='text-3xl my-4'>{product.name}</div>
                                <div className='flex'>
                                    <StarIcon className="h-5 w-5  text-yellow-600 " />
                                    <span className='text-sm px-1'>{productRating}</span>
                                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5  text-gray-300 ml-3" />
                                    <span className='text-sm px-1'>{product.comments.length}</span>
                                </div>
                            </div>
  )
}

export default MetaData