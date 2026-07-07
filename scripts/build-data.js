import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sampleData = [
  {
    composer: "Johann Sebastian Bach",
    composerShort: "J.S. Bach",
    title: "Sonata No. 1 in G minor",
    op: "BWV 1001",
    genre: "Chamber Music",
    movements: ["Adagio", "Fuga", "Siciliana", "Presto"]
  },
  {
    composer: "Johann Sebastian Bach",
    composerShort: "J.S. Bach",
    title: "Partita No. 1 in B-flat major",
    op: "BWV 825",
    genre: "Keyboard",
    movements: ["Praeludium", "Allemande", "Courante", "Sarabande", "Menuet I", "Menuet II", "Gigue"]
  },
  {
    composer: "Ludwig van Beethoven",
    composerShort: "L. van Beethoven",
    title: "Piano Sonata No. 14 in C-sharp minor",
    op: "Op. 27 No. 2",
    genre: "Piano Sonata",
    movements: ["Adagio sostenuto", "Allegretto", "Presto agitato"]
  },
  {
    composer: "Ludwig van Beethoven",
    composerShort: "L. van Beethoven",
    title: "Symphony No. 5 in C minor",
    op: "Op. 67",
    genre: "Symphony",
    movements: ["Allegro con brio", "Andante con moto", "Scherzo: Allegro", "Allegro"]
  },
  {
    composer: "Antonio Vivaldi",
    composerShort: "A. Vivaldi",
    title: "The Four Seasons - Spring",
    op: "Op. 8 No. 1",
    genre: "Concerto",
    movements: ["Allegro", "Largo e pianissimo sempre", "Allegro (Danza pastorale)"]
  },
  {
    composer: "Antonio Vivaldi",
    composerShort: "A. Vivaldi",
    title: "The Four Seasons - Summer",
    op: "Op. 8 No. 2",
    genre: "Concerto",
    movements: ["Allegro non molto", "Adagio e piano - Presto e forte", "Presto"]
  },
  {
    composer: "Antonio Vivaldi",
    composerShort: "A. Vivaldi",
    title: "The Four Seasons - Autumn",
    op: "Op. 8 No. 3",
    genre: "Concerto",
    movements: ["Allegro", "Adagio molto", "Allegro"]
  },
  {
    composer: "Antonio Vivaldi",
    composerShort: "A. Vivaldi",
    title: "The Four Seasons - Winter",
    op: "Op. 8 No. 4",
    genre: "Concerto",
    movements: ["Allegro non molto", "Largo", "Allegro"]
  },
  {
    composer: "Frédéric Chopin",
    composerShort: "F. Chopin",
    title: "Nocturne in E-flat major",
    genre: "Nocturne",
    movements: []
  },
  {
    composer: "Frédéric Chopin",
    composerShort: "F. Chopin",
    title: "Ballade No. 1 in G minor",
    op: "Op. 23",
    genre: "Ballade",
    movements: []
  },
  {
    composer: "Claude Debussy",
    composerShort: "C. Debussy",
    title: "Suite bergamasque",
    op: "L. 75",
    genre: "Suite",
    movements: ["Prélude", "Menuet", "Clair de lune", "Passepied"]
  },
  {
    composer: "Wolfgang Amadeus Mozart",
    composerShort: "W.A. Mozart",
    title: "Symphony No. 40 in G minor",
    op: "K. 550",
    genre: "Symphony",
    movements: ["Molto allegro", "Andante", "Menuetto: Allegretto", "Allegro assai"]
  }
]

function buildData() {
  const outputDir = path.join(__dirname, '../public/data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const outputPath = path.join(outputDir, 'music.json')

  fs.writeFileSync(
    outputPath,
    JSON.stringify(sampleData, null, 2),
    'utf8'
  )

  const stats = fs.statSync(outputPath)
  console.log(`✅ 数据构建完成！`)
  console.log(`📊 共 ${sampleData.length} 部作品`)
  console.log(`📦 文件大小: ${(stats.size / 1024).toFixed(2)} KB`)
  console.log(`📁 保存位置: ${outputPath}`)
}

buildData()