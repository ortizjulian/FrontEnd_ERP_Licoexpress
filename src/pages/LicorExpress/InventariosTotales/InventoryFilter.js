import Filter from 'components/Filter/Filter'
import React from 'react'

const InventoryFilter = ({data=[], onFilter})  => {

  const searchFilterOptions = [
    {label: 'Producto', value: 'producto'},
    {label: 'Nombre Proveedor', value: 'proveedor'},
    {label: 'Tipo Producto', value: 'tipo'},
    {label: 'Cantidad', value: 'cantidad'}
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