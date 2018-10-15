# RC Here Maps

[![Build Status](https://semaphoreapp.com/api/v1/projects/d4cca506-99be-44d2-b19e-176f36ec8cf1/128505/badge.svg)](https://semaphoreapp.com/boennemann/badges)

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/hentrymartin/rc-here-maps)

[![npm](https://img.shields.io/badge/npm-v1.1.5-green.svg)](https://www.npmjs.com/package/rc-here-maps)

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

Here Maps provide amazing api's to add map using Javascript. This is a React wrapper for Here Maps API. Right now, this library gives functionalities like creating map and adding objects like Marker, Polygon, Polyline, Rectangle and Circle on top of it.

### How to install it

It's pretty easy to install this library in your react app,

`npm install rc-here-maps`

### Prerequisite

Copy the following snippet and paste it in your html file,

```html
  <link href="https://js.api.here.com/v3/3.0/mapsjs-ui.css" rel="stylesheet">

  <script src="https://js.api.here.com/v3/3.0/mapsjs-core.js" type="text/javascript" charset="utf-8"></script>
  <script src="https://js.api.here.com/v3/3.0/mapsjs-service.js" type="text/javascript" charset="utf-8"></script>
  <script src="https://js.api.here.com/v3/3.0/mapsjs-mapevents.js" type="text/javascript" charset="utf-8"></script>
  <script src="https://js.api.here.com/v3/3.0/mapsjs-ui.js" type="text/javascript" charset="utf-8"></script>
```

### Demo

You can see the demo of this library [here](https://hentrymartin.github.io/rc-here-maps-example/)

### Basic Usage

```javascript
import React, { Component } from 'react';
import { HereMap, Marker, Ployline, Polygon, Circle, Rectangle } from 'rc-here-map';

class MapDemo extends Component {
  constructor(props) {
    super(props);

    this.center = {
      lat: 52.51,
      lng: 13.4,
    };

    this.bounds = {
      north: 53.1,
      south: 13.1,
      east: 43.1,
      west: 40.1,
    };
  }
  onPolylineDrawn = () => {
    console.log('polyline drawn');
  };

  onPolygonDrawn = () => {
    console.log('Polygon drawn');
  };

  onCircleDrawn = () => {
    console.log('circle drawn');
  };

  onRectangleDrawn = () => {
    console.log('rectangle drawn');
  };

  render() {
    return (
      <div className="map-wrapper">
        <HereMap appId="YYYY" appCode="XXXX" useHTTPS={false} center={this.center}>
          <Marker lat={52.21} lng={48.12}>
            This is a sample marker
          </Marker>

          <Polyline
            dataPoints={[52, 48, 100, 42, 77, 100]}
            strokeColor="#HexCode"
            lineWidth={3}
            onPolylineDrawn={this.onPolylineDrawn}
          />

          <Polygon
            dataPoints={[52, 48, 100, 42, 77, 100]}
            fillColor="#HexCode"
            strokeColor="#HexCode"
            lineWidth={3}
            onPolylineDrawn={this.onPolygonDrawn}
          />

          <Circle
            center={this.center}
            radius={1000}
            fillColor="#HexCode"
            strokeColor="#HexCode"
            onCircleDrawn={this.onCircleDrawn}
          />

          <Rectangle
            bounds={this.bounds}
            fillColor="#HexCode"
            strokeColor="#HexCode"
            onRectangleDrawn={this.onRectangleDrawn}
          />
        </HereMap>
      </div>
    );
  }
}

export default MapDemo;
```

### Documentation

You can view the documentation [here](https://github.com/hentrymartin/rc-here-maps/blob/master/DOCUMENTATION.md)

Feel free to contribute to this repo by raising PR.
