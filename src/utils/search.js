export function filterWorks(data, searchTerm, filters) {
  let result = data

  if (searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase()
    result = result.filter(work => {
      if (work.composer.toLowerCase().includes(term)) return true
      if (work.composerShort.toLowerCase().includes(term)) return true
      if (work.title.toLowerCase().includes(term)) return true
      if (work.op && work.op.toLowerCase().includes(term)) return true
      if (work.period && work.period.toLowerCase().includes(term)) return true
      if (work.movements && work.movements.some(m => m.toLowerCase().includes(term))) return true
      return false
    })
  }

  if (filters.composer) {
    result = result.filter(work => work.composerShort === filters.composer)
  }

  if (filters.genre) {
    result = result.filter(work => work.genre === filters.genre)
  }

  if (filters.period) {
    result = result.filter(work => work.period === filters.period)
  }

  return result
}

export function getAllComposers(data) {
  return [...new Set(data.map(w => w.composerShort))].sort()
}

export function getAllGenres(data) {
  return [...new Set(data.filter(w => w.genre).map(w => w.genre))].sort()
}

export function getAllPeriods(data) {
  return [...new Set(data.filter(w => w.period).map(w => w.period))].sort()
}