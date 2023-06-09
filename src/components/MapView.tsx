import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect } from 'react';
import { CameraImage } from '../data/types.ts'

const mapOptions = {
    scrollWheelZoom: false,
    touchZoom: false,
    dragging: false,
    boxZoom: false
}

export default function MapView(props: { cameras: CameraImage[] }) {
    const { cameras } = props;
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
            L.marker([x.location.latitude, x.location.longitude]).addTo(map);
        })
    }, [cameras])
    return cameras.length ? <div id="map"></div> : <div id="map" style={{ display: 'none' }}></div>
}