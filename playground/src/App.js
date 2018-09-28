import React, { Component } from 'react';
import { HereMap, Marker, Polygon, Polyline } from './../node_modules/rc-here-maps';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HereMap appId="XezsJWhF8JfEucf5ImcN" appCode="HLIInfEMidCaPQtBbWyQuQ" useHTTPS={false}>
          <Marker lat={52.51} lng={13.4}>
            Sample marker
          </Marker>
        </HereMap>
      </div>
    );
  }
}

export default App;
