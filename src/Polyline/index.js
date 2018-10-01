import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from './../Utils';

class Polyline extends Component {
  constructor(props) {
    super(props);
    this.polyline = null;
  }

  componentDidUpdate(prevProps) {
    if (this.polyline) {
      // update the polyline if the data points differ
      if (!isEqual(prevProps.dataPoints, this.props.dataPoints)) this.updatePolyline();
    }
  }

  componentWillUnmount() {
    // Remove the polyline from the map once the component is going
    // to be unmounted
    const { map } = this.props;
    if (isEmpty(map)) return;
    map.removeObject(this.polyline);
  }

  /*
  * Update the geometry if its changed
  */
  updatePolyline = () => {
    const { dataPoints } = this.props;

    const geometry = this.getGeometry(dataPoints);
    this.polyline.setGeometry(geometry);
  };

  /*
  * Get the linestring geometry
  */
  getGeometry = () => {
    return new window.H.geo.LineString(this.props.dataPoints, 'lat lng alt');
  };

  /*
  * Create the polyline on the map for the first time
  */
  createPolyline = () => {
    const geometry = this.getGeometry();
    const { map, fillColor, strokeColor, lineWidth, miterLength, lineDash, lineDashOffset } = this.props;
    this.polyline = new window.H.map.Polyline(geometry, {
      style: {
        strokeColor,
        lineWidth,
        miterLength,
        lineDash,
        lineDashOffset,
      },
    });
    this.props.onPolylineDrawn(this.polyline);
    map.addObject(this.polyline);
  };

  render() {
    const { map } = this.props;
    if (!isEmpty(map) && !this.polyline) this.createPolyline();
    return null;
  }
}

Polyline.defaultProps = {
  dataPoints: [],
  strokeColor: '#829',
  lineWidth: 2,
  miterLength: 10,
  lineDash: [],
  lineDashOffset: 0,
  onPolylineDrawn: () => {},
};

Polyline.propTypes = {
  dataPoints: PropTypes.array,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
  lineWidth: PropTypes.number,
  onPolylineDrawn: PropTypes.func,
};

export default Polyline;
