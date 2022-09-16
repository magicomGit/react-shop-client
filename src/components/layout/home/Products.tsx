import { ChatBubbleBottomCenterTextIcon, StarIcon } from "@heroicons/react/24/solid"
import { FC } from "react"
import { IExtendedProduct } from "../../../models/models"

interface IProps {
    products: IExtendedProduct[] | undefined
}

const Products: FC<IProps> = ({products}) => {
    return (
        <>
            {products?.map((product, index) =>
                <div key={product.id} className={`${index !== 0 && 'border-t border-gray-300'} 
                flex gap-3 lg:h-60  hover:shadow-my  p-6  flex-col lg:flex-row file:transition ease-in-out delay-100 duration-300`}>
                    <div className='lg:w-1/4 '>
                        <a href={`/product/${product.id}`}>
                            <img className='max-h-full' src={process.env.REACT_APP_API_URL + '/' + product.picture} />
                        </a>
                    </div>
                    <div className='lg:w-3/4 pl-10'>
                        <div className='text-2xl hover:text-teal-400 text-teal-600 cursor-pointer'>
                            <a href={`/product/${product.id}`}>{product.name}</a>

                        </div>
                        <div className='flex'>
                            <StarIcon className="h-5 w-5  text-yellow-600 " /><span className='text-sm px-1'>
                                {product.ratingCount === 0 ? '0.0' : (product.rating / product.ratingCount).toFixed(1)}</span>
                            <ChatBubbleBottomCenterTextIcon className="h-5 w-5  text-gray-300 ml-3" /><span className='text-sm px-1'>{product.comments.length}</span>
                        </div>

                        <div className='flex flex-col lg:flex-row justify-between lg:gap-0 gap-5'>
                            <div className='mt-3'>
                                {product.properties.map(property =>
                                    <div key={property.id} className='flex gap-3'>
                                        <span>{property.name}</span>
                                        <span>{property.value}</span>
                                    </div>
                                )}
                            </div>
                            <div className='lg:px-5 flex flex-row lg:flex-col justify-start lg:items-center gap-1'>
                                <div className='text-2xl'>{product.price.toLocaleString()} ₽</div>
                                <div className='text-base py-2 px-4 bg-gray-200 text-white rounded-md'>В корзину</div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Products