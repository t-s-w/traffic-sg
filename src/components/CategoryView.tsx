import { tagMappings, slugToTag } from '../data/data';
import { useParams } from 'react-router-dom';
import type { CameraImage, SlugParams } from '../data/types.ts'
import Camera from './Camera.tsx'
import './style.css'


export default function CategoryView(props: { cameras: CameraImage[] }) {
    const { slug } = useParams<SlugParams>();
    if (slug === undefined) {
        return <h1>Error: Category Not Found</h1>
    }
    const tag = slugToTag[slug];
    const cameraList = props.cameras.filter((x: CameraImage) => tagMappings[x.camera_id]?.tags.includes(tag))
    console.log(cameraList)
    return <div className="cameraSetContainer">{cameraList.map((x: CameraImage) => <Camera camera={x} />)}</div>
}