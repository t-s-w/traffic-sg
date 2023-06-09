import { tagMappings, slugToTag } from '../data/data';
import { useParams } from 'react-router-dom';
import type { CameraImage, SlugParams } from '../data/types.ts'
import Camera from './Camera.tsx'
import './style.css'
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect } from 'react';


export default function CategoryView(props: { cameras: CameraImage[] }) {
    const { slug } = useParams<SlugParams>();
    useEffect(() => {
        const container = L.DomUtil.get('map');
        if (container !== null) {
            container._leaflet_id = null;
        }
        const map = L.map('map').setView([1.3521, 103.8198], 12);
        L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 18
        }).addTo(map);
    },)
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
    console.log(cameraList)
    return <><div className="cameraSetContainer">{cameraList.map((x: CameraImage) => <Camera key={x.camera_id} camera={x} />)}</div>
        <div id="map"></div></>
}