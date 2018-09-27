import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import HereMapFactory from './../Factories/HereMapFactory';

class Map extends Component {
  constructor(props) {
    super(props);
    this.factory = HereMapFactory(props.appId, props.appCode, props.useHTTPS);
    this.platform = this.factory.getPlatform();
    this.state = {
      map: null,
    };
  }

  shouldComponentUpdate() {
    console.log(this.state.map, 'should');
    return !!this.state.map;
  }

  componentDidMount() {
    const mapTypes = this.platform.createDefaultLayers();
    const element = ReactDOM.findDOMNode(this);
    const map = this.factory.getHereMap(element, mapTypes.normal.map, {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 },
    });

    this.setMap(map, mapTypes);
  }

  setMap = (map, mapTypes) => {
    this.setState(
      {
        map,
      },
      () => {
        new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
        window.H.ui.UI.createDefault(map, mapTypes);
        console.log(this.state.map, 'map');
        this.props.onMapLoaded(map);
      },
    );
  };

  render() {
    return <div className="here-map-container" />;
  }
}

Map.defaultProps = {
  onMapLoaded: () => {},
  appId: '',
  appCode: '',
  useHTTPS: false,
};

Map.propTypes = {
  onMapLoaded: PropTypes.func,
  appId: PropTypes.string,
  appCode: PropTypes.string,
  useHTTPS: PropTypes.bool,
};

export default Map;
