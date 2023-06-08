type CameraImage = {
    timestamp: string,
    camera_id: string,
    location: { latitude: number, longitude: number },
    image: string,
    image_metadata: { height: number, width: number, md5: string }
}

type TrafficImages = {
    timestamp: string,
    cameras: CameraImage[]
}

type ApiData = {
    api_info: { status: string },
    items: TrafficImages[]
}

type SlugParams = {
    slug: string
}

export type { CameraImage, TrafficImages, ApiData, SlugParams }