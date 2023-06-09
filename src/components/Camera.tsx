import type { CameraImage } from '../data/types.ts'
import { tagMappings } from '../data/data.ts'
import './style.css'

export default function Camera(props: { camera: CameraImage }) {
    const { camera } = props

    return <div className="cameraContainer"><img src={camera.image} className="cameraImage" /> <span className="cameraLabel">{tagMappings[camera.camera_id].name}</span></div>
}