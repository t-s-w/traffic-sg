import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import CategoryView from './components/CategoryView.tsx'
import type { ApiData } from './data/types.ts'
import Nav from './components/Nav.tsx'
import CameraZoom from './components/CameraZoom'
import DatePicker from './components/DatePicker.tsx'

const api_url = 'https://api.data.gov.sg/v1/transport/traffic-images';

function App() {
  const [data, setData] = useState<ApiData | null>(null)
  const [datetime, setDatetime] = useState('')

  useEffect(() => {
    (async function () {
      const query = datetime && `?date_time=${datetime}`
      fetch(api_url + query).then(x => x.json()).then(x => setData(x)).catch(() => setData(null))
    })()
  }, [datetime])
  if (!data) {
    return <h3>Error fetching traffic image data. Please try again later.</h3>
  } else {
    const cameras = data.items[0].cameras
    return <>
      <Nav />
      <DatePicker setDatetime={setDatetime} />
      <Routes>
        <Route path="/" element={<><h1 className="title">traffic sg</h1><p>Click one of the above links to view the traffic conditions along a specific highway.</p></>} />
        <Route path="/:slug" element={<CategoryView cameras={cameras} />} />
        <Route path="/camera/:cameraId" element={<CameraZoom cameras={cameras} />} />
      </Routes>
    </>
  }
}

export default App
