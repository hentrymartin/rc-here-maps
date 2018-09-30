import React, { Component } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { isEmpty } from './../Utils';
import './../HereMaps.scss';

class Marker extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) this.updatePosition();
  }

  componentWillUnmount() {
    const { map } = this.props;
    map.removeObject(this.marker);
  }

  getDomMarkerIcon = html => {
    return new window.H.map.DomIcon(html);
  };

  createMarker = () => {
    if (this.marker) map.removeObject(this.marker);
    const { map, children, lat, lng } = this.props;

    const htmlEl = ReactDOMServer.renderToStaticMarkup(<div className="rc-marker">{children}</div>);
    const icon = this.getDomMarkerIcon(htmlEl);
    const marker = new window.H.map.DomMarker({ lat, lng }, { icon });
    map.addObject(marker);
    this.props.onMarkerCreated(marker);
    this.marker = marker;
  };

  updateMarker = () => {
    const { children } = this.props;
    const htmlEl = ReactDOMServer.renderToStaticMarkup(<div className="rc-marker">{children}</div>);
    const icon = this.getDomMarkerIcon(htmlEl);
    this.marker.setIcon(icon);
  };

  updatePosition = () => {
    this.marker.setPosition({
      lat: this.props.lat,
      lng: this.props.lng,
    });
  };

  render() {
    const { map } = this.props;
    if (!isEmpty(map) && !this.marker) {
      this.createMarker();
    } else if (this.marker) {
      this.updateMarker();
    }
    return null;
  }
}

Marker.defaultProps = {
  lat: 0,
  lng: 0,
  onMarkerCreated: () => {},
};

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  onMarkerCreated: () => {},
};

export default Marker;
