import React from 'react'
import { TextField, InputAdornment, Paper, Box } from '@mui/material'

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
              <Box component="span" className="mdi mdi-magnify" sx={{ color: 'text.secondary', fontSize: '1.25rem', lineHeight: 1 }} />
            </InputAdornment>
          ),
          sx: { bgcolor: 'background.paper' }
        }}
      />
    </Paper>
  )
}

export default SearchBar