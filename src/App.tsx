import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import CategoryView from './components/CategoryView.tsx'
import type { ApiData } from './data/types.ts'

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
      <Routes>sss
        <Route path="/" element={<><Link to="/SLE">SLE</Link> {cameras.map(x => <div key={x.camera_id}><img className="cameraImage" src={x.image} /><p>{x.camera_id}</p></div>)}</>} />
        <Route path="/:slug" element={<CategoryView cameras={cameras} />} />
      </Routes>
    </>
  }
}

export default App
