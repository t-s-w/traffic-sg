import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import CategoryView from './components/CategoryView'
import type { ApiData } from './data/data.ts'

const api_url = 'https://api.data.gov.sg/v1/transport/traffic-images';

function App() {
  const [data, setData] = useState<ApiData | null>(null)
  useEffect(() => {
    (async function () {
      fetch(api_url).then(x => x.json()).then(x => setData(x)).catch(() => setData(null))
    })()
  }, [])
  if (!data) {
    return <></>
  } else {
    const cameras = data.items[0].cameras
    return <Routes>
      <Route path="/" element={data.items[0].cameras.map(x => <div><img className="cameraImage" src={x.image} /><p>{x.camera_id}</p></div>)} />
      <Route path="/:slug" element={<CategoryView cameras={cameras} />} />
    </Routes>
  }
}

export default App
