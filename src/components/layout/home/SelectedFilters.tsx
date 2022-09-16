import { XMarkIcon } from "@heroicons/react/24/solid"
import { Tooltip } from "@material-tailwind/react"
import { FC } from "react"
import { IFilterValue } from "../../../models/models"

interface IProps{
    selectedFilters: IFilterValue[],
    getSelectedFilters: (filter: IFilterValue)=>void
}

const SelectedFilters:FC<IProps> = ({selectedFilters, getSelectedFilters}) => {
  return (
    <>{selectedFilters.map(filter =>
        <Tooltip key={filter.id} className="bg-white text-gray-500 border border-gray-300" content={filter.filterName}>
          <div className="flex pr-1 pl-2 border border-gray-200 rounded-md bg-gray-100" onClick={() => getSelectedFilters(filter)}>
            {filter.value} <div className="w-5 pt-[2px] ml-2 text-gray-400"><XMarkIcon /></div>
          </div>
        </Tooltip>
      )}</>
  )
}

export default SelectedFilters