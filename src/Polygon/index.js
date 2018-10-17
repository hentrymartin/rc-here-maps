import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from './../Utils';

/**
 * Creates polygon based on the datapoints(which are lat, lng and alt)
 */
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
    this.polygon.removeEventListener('tap', this.props.onClick);
    map.removeObject(this.polygon);
  }

  /**
   * Get the polygon geometry
   */
  getGeometry = dataPoints => {
    return new window.H.geo.Polygon(new window.H.geo.LineString(dataPoints, 'lat lng alt'));
  };

  /**
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
    this.polygon.addEventListener('tap', this.props.onClick);
    this.props.onPolygonDrawn(this.polygon);
    map.addObject(this.polygon);
  };

  /**
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
  lineWidth: 1,
  onPolygonDrawn: () => {},
  onClick: () => {},
};

Polygon.propTypes = {
  /**
   *  An array of data which will have lat, lng and alt
   *  for eg: [12, 13, 100, 22, 13, 100]
   *  12 is latitude, 13 is longitude and 100 is latitude.
   */
  dataPoints: PropTypes.array,
  /**
   * The filling color in CSS syntax, the default is #FFFFCC. It can be hex or rgba value.
   */
  fillColor: PropTypes.string,
  /**
   * The color of the stroke in CSS syntax, the default is #829.
   */
  strokeColor: PropTypes.string,
  /**
   * width of the line in pixels. Defaults to 1.
   */
  lineWidth: PropTypes.number,
  /**
   * Called when the polygon is added to the map
   */
  onPolygonDrawn: PropTypes.func,
  /**
   * Click handler for Polygon
   */
  onClick: PropTypes.func,
};

export default Polygon;
