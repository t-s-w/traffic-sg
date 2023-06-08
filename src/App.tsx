import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

const api_url = 'https://api.data.gov.sg/v1/transport/traffic-images';

type CameraImage = {
  timestamp: string,
  camera_id: string,
  location: { latitude: number, longitude: number },
  image: string,
  image_metadata: { height: number, width: number, md5: string }
}

type TrafficImages = {
  timestamp: string,
  cameras: CameraImage[]
}

type ApiData = {
  api_info: { status: string },
  items: TrafficImages[]
}

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
    console.log(data)
    return <Routes>
      <Route path="/" element={data.items[0].cameras.map(x => <div><img className="cameraImage" src={x.image} /><p>{x.camera_id}</p></div>)} />
    </Routes>
  }
}

export default App
