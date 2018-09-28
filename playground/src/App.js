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
          <Marker lat={this.state.lat} lng={this.state.lng}>
            Sample marker
          </Marker>
        </HereMap>
      </div>
    );
  }
}

export default App;
