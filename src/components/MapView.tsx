import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from 'react';
import { CameraImage } from '../data/types.ts'
import iconRetinaUrl from '../assets/marker-icon-2x.png';
import iconUrl from '../assets/marker-icon.png';
import shadowUrl from '../assets/marker-shadow.png';

const longRatio = 0.43910932 / 650;
const latRatio = 0.25291032 / 400;


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
    boxZoom: false,
    doubleClickZoom: false
}

export default function MapView(props: { cameras: CameraImage[], setSelectedCamera: React.Dispatch<React.SetStateAction<string>> }) {
    const [darkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)
    window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));
    const { cameras, setSelectedCamera } = props;
    useEffect(() => {
        const container = L.DomUtil.get('map');
        console.log(container);
        if (container !== null) {
            // @ts-expect-error: leaflet DomUtil.get return type does not include _leaflet_id
            container._leaflet_id = null;
        }
        const divHeight = container ? container.clientHeight : 400;
        const divWidth = container ? container.clientWidth : 650;

        const bounds = [-Infinity, Infinity, -Infinity, Infinity]
        for (const cam of cameras) {
            const { latitude, longitude } = cam.location
            const [north, south, east, west] = bounds
            bounds[0] = north < latitude ? latitude : north;
            bounds[1] = south > latitude ? latitude : south;
            bounds[2] = east < longitude ? longitude : east;
            bounds[3] = west > longitude ? longitude : west;
        }
        const centre: [number, number] = [(bounds[0] + bounds[1]) / 2, (bounds[2] + bounds[3]) / 2]
        let [height, width] = [bounds[0] - bounds[1], bounds[2] - bounds[3]]
        console.log(width, height)
        let zoomLevel = 11;
        while (width * 2 < divWidth * longRatio && (height * 2 < divHeight * latRatio) && (zoomLevel < 14)) {
            width *= 2;
            height *= 2;
            zoomLevel += 1;
            console.log(width, height);
        }
        const map = L.map('map',mapOptions).setView(centre, zoomLevel);
        console.log(darkMode)
        L.tileLayer(darkMode ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' : 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
            attribution: darkMode ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' :
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
    }, [cameras, setSelectedCamera, darkMode])
    return cameras.length ? <div id="map"></div> : <div id="map" style={{ display: 'none' }}></div>
}