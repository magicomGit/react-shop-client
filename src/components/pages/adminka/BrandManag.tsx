import { TrashIcon } from "@heroicons/react/24/solid"
import { Input } from "@material-tailwind/react"
import { useState } from "react"
import { IBrand } from "../../../models/models"
import { useDeleteBrandMutation, useGetBrandsQuery, useNewBrandMutation } from "../../../store/slices/productApiSlice"
import ConfirmModal from "../../UI/ConfirmModal"

const BrandManag = () => {
    const [inputBrand, setInputBrand] = useState<string>('')
    const [confirmShow, setConfirmShow] = useState<boolean>(false)
    const [msgState, setMsgState] = useState('')

    const [brandForDelete, setBrandForDelete] = useState<IBrand>({ id: 0, name: "" })

    const { data: brands } = useGetBrandsQuery('')
    const [newBrand, { data: brand }] = useNewBrandMutation()
    const [deleteBrand, { }] = useDeleteBrandMutation()

    const hendleNewBrand = async () => {
        setMsgState('')
        try {
            await newBrand({ id: 0, name: inputBrand }).unwrap()
            setInputBrand('')
        } catch (error: any) {
            setMsgState(error.data.message + '!')

        }
    }


    const hendleDeleteBrand = async (id: number) => {
        setMsgState('')
        try {            
            await deleteBrand(id)
        } catch (error: any) {
            setMsgState(error.data.message + '!')
            console.log('error')
        }

    }

    const hendleConfirm = (id: number, name: string) => {
        setMsgState('')
        setConfirmShow(true)
        setBrandForDelete({id:id, name:name})
    }
    return (
        <div className="max-w-[1200px] mx-auto min-h-[700px]">
            <ConfirmModal isShow={confirmShow} id={brandForDelete.id}
                message={'Подтвердите удаление товара \'' + brandForDelete.name + '\''}
                setIsShow={setConfirmShow} hendleDelete={hendleDeleteBrand} />

            <div className="flex py-4 w-1/2">

                <Input color="teal" value={inputBrand} label="Брэнд"
                    onChange={(e) => setInputBrand(e.target.value)} />
                <button type="button" onClick={() => hendleNewBrand()}>
                    Добавить брэнд
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {brands && brands.map(brand =>
                    <div key={brand.id} className="flex justify-between w-1/2 border-b border-gray-300">
                        <div className="p-2">{brand.name}</div>
                        <TrashIcon className="h-6 w-6 text-teal-700 cursor-pointer mt-2"
                            onClick={() => hendleConfirm(brand.id, brand.name)} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default BrandManag