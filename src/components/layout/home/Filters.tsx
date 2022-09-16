import { Checkbox } from "@material-tailwind/react"
import { FC } from "react"
import { IFilterName, IFilterValueQuantities } from "../../../models/models"
import Range from "../../UI/Range"


interface IProps {    
    filterNames: IFilterName[] ,
    filterValues: IFilterValueQuantities[] | undefined ,
    getSelectedfilters: (filterValue: IFilterValueQuantities) => void,
    rangeValues:number[],
    setRangeValues:(rangeValues:number[])=> void,
    selectedFilterIds: number[]
}

const Filters: FC<IProps> = (props) => {
    return (
        <>
            <Range values={props.rangeValues} setValues={props.setRangeValues} />
            {props.filterNames?.map((filterName) =>
                <div key={filterName.id} className=''>

                    <div>{filterName.name}</div>
                    {props.filterValues?.map((filterValue) =>
                        filterName.name === filterValue.filterName &&
                        <div key={filterValue.id} className='flex my-1'>

                            <Checkbox
                                ripple={false} color='teal'
                                className=' hover:before:opacity-0 disabled:bg-gray-200 bg-white -m-1'
                                checked={props.selectedFilterIds.includes(filterValue.id) ? true : false}
                                disabled={filterValue.productQty === 0 && ! props.selectedFilterIds.includes(filterValue.id) ? true : false}
                                onChange={(e: any) => { props.getSelectedfilters(filterValue) }}
                            />

                            <div className={`${filterValue.productQty === 0 && 'text-gray-400'}, mt-1.5`}>{filterValue.value}</div>
                            <div className='px-1  text-[10px] text-gray-600 mt-1.5'>
                                {filterValue.productQty !== 0 && filterValue.productQty}
                            </div>
                        </div>

                    )}


                </div>
            )}
        </>

    )
}

export default Filters