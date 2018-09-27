import PropTypes from 'prop-types';
import { isEmpty } from './../Utils';

export function Polygon(props) {
  let polygon = null;

  const getLineString = () => {
    return new window.H.geo.LineString(props.dataPoints, 'values lat lng alt');
  };

  const createPolygon = () => {
    const lineString = getLineString();
    const { map, fillColor, strokeColor, lineWidth } = props;
    polygon = new window.H.map.Polygon(lineString, {
      style: {
        fillColor,
        strokeColor,
        lineWidth,
      },
    });
    props.onPolygonDrawn(polygon);
    map.addObject(polygon);
  };

  const { map } = props;
  if (!isEmpty(map) && !polygon) createPolygon();

  return null;
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
