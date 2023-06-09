import type { CameraImage } from '../data/types.ts'
import { tagMappings } from '../data/data.ts'
import './style.css'
import { Link } from 'react-router-dom'

export default function Camera(props: { camera: CameraImage }) {
    const { camera } = props

    return <div className="cameraContainer">
        <Link to={"/camera/" + camera.camera_id}><img src={camera.image} className="cameraImage" /></Link>
        <span className="cameraLabel">{tagMappings[camera.camera_id].name}</span>
    </div>
}