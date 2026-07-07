import { useState, useEffect } from 'react'

const DATA_URL = import.meta.env.VITE_DATA_URL

export default function useMusicData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Data loaded from: ', DATA_URL)
        const response = await fetch(DATA_URL)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const json = await response.json()
        setData(json)
        setError(null)
        console.log(`${json.length} works loaded`)
      } catch (err) {
        setError(err)
        console.error('Failed to load data: ', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}