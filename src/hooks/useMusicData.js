import musicData from '../../public/data/music.json'

const data = musicData || []

export default function useMusicData() {
  return { data, loading: false, error: null }
}