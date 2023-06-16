# traffic-sg

A lightweight application to view the traffic conditions among Singapore's highways and checkpoints to Malaysia.

Click to access: https://traffic-sg.vercel.app

## Tech stack

* TypeScript + React.js: Provides the content.
* HTML & CSS: Used to style the page and make it responsive to mobile screens as well, with functioning light & dark modes.
* Vite: Development environment for the application.

## API

LTA Traffic data API: https://data.gov.sg/dataset/traffic-images

## User stories & Use cases

* A user planning their route may want an application to have a quick glance at traffic conditions along an expressway before choosing whether to use that expressway as part of their route or to avoid it by using a different road.
    - Currently, the [OneMotoring](https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/traffic_information/traffic-cameras.html) website offers this functionality, however it does not visually show where each traffic camera is located, so it requires the user to know by themselves which camera is located where.
* A user may be curious about how traffic conditions may vary due to different factors, and may want to know what traffic conditions were like in the past.
    - The OneMotoring website currently does not provide this functionality to view historical data.

## React architecture

* `App` - The root component, with the following children:
    * `Nav` - This component provides the links to the different groupings of cameras by expressway.
    * `DatePicker` - This component is used to set the date and time of the traffic camera captures for when the user wants historical data.
    * Routes:
        * `/:slug` - `:slug` represents a category of cameras, e.g. cameras along BKE or SLE. This routing returns a `CategoryView` component, which has the following children:
            * `MapView` shows a map of Singapore with markers to indicate the traffic camera locations. Clicking these markers will highlight the cameras below.
            * `Camera` is the component which visualises a small version of the traffic image and a descriptive name of where that camera is located. Clicking on a `Camera` component links to an individual `CameraZoom component.
        * `/camera/:cameraId` - This route is for zooming in on one particular camera.
            * `CameraZoom` - Contains a full-width version of the traffic image, along with location coordinates and the timestamp of when the image was taken.
