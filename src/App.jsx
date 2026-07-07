import React, { useState, useMemo } from 'react'
import { Box, CircularProgress, Alert, Paper } from '@mui/material'
import Layout from './components/Layout'
import FilterBar from './components/FilterBar'
import WorkList from './components/WorkList'
import useMusicData from './hooks/useMusicData'
import { filterWorks } from './utils/search'

const ITEMS_PER_PAGE = 20

function App() {
  const { data, loading, error } = useMusicData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ composer: '', genre: '' })
  const [page, setPage] = useState(1)

  const filteredData = useMemo(() => filterWorks(data, searchTerm, filters), [data, searchTerm, filters])

  React.useEffect(() => {
    setPage(1)
  }, [searchTerm, filters])

  const total = filteredData.length
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, total)
  const countText = total > 0 ? `${startIndex + 1}-${endIndex} of ${total} works` : `${total} works`

  const allComposers = [...new Set(data.map(w => w.composerShort))].sort()
  const allGenres = [...new Set(data.filter(w => w.genre).map(w => w.genre))].sort()

  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <Paper elevation={0} sx={{ mt: -3, mb: 2, pt: 3, pb: 2, border: 0, borderRadius: 0, position: 'sticky', top: { xs: '56px', sm: '64px' }, zIndex: 1000, bgcolor: 'transparent', backdropFilter: 'saturate(1.5) blur(14px)', WebkitBackdropFilter: 'saturate(1.5) blur(14px)' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
            Failed to load data: {error.message}
          </Alert>
        )}

        <FilterBar
          composers={allComposers}
          genres={allGenres}
          filters={filters}
          onFilterChange={setFilters}
          countText={countText}
        />
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <WorkList
          data={data}
          searchTerm={searchTerm}
          filters={filters}
          page={page}
          onPageChange={setPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </Layout>
  )
}

export default App