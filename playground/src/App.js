import React, { Component } from 'react';
import { HereMap, Marker, Polygon, Polyline } from './../node_modules/rc-here-maps';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 52.51,
      lng: 13.4,
      center: {
        lat: 20.5937,
        lng: 78.9629,
      },
      polygonDataPoints: [12, 3, 100, 29, 13, 100, 20, 30, 100],
      polylineDataPoints: [10, 3, 100, 25, 13, 100, 10, 30, 100],
      showPolygon: true,
      showMarker: true,
      showPolyline: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const coords = {
        lat: 12,
        lng: 13,
      };
      this.setState({
        lat: coords.lat,
        lng: coords.lng,
        center: coords,
        polygonDataPoints: [10, 3, 100, 20, 13, 100, 2, 30, 100],
        showPolygon: false,
        showMarker: true,
        showPolyline: false,
      });
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <HereMap
          appId="XezsJWhF8JfEucf5ImcN"
          appCode="HLIInfEMidCaPQtBbWyQuQ"
          useHTTPS={false}
          center={this.state.center}
        >
          {this.state.showMarker && (
            <Marker lat={this.state.lat} lng={this.state.lng}>
              Sample marker
            </Marker>
          )}

          {this.state.showPolygon && <Polygon dataPoints={this.state.polygonDataPoints} />}

          {this.state.showPolyline && <Polyline dataPoints={this.state.polylineDataPoints} />}
        </HereMap>
      </div>
    );
  }
}

export default App;
