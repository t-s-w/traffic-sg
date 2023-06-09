import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import CategoryView from './components/CategoryView.tsx'
import type { ApiData } from './data/types.ts'
import Nav from './components/Nav.tsx'
import CameraZoom from './components/CameraZoom.tsx'

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
    return <>
      <Nav />
      <Routes>
        <Route path="/" element={<p>Click one of the above links to view the traffic conditions along a specific highway.</p>} />
        <Route path="/:slug" element={<CategoryView cameras={cameras} />} />
        <Route path="/camera/:cameraId" element={<CameraZoom cameras={cameras} />} />
      </Routes>
    </>
  }
}

export default App
