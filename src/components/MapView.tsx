import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useEffect } from 'react';
import { CameraImage } from '../data/types.ts'
import iconRetinaUrl from '../assets/marker-icon-2x.png';
import iconUrl from '../assets/marker-icon.png';
import shadowUrl from '../assets/marker-shadow.png';

const markerIcon = new L.Icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})


const mapOptions = {
    scrollWheelZoom: false,
    touchZoom: false,
    dragging: false,
    boxZoom: false
}

export default function MapView(props: { cameras: CameraImage[], setSelectedCamera: React.Dispatch<React.SetStateAction<string>> }) {
    const { cameras, setSelectedCamera } = props;
    useEffect(() => {
        const container = L.DomUtil.get('map');
        if (container !== null) {
            // @ts-expect-error: leaflet DomUtil.get return type does not include _leaflet_id
            container._leaflet_id = null;
        }
        const map = L.map('map', mapOptions).setView([1.3521, 103.8198], 11);
        L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 18
        }).addTo(map);
        cameras.forEach(x => {
            const marker = L.marker([x.location.latitude, x.location.longitude], { icon: markerIcon });
            marker.addEventListener('click', () => setSelectedCamera(x.camera_id))
            marker.addTo(map)
        })
        map.addEventListener('click', () => setSelectedCamera(''))
    }, [cameras, setSelectedCamera])
    return cameras.length ? <div id="map"></div> : <div id="map" style={{ display: 'none' }}></div>
}