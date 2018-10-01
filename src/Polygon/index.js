import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from './../Utils';

class Polygon extends Component {
  constructor(props) {
    super(props);
    this.polygon = null;
  }

  componentDidUpdate(prevProps) {
    if (this.polygon) {
      // update the polygon if the data points differ
      if (!isEqual(prevProps.dataPoints, this.props.dataPoints)) this.updatePolygon();
    }
  }

  componentWillUnmount() {
    // Remove the polygon from the map once the component is going
    // to be unmounted
    const { map } = this.props;
    if (isEmpty(map)) return;
    map.removeObject(this.polygon);
  }

  /*
  * Get the polygon geometry
  */
  getGeometry = dataPoints => {
    return new window.H.geo.Polygon(new window.H.geo.LineString(dataPoints, 'lat lng alt'));
  };

  /*
  * Creates the polygon for the first time
  */
  createPolygon = () => {
    const { map, fillColor, strokeColor, lineWidth, dataPoints } = this.props;
    const geometry = this.getGeometry(dataPoints);
    this.polygon = new window.H.map.Polygon(geometry, {
      style: {
        fillColor,
        strokeColor,
        lineWidth,
      },
    });
    this.props.onPolygonDrawn(this.polygon);
    map.addObject(this.polygon);
  };

  /*
  * Update the polygon if the geometry changes
  */
  updatePolygon = () => {
    const { dataPoints } = this.props;

    const geometry = this.getGeometry(dataPoints);
    this.polygon.setGeometry(geometry);
  };

  render() {
    const { map } = this.props;
    if (!isEmpty(map) && !this.polygon) {
      this.createPolygon();
    }

    return null;
  }
}

Polygon.defaultProps = {
  dataPoints: [],
  fillColor: '#FFFFCC',
  strokeColor: '#829',
  lineWidth: 2,
  onPolygonDrawn: () => {},
};

Polygon.propTypes = {
  dataPoints: PropTypes.array,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
  lineWidth: PropTypes.number,
  onPolygonDrawn: PropTypes.func,
};

export default Polygon;
