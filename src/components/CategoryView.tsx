import { tagMappings, slugToTag } from '../data/data';
import { useParams } from 'react-router-dom';
import type { CameraImage, SlugParams } from '../data/types.ts'
import Camera from './Camera.tsx'
import './style.css'
import MapView from './MapView.tsx'
import { useState } from 'react'

export default function CategoryView(props: { cameras: CameraImage[] }) {
    const { slug } = useParams<SlugParams>();
    const [selectedCamera, setSelectedCamera] = useState('');

    function testSelected(cameraId: string) {
        if (selectedCamera) {
            return cameraId !== selectedCamera
        }
        return false
    }

    if (slug === undefined) {
        return <><h1>Error: Category Not Found</h1><div id="map" style={{ display: "none" }}></div></>
    }

    const tag = slugToTag[slug];
    if (tag === undefined) {
        return <>
            <h1>Error: Category Not Found</h1><div id="map" style={{ display: "none" }}></div>
        </>
    }
    const cameraList = props.cameras.filter((x: CameraImage) => tagMappings[x.camera_id]?.tags.includes(tag))

    return <><MapView cameras={cameraList} setSelectedCamera={setSelectedCamera} /><div className="cameraSetContainer">{cameraList.map((x: CameraImage) => <Camera key={x.camera_id} camera={x} unselected={testSelected(x.camera_id)} />)}</div>
    </>
}