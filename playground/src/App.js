import React, { Component } from 'react';
import { HereMap, Marker, Polygon, Polyline, Circle, Rectangle, PathFinder } from 'rc-here-maps';
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
      circleCenter: {
        lat: 11,
        lng: 8,
      },
      polygonDataPoints: [12, 3, 100, 29, 13, 100, 20, 30, 100, 12.13, 15.05, 100],
      polylineDataPoints: [10, 3, 100, 25, 13, 100, 10, 30, 100, 25, 25, 100],
      rectBounds: {
        north: 53.1,
        south: 13.1,
        east: 43.1,
        west: 40.1,
      },
      showPolygon: true,
      showMarker: false,
      showPolyline: false,
      showCircle: false,
      showRect: false,
      showPopover: false,
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
        circleCenter: coords,
        // polygonDataPoints: [10, 3, 100, 20, 13, 100, 2, 30, 100],
        showPolygon: false,
        showMarker: true,
        showPolyline: false,
        showCircle: true,
        showRect: false,
      });
    }, 1000);
  }

  onClick = () => {
    console.log('I am clicked');
  };

  onPolygonClick = () => {
    console.log('Polygon clicked');
  };

  onRectClick = () => {
    console.log('Rectangle clicked');
  };

  onCircleClicked = () => {
    console.log('on circle clicked');
  };

  onTogglePopover = showPopover => {
    this.setState({
      showPopover,
    });
  };

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
            <Marker
              lat={this.state.lat}
              lng={this.state.lng}
              draggable
              onClick={this.onClick}
              onMouseEnter={this.onTogglePopover.bind(this, true)}
              onMouseLeave={this.onTogglePopover.bind(this, false)}
            >
              Sample marker
              {this.state.showPopover && <div className="pop-over">This is pop over</div>}
            </Marker>
          )}

          {this.state.showPolygon && (
            <Polygon
              dataPoints={this.state.polygonDataPoints}
              fillColor="rgba(228, 83, 15, 0.3)"
              onClick={this.onPolygonClick}
            />
          )}

          {this.state.showPolyline && <Polyline dataPoints={this.state.polylineDataPoints} />}

          {this.state.showCircle && (
            <Circle
              center={this.state.circleCenter}
              radius={1000}
              fillColor="rgba(25, 25, 25, 0.5)"
              onClick={this.onCircleClicked}
            />
          )}

          {this.state.showRect && <Rectangle bounds={this.state.rectBounds} onClick={this.onRectClick} />}

          <PathFinder waypoints={[{ lat: 52.516, lng: 13.3779 }, { lat: 52.5206, lng: 13.3862 }]} />
          <PathFinder
            waypoints={[{ lat: 52.516, lng: 13.3779 }, { lat: 52.518, lng: 13.4062 }, { lat: 52.519, lng: 13.4162 }]}
            style={{
              lineWidth: 10,
              strokeColor: 'rgba(220, 220, 0, 0.9)',
            }}
          />
        </HereMap>
      </div>
    );
  }
}

export default App;
