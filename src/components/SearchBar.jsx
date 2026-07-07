import React from 'react'
import { TextField, InputAdornment, Paper } from '@mui/material'

function SearchBar({ value, onChange }) {
  return (
    <Paper elevation={0} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span className="mdi mdi-magnify" style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            </InputAdornment>
          ),
          sx: { bgcolor: 'white' }
        }}
      />
    </Paper>
  )
}

export default SearchBar