import composerMap from '../data/composerMap.json'

function getComposerShort(composer) {
  return composerMap[composer] || composer
}

function cleanSearchText(text) {
  return text.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function getMatchScore(work, keywords) {
  const searchableFields = [
    work.composer,
    getComposerShort(work.composer),
    work.title,
    work.op,
    work.period,
    ...(work.movements || [])
  ]
    .filter(Boolean)
    .map(f => f.toLowerCase())

  let score = 0
  for (const kw of keywords) {
    if (searchableFields.some(field => field.includes(kw))) {
      score++
    }
  }
  return score
}

const composerOrder = Object.keys(composerMap)
const composerIndex = new Map(composerOrder.map((name, idx) => [name, idx]))

function getComposerSortRank(composer) {
  if (!composer) return Infinity
  if (composerIndex.has(composer)) return composerIndex.get(composer)
  const short = getComposerShort(composer)
  if (composerIndex.has(short)) return composerIndex.get(short)
  return Infinity
}

function extractOpNumbers(op) {
  if (!op) return []
  const matches = op.match(/\d+/g)
  return matches ? matches.map(Number) : []
}

function compareOpNumbers(a, b) {
  const numsA = extractOpNumbers(a)
  const numsB = extractOpNumbers(b)
  if (numsA.length === 0 && numsB.length === 0) return 0
  if (numsA.length === 0) return 1
  if (numsB.length === 0) return -1

  const maxLen = Math.max(numsA.length, numsB.length)
  for (let i = 0; i < maxLen; i++) {
    const nA = numsA[i] !== undefined ? numsA[i] : 0
    const nB = numsB[i] !== undefined ? numsB[i] : 0
    if (nA !== nB) return nA - nB
  }
  return 0
}

export function filterWorks(data, searchTerm, filters) {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  let result = data
  const safeSearchTerm = searchTerm || ''

  if (safeSearchTerm.trim()) {
    const cleaned = cleanSearchText(safeSearchTerm)
    const keywords = cleaned.toLowerCase().split(/\s+/).filter(Boolean)

    if (keywords.length > 0) {
      result = result
        .map(work => ({work, score: getMatchScore(work, keywords)}))
        .filter(entry => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(entry => entry.work)
    }
  } else {
    result = [...result].sort((a, b) => {
      const composerDiff = getComposerSortRank(a.composer) - getComposerSortRank(b.composer)
      if (composerDiff !== 0) return composerDiff
      return compareOpNumbers(a.op, b.op)
    })
  }

  if (filters.composer && filters.composer.length > 0) {
    result = result.filter(work => filters.composer.includes(getComposerShort(work.composer)))
  }

  if (filters.genre && filters.genre.length > 0) {
    result = result.filter(work => filters.genre.includes(work.genre))
  }

  if (filters.period && filters.period.length > 0) {
    result = result.filter(work => filters.period.includes(work.period))
  }

  return result
}

export function getAllComposers(data) {
  if (!Array.isArray(data)) return []
  return [...new Set(data.map(w => getComposerShort(w.composer)))].sort()
}

export function getAllGenres(data) {
  if (!Array.isArray(data)) return []
  return [...new Set(data.filter(w => w.genre).map(w => w.genre))].sort()
}

export function getAllPeriods(data) {
  if (!Array.isArray(data)) return []
  return [...new Set(data.filter(w => w.period).map(w => w.period))].sort()
}