## Components

**src/Circle/index.js**

### 1. Circle

| Property      | Type   | Required | Default value               | Description |
| :------------ | :----- | :------- | :-------------------------- | :---------- |
| center        | object | no       | &lt;See the source code&gt; |
| radius        | number | no       | 10                          |
| fillColor     | string | no       | &lt;See the source code&gt; |
| strokeColor   | string | no       | &lt;See the source code&gt; |
| lineWidth     | number | no       | 2                           |
| onCircleDrawn | func   | no       | &lt;See the source code&gt; |

---

**src/HereMap/index.js**

### 1. HereMaps

| Property    | Type   | Required | Default value               | Description                                                     |
| :---------- | :----- | :------- | :-------------------------- | :-------------------------------------------------------------- |
| appId       | string | no       | &lt;See the source code&gt; | Heremaps App ID                                                 |
| appCode     | string | no       | &lt;See the source code&gt; | Heremaps App Code                                               |
| useHTTPS    | bool   | no       | true                        | If true then works in https                                     |
| onMapLoaded | func   | no       | &lt;See the source code&gt; | Called when the map is loaded. This returns the map object.     |
| center      | object | no       | &lt;See the source code&gt; | Center of the map. It should be like this {lat: 12.12, lng: 13} |
| bounds      | object | no       | &lt;See the source code&gt; | Rectangular bounds which restrict the maps viewing port         |

It should be like this {north: 12, south: 17, east: 10, west: 14}
zoom|number|no|10|Zoom level of the map. Defaults to 10.

---

**src/Marker/index.js**

### 1. Marker

Creates dom marker based on the lat and lng

| Property        | Type   | Required | Default value               | Description                                                   |
| :-------------- | :----- | :------- | :-------------------------- | :------------------------------------------------------------ |
| lat             | number | no       | 0                           | Latitude position of the marker                               |
| lng             | number | no       | 0                           | Longitude position of the marker                              |
| onMarkerCreated | custom | no       | &lt;See the source code&gt; | Called when the marker is added to the map                    |
| draggable       | bool   | no       | false                       | If set true, the marker will be draggable. Defaults to false. |
| behavior        | object | no       | &lt;See the source code&gt; |

---

**src/Polygon/index.js**

### 1. Polygon

Creates polygon based on the datapoints(which are lat, lng and alt)

| Property       | Type   | Required | Default value               | Description                                                                                                                                |
| :------------- | :----- | :------- | :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| dataPoints     | array  | no       | &lt;See the source code&gt; | An array of data which will have lat, lng and alt. for eg: [12, 13, 100, 22, 13, 100] 12 is latitude, 13 is longitude and 100 is latitude. |
| fillColor      | string | no       | &lt;See the source code&gt; | The filling color in CSS syntax, the default is #FFFFCC. It can be hex or rgba value.                                                      |
| strokeColor    | string | no       | &lt;See the source code&gt; | The color of the stroke in CSS syntax, the default is #829.                                                                                |
| lineWidth      | number | no       | 1                           | width of the line in pixels. Defaults to 1.                                                                                                |
| onPolygonDrawn | func   | no       | &lt;See the source code&gt; | Called when the polygon is added to the map                                                                                                |

---

**src/Polyline/index.js**

### 1. Polyline

Creates the polyline component on the map

| Property        | Type   | Required | Default value               | Description                                                                                                                               |
| :-------------- | :----- | :------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| dataPoints      | array  | no       | &lt;See the source code&gt; | An array of data which will have lat, lng and alt for eg: [12, 13, 100, 22, 13, 100] 12 is latitude, 13 is longitude and 100 is latitude. |
| strokeColor     | string | no       | &lt;See the source code&gt; | Color of the polyline. It can be hex or rgba value.                                                                                       |
| lineWidth       | number | no       | 2                           | width of the polyline. Default is 1.                                                                                                      |
| miterLength     | number | no       | 10                          | The miter length as the distance between the inner corner and the outer corner where two lines meet. The default is 10.                   |
| onPolylineDrawn | func   | no       | &lt;See the source code&gt; | Called when the polyline is added to the map                                                                                              |
| lineDash        |        | no       | &lt;See the source code&gt; |
| lineDashOffset  |        | no       | 0                           |

---

**src/Rectangle/index.js**

### 1. Rectangle

Creates rectange on the map based on the bounds

| Property         | Type   | Required | Default value               | Description                                                                                                                                                            |
| :--------------- | :----- | :------- | :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bounds           | object | no       | &lt;See the source code&gt; | Bounds represents a rectangular geographic area defined by the geographic coordinates of its top-left and bottom-right corners.{north: 22,south: 12,east: 11,west: 10} |
| fillColor        | string | no       | &lt;See the source code&gt; | Fillcolor of the rectangle. It can be an Hex value or RGBA value                                                                                                       |
| strokeColor      | string | no       | &lt;See the source code&gt; | Stroke color is the border color of the rectangle                                                                                                                      |
| lineWidth        | number | no       | 1                           | Linewidth of the rectangle. Defaults to 1.                                                                                                                             |
| onRectangleDrawn | func   | no       | &lt;See the source code&gt; | Called when the rectange is added to the map                                                                                                                           |

---

<sub>This document was generated by the <a href="https://github.com/marborkowski/react-doc-generator" target="_blank">**React DOC Generator v1.2.5**</a>.</sub>
