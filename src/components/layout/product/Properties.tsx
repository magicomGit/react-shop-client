import { FC } from "react"
import { IProperty } from "../../../models/models"


interface IProps{
    properties: IProperty[],
    
}

const Properties:FC<IProps> = ({properties}) => {
    return (
        <div className='lg:pl-16 pl-5 my-5 min-w-[400px]'>
            {properties.map(property =>
                <div key={property.id} className='flex my-3'>
                    <div className='w-60'>{property.name}</div>

                    <div>{property.value}</div>
                </div>
            )}
        </div>
    )
}

export default Properties