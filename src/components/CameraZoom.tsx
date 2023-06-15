import { useParams, useNavigate, Link } from 'react-router-dom';
import { CameraImage } from '../data/types.ts';
import { tagMappings } from '../data/data.ts'
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
    const timestamp = new Date(camera.timestamp)

    return <div className="cameraDetails">
        <h2>{tagMappings[cameraId].name}</h2>
        <Link to="#" onClick={(evt) => { evt.preventDefault; navigate(-1) }}>
            <img src={camera.image} className="cameraImage" />
        </Link>
        <p><span className="infoLabel">Time of capture: </span>{timestamp.toLocaleDateString('en-sg', { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" })}</p>
        <p><span className="infoLabel">Geo coordinates: </span>{`[${camera.location.latitude}, ${camera.location.longitude}]`}</p>
        <Link to="#" className="navLink" onClick={(evt) => { evt.preventDefault; navigate(-1) }}>Back</Link>
    </div>
}