import { useParams, useNavigate } from 'react-router-dom';
import { CameraImage } from '../data/types.ts';
import './style.css';

export default function CameraZoom(props: { cameras: CameraImage[] }) {
    const navigate = useNavigate();
    const { cameras } = props;
    const { cameraId } = useParams();
    if (!cameraId) {
        return <h1> Error! Camera ID not found </h1>
    }
    const camera = cameras.find(x => x.camera_id == cameraId);
    if (!camera) {
        return <h1> Error! Camera ID not found </h1>
    }
    return <div className="cameraDetails">
        <img src={camera.image} className="cameraImage" />
        <p><span className="infoLabel">Time of capture: </span>{camera.timestamp}</p>
        <p><span className="infoLabel">Geo coordinates: </span>{`[${camera.location.latitude} ${camera.location.longitude}]`}</p>
        <button onClick={() => navigate(-1)}>Back</button>
    </div>
}