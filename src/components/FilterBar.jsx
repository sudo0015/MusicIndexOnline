import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider
} from '@mui/material'

function FilterBar({
  composers,
  genres,
  filters,
  onFilterChange,
  countText = '',
  onToggleTheme,
  themeMode,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const isDark = themeMode === 'dark'

  const handleChange = (field) => (event) => {
    onFilterChange({ ...filters, [field]: event.target.value })
  }

  const clearFilters = () => {
    onFilterChange({ composer: '', genre: '' })
  }

  const activeFilterCount =
    (filters.composer ? 1 : 0) + (filters.genre ? 1 : 0)
  const hasFilters = activeFilterCount > 0

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
        {countText}
      </Typography>

      <Box sx={{ flex: 1 }} />

      <Button
        variant="contained"
        color="primary"
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        startIcon={<span className="mdi mdi-filter" />}
        endIcon={<span className="mdi mdi-chevron-down" />}
        sx={{
          borderRadius: '6px',
          py: 0.8,
          px: 1.5,
          fontFamily: '"EB Garamond", serif',
          fontSize: '0.95rem',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        }}
      >
        Filters
        {hasFilters && (
          <Box
            component="span"
            sx={{
              ml: 1,
              px: 1,
              minWidth: 20,
              textAlign: 'center',
              bgcolor: (t) => t.palette.primary.contrastText,
              color: 'primary.main',
              borderRadius: 9999,
              fontSize: 11,
              lineHeight: 1.6,
            }}
          >
            {activeFilterCount}
          </Box>
        )}
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={onToggleTheme}
        startIcon={<span className={`mdi ${isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'}`} />}
        sx={{
          borderRadius: '6px',
          py: 0.8,
          px: 1.5,
          fontFamily: '"EB Garamond", serif',
          fontSize: '0.95rem',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        }}
      >
        {isDark ? 'Light' : 'Dark'}
      </Button>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{ sx: { minWidth: 280, p: 1 } }}
        MenuListProps={{ dense: true }}
      >
        <Box sx={{ px: 1, pb: 1 }}>
          <FormControl fullWidth size="small" sx={{ mb: 1 }}>
            <InputLabel id="composer-filter-label">Composer</InputLabel>
            <Select
              labelId="composer-filter-label"
              value={filters.composer}
              label="Composer"
              onChange={handleChange('composer')}
            >
              <MenuItem value="">All composers</MenuItem>
              {composers.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="genre-filter-label">Genre</InputLabel>
            <Select
              labelId="genre-filter-label"
              value={filters.genre}
              label="Genre"
              onChange={handleChange('genre')}
            >
              <MenuItem value="">All genres</MenuItem>
              {genres.map((g) => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {hasFilters && (
          <>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={clearFilters}
              sx={{ justifyContent: 'center', color: 'primary.main' }}
            >
              Clear filters
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  )
}

export default FilterBar