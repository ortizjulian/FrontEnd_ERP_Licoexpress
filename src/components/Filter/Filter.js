import React, { useEffect, useState } from 'react'

import { AppstoreAddOutlined,DeleteOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';
import SearchFilters from './SearchFilters';
const Filter = props => {

    const {
        data, 
        filterData, 
        searchFilterOptions=[],
        searchDefaultOption='',
        dateFilterDefaultOption='',
        dateFormat='DD/MM/YYYY'
      } = props

      const [textFilter,setTextFilter] = useState({
        filters:[
          {
            filterBy: searchDefaultOption,
            data: '',
            id: '1'
          }
        ],
        filtersCount: 2,
        trigger: false
      })

      const [dateFilter]= useState({
        dateRange: null,
        filterBy: dateFilterDefaultOption
      })

    const { filters, trigger,filtersCount } = textFilter;

      useEffect( () => {
        
        let filteredRows = [...data]
        
        filters.forEach(f => {
          if(f.data !== ''){
            const invalidChars = /[°"§%()[\]{}=\\?´`'#<>|;:+_-]+/g 
            const sanitizedQueryText= f.data.replace(invalidChars, '')
            const regex = new RegExp(`${sanitizedQueryText}`, 'gi')
            filteredRows = filteredRows.filter( row => row[f.filterBy].toString().match(regex)) 
          } 
        })
        if(dateFilter.dateRange !== null){
          filteredRows = filteredRows.filter(row => {
            const fechaInicio = dateFilter.dateRange[0]
            const fechaFin = dateFilter.dateRange[1]
            const fecha = moment(row[dateFilter.filterBy], dateFormat)
            return fecha.isBetween(fechaInicio, fechaFin, 'date', '[]') ;
          });
        }
        filterData(filteredRows)
        
      },[data, dateFilter, filters, trigger, filterData, dateFormat]);

      const handleSearch = (id, value) => {
        const updatedFilters = filters.map(f => f.id === id ? ({...f,...value}) : f)
        setTextFilter(s => ({...s,filters: updatedFilters, trigger: !s.trigger}))
        
      }

      const addFilter = () => () => {
        const updatedFilters = [...filters,{data: '', filterBy: searchDefaultOption, id: `${filtersCount + 1}`}]
        setTextFilter(s => ({...s,filters: updatedFilters, filtersCount: filtersCount + 1}))
        
      }
    
  const removeFilter = id => () => {
    const updatedFilters = filters.filter(f => f.id !== id)
    setTextFilter(s => ({...s, filters: updatedFilters}))
  }
  return (
    <>
       {
        searchFilterOptions.length > 0 &&  filters.map(({id, ...filter}) =>
        
       

           
          <Grid container spacing={2} key={id}  >
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={11} md={11}>
                <SearchFilters
                  id={id}
                  value={filter}
                  onChange={(value) => handleSearch(id, value)}
                  removeFilter={removeFilter}
                  selectOptions={searchFilterOptions}
                />
              </Grid>
              <Grid item>
              { id !== '1' && <DeleteOutlined  style={{marginTop: '45px', marginLeft: '10px'}} onClick={removeFilter(id)}  />}
             
              
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      
        )
      }
       <Grid container justifyContent="end" >  <AppstoreAddOutlined onClick={addFilter()} className="clickable" /> </Grid>
    
    </>
  )
}

export default Filter