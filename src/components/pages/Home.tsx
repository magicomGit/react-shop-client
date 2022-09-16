import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { ICategory, IFilterValue } from "../../models/models"
import { useGetFilterNamesQuery } from "../../store/slices/filterApiSlice"
import { useGetCategiriesQuery, useGetFilteredProductsMutation } from "../../store/slices/productApiSlice"
import Pagination from "../layout/Pagination"
import { Tooltip } from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Filters from "../layout/home/Filters"
import Products from "../layout/home/Products"
import Categories from "../layout/home/Categories"
import ActivatedMsg from "../layout/home/ActivatedMsg"
import SelectedFilters from "../layout/home/SelectedFilters"



const LIMIT = 5

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<ICategory>({ id: 0, name: '', picture: '' })

  let categoryId = 1
  const params = useParams();
  if (params.id) {
    categoryId = Number(params.id)
  }

  useEffect(() => {
    setSelectedCategoryId(categoryId)
  }, [categoryId])

  const [activatedMessage, setActivatedMessage] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    if (searchParams.get("isActivated")) {
      setActivatedMessage(searchParams.get("isActivated") || '')
      setTimeout(() => setActivatedMessage(''), 5000)
    }
  }, [])






  const [selectedFilters, setSelectedFilters] = useState<IFilterValue[]>([])
  const [selectedFilterIds, setSelectedFilterIds] = useState<number[]>([])

  const [productsQty, setProductsQty] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesQty, setPagesQty] = useState(1)

  const [rangeValues, setRangeValues] = useState([1000, 200000])//фильтр по цене

  const { data: categories, isSuccess: isSuccessCategories } = useGetCategiriesQuery('')
  const { data: filterNames } = useGetFilterNamesQuery(selectedCategoryId)

  useEffect(() => {

    setSelectedCategory(categories?.find((category) => category.id === selectedCategoryId) || { id: 1, name: 'Смартфоны', picture: '' })




  }, [categories])


  const [GetFilteredProducts, {
    data: filteredProducts,
    isLoading: isLoadingFilteredProducts
  }] = useGetFilteredProductsMutation()


  useEffect(() => {
    hendleGetFilteredProducts()
  }, [currentPage])

  useEffect(() => {    //при изменении фильтров - сброс текущей страницы
    if (currentPage === 1) {
      hendleGetFilteredProducts()
    } else {
      setCurrentPage(1)
    }
  }, [selectedFilters, rangeValues, selectedCategoryId])

  async function hendleGetFilteredProducts() {
    try {
      GetFilteredProducts({ categoryId: selectedCategoryId, priceRange: rangeValues, filters: selectedFilters, limit: LIMIT, page: currentPage })
        .then((res: any) => {
          setProductsQty(res.data.count); setPagesQty(Math.ceil(res.data.count / LIMIT))
        })

    } catch (error) {

    }
  }



  function getSelectedFilters(newTemplate: IFilterValue) {
    let filters: IFilterValue[] = []
    let selectedIds: number[] = []
    if (!selectedFilterIds.includes(newTemplate.id)) {
      filters = selectedFilters.filter(template => template.id !== newTemplate.id)
      filters.push(newTemplate)

      selectedIds = selectedFilterIds.filter(filterId => filterId !== newTemplate.id)
      selectedIds.push(newTemplate.id)
    } else {
      filters = selectedFilters.filter(template => template.id !== newTemplate.id)
      selectedIds = selectedFilterIds.filter(filterId => filterId !== newTemplate.id)
    }

    setSelectedFilters(filters)
    setSelectedFilterIds(selectedIds)
  }

  return (
    <div className='max-w-[1200px] mx-auto min-h-[900px]'>
      <ActivatedMsg message={activatedMessage} />

      <div className='flex gap-1   overflow-x-auto'>
        {isSuccessCategories && <Categories categories={categories} />}
      </div>

      <div className='px-7 py-3 text-3xl'>{selectedCategory.name} </div>
      <div className="flex gap-2 mb-3 cursor-pointer" >
        <SelectedFilters getSelectedFilters={getSelectedFilters} selectedFilters={selectedFilters}/>
      </div>
      <div className='lg:flex justify-between'>
        <div className='lg:w-5/6 lg:pr-3'  >
          {isLoadingFilteredProducts ?
            'Загрузка...'
            :
            <Products products={filteredProducts?.products} />
          }
          <div className='max-w-6xl mx-auto my-8'>
            <Pagination setCurrentPage={setCurrentPage} pagesQty={pagesQty} limit={LIMIT} page={currentPage} />
          </div>

        </div>
        {/* ------ характеристики категории и шаблоны для этой характеристики ---------------- */}
        <div className='bg-gray-100 lg:p-3 lg:w-1/6 px-8 py-3 lg:min-h-[700px]'>
          {isLoadingFilteredProducts
            ?
            'Загрузка...'
            :
            <Filters
              filterNames={filterNames || []}
              filterValues={filteredProducts?.filterValueQuantities}
              getSelectedfilters={getSelectedFilters}
              rangeValues={rangeValues}
              selectedFilterIds={selectedFilterIds}
              setRangeValues={setRangeValues}
            />
          }

        </div>

      </div>


    </div>
  )
}

export default Home

