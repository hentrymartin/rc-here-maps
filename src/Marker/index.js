import React, { PureComponent } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { isEmpty } from './../Utils';
import './../HereMaps.scss';

class Marker extends PureComponent {
  constructor(props) {
    super(props);
    this.marker = null;
  }

  getDomMarkerIcon = html => {
    return new window.H.map.DomIcon(html);
  };

  createMarker = () => {
    console.log(this.marker, 'createMarker');
    if (this.marker) map.removeObject(this.marker);
    const { map, children, lat, lng } = this.props;

    const htmlEl = ReactDOMServer.renderToStaticMarkup(<div className="rc-marker">{children}</div>);
    const icon = this.getDomMarkerIcon(htmlEl);
    const marker = new window.H.map.DomMarker({ lat, lng }, { icon });
    console.log(marker, 'marker created');
    map.addObject(marker);
    this.marker = marker;
  };

  updateMarker = () => {
    const { children } = this.props;
    const htmlEl = ReactDOMServer.renderToStaticMarkup(<div className="rc-marker">{children}</div>);
    const icon = this.getDomMarkerIcon(htmlEl);
    this.marker.setIcon(icon);
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

export default Marker;
