import { TrashIcon } from "@heroicons/react/24/solid"
import { Input } from "@material-tailwind/react"
import { useState } from "react"
import { ICategory } from "../../../models/models"
import { useDeleteCategoryMutation, useGetCategiriesQuery, useNewCategoryMutation } from "../../../store/slices/productApiSlice"
import ConfirmModal from "../../UI/ConfirmModal"

const CategoryManag = () => {
    const [inputCategory, setInputCategory] = useState<string>('')
    const [confirmShow, setConfirmShow] = useState<boolean>(false)
    const [categoryForDelete, setCategoryForDelete] = useState<ICategory>({ id: 0, name: "", picture: "" })
    const [msgState, setMsgState] = useState('')

    const { data: categories } = useGetCategiriesQuery('')
    const [newCategory, { data: category }] = useNewCategoryMutation()
    const [deleteCategory, { isError: isDelCategoryError }] = useDeleteCategoryMutation()

    const hendleNewCategory = async () => {
        setMsgState('')
        try {
            await newCategory({ id: 0, name: inputCategory, picture: '' }).unwrap()
            setInputCategory('')
        } catch (error: any) {
            setMsgState(error.data.message + '!')

        }
    }


    const hendleDeleteCategory = async (id: number) => {
        setMsgState('')
        try {
            await deleteCategory(id)
        } catch (error: any) {
            setMsgState(error.data.message + '!')
            console.log('error')
        }

    }

    const hendleConfirm = (id: number, name: string) => {
        setMsgState('')
        setConfirmShow(true)
        setCategoryForDelete({ id: id, name: name, picture: "" })
    }
    return (
        <div className="max-w-[1200px] mx-auto min-h-[700px]">
            <ConfirmModal isShow={confirmShow} id={categoryForDelete.id}
                message={'Подтвердите удаление товара \'' + categoryForDelete.name + '\''}
                setIsShow={setConfirmShow} hendleDelete={hendleDeleteCategory} />

            <div className="flex py-4 w-1/2">
                
                <Input value={inputCategory} label="Категория" color="teal"
                    onChange={(e) => setInputCategory(e.target.value)} />
                <button type="button" onClick={() => hendleNewCategory()}>
                    Добавить категорию
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {categories && categories.map(category => 
                    <div key={category.id} className="flex justify-between w-1/2 border-b border-gray-300">
                        <div className="p-2">{category.name}</div>
                        <TrashIcon className="h-6 w-6 text-teal-700 cursor-pointer mt-2" 
                        onClick={()=>hendleConfirm(category.id, category.name)}/>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default CategoryManag