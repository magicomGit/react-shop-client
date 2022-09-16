import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComment } from "../../models/models";
import { useAppSelctor } from "../../store";
import { useGetCommentsQuery } from "../../store/slices/commentApiSlice";
import { useGetProductQuery } from "../../store/slices/productApiSlice";
import NewCommentModal from "../layout/NewCommentModal";
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Pagination from "../layout/Pagination";
import MetaData from "../layout/product/MetaData";
import Properties from "../layout/product/Properties";
import NewComment from "../layout/product/NewComment";
import Comments from "../layout/product/Comments";

const LIMIT = 5

const Product = () => {
    const params = useParams();
    let id = 0
    if (params.id) {
        id = Number(params.id)
    }
    

    const { data: product, isSuccess: isSuccessProduct } = useGetProductQuery(id)


    const { userId,  userName, isAuth } = useAppSelctor(state => state.authReducer)
    



    const [comments, setComments] = useState<IComment[]>([])
    const [showNewComment, setShowNewComment] = useState(false)

    const [commentsQty, setCommentsQty] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesQty, setPagesQty] = useState(1)


    const { data: commentsData, isSuccess: isSuccessComments } = useGetCommentsQuery({ productId: id, limit: LIMIT, page: currentPage })


    useEffect(() => {

        if (isSuccessComments) {
            setComments(commentsData.rows)
            setCommentsQty(commentsData.count)
            setPagesQty(Math.ceil(commentsData.count / LIMIT))
        }
    }, [commentsData])


    const [productRating, setProductRating] = useState('')

    useEffect(() => {
        if (isSuccessProduct) {
            if (product.ratingCount === 0) {
                setProductRating('0.0')
            }else{
                setProductRating((product.rating / product.ratingCount).toFixed(1))
            }
        }
    }, [isSuccessProduct])

    

    

    

    

  return (
    <>
    <NewCommentModal isShow={showNewComment} productId={id} setIsShow={setShowNewComment}
                userId={Number(userId)} userName={userName} />

            <div className='max-w-[1200px] mx-auto min-h-[280px]'>
                {isSuccessProduct &&
                    <div className='flex flex-col lg:flex-row mt-10'>
                        <div className='lg:w-1/3'><img src={process.env.REACT_APP_API_URL + '/' + product.picture} /> </div>
                        <div className='lg:w-2/3 flex flex-col '>
                            <MetaData product={product} productRating={productRating}/>
                            <div className='flex flex-col lg:flex-row mt-5'>
                                <Properties properties={product.properties}/>
                                <div className='px-5 flex lg:flex-col items-center gap-3 lg:gap-1'>
                                    <div className='text-2xl'>{product.price.toLocaleString()} ₽</div>
                                    <div className='text-base py-2 px-4 bg-gray-200 text-white rounded-md'>В корзину</div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='flex justify-center gap-3 mt-16'>                
                <span>Отзывы</span>
            </div>
            <div className='bg-gray-200 p-10 mt-2'>
                <div className='max-w-[1200px] m-auto flex flex-col lg:flex-row gap-10'>
                    <NewComment productId={id} setProductRating={setProductRating} 
                    setShowNewComment={setShowNewComment} isAuth={isAuth} userId={Number(userId)}/>
                    {/* --------------comments----------------- */}
                    <div className='  flex flex-col gap-10 lg:w-4/5'>
                        <Comments comments={comments} />
                    </div>

                    {/* ------------------------------- */}


                </div>
                {/* ------------------------------- */}
                <div className='max-w-6xl mx-auto mt-10'>
                    <Pagination setCurrentPage={setCurrentPage} pagesQty={pagesQty} limit={LIMIT} page={currentPage} />
                </div>
            </div>
        </>
  )
}

export default Product