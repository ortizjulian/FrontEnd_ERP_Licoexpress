import Filter from 'components/Filter/Filter'
import React from 'react'

const InventoryFilter = ({data=[], onFilter})  => {

  const searchFilterOptions = [
    {label: 'Producto', value: 'producto'},
    {label: 'Lote', value: 'lote'},
    {label: 'Stock', value: 'stock'}
  ]


  return (
    <Filter
      data={data}
      searchFilterOptions={searchFilterOptions}
      searchDefaultOption="sede"
      filterData={onFilter}
    />
  )
}

export default InventoryFilter