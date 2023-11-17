import React  from 'react'
import {TextField,  Typography,Grid,Select,MenuItem} from '@mui/material';

const SearchFilters = ({onChange,value, selectOptions=[]}) => {

   
    const { data, filterBy } = value;
    const handleInputChange = ( key, value ) => {
        onChange({...value, [key]:value})
      }

  return (
    <>
    <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <Typography variant="h5">Buscar</Typography>
    <TextField
      placeholder="Buscar"
      size="small"
      value={data}
      onChange={(e) => handleInputChange('data', e.target.value)}
      fullWidth
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <Typography variant="h5">Filtrar por:</Typography>
    <Select
      style={{ width: '100%' }}
      value={filterBy}
      onChange={(e) => { handleInputChange('filterBy', e.target.value) }}
    >
      {selectOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </Grid>
</Grid>

  </>
  )
}

export default SearchFilters