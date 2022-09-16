import { FC } from "react"
import { ICategory } from "../../../models/models"

interface IProps{
    categories:ICategory[]
}

const Categories:FC<IProps> = ({categories}) => {
  return (
    <>
    { categories.map(category =>
          <a key={category.id} href={`/category/${category.id}`}>
            <div className="flex flex-col  items-center min-w-[190px] h-24 border border-slate-300 my-5 
          rounded-md shadow-sm hover:shadow-md hover:text-teal-500 cursor-pointer relative transition ease-in-out delay-250 duration-200">
              <div className='absolute transition ease-in-out delay-250 duration-200 scale-95 hover:scale-100 w-full h-full pt-2'>
                <img className='h-14 mx-auto '
                  src={process.env.REACT_APP_API_URL + '/' + category.picture} />
              </div>
              <div className='mt-16'>{category.name}</div>
            </div>
          </a>
        )}
    </>
  )
}

export default Categories