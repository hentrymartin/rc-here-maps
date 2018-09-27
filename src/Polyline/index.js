import PropTypes from 'prop-types';
import { isEmpty } from './../Utils';

export function Polyline(props) {
  let polygon = null;

  const getLineString = () => {
    return new window.H.geo.LineString(props.dataPoints, 'values lat lng alt');
  };

  const createPolyline = () => {
    const lineString = getLineString();
    const { map, fillColor, strokeColor, lineWidth, miterLength, lineDash, lineDashOffset } = props;
    polygon = new window.H.map.Polyline(lineString, {
      style: {
        fillColor,
        strokeColor,
        lineWidth,
        miterLength,
        lineDash,
        lineDashOffset,
      },
    });
    props.onPolylineDrawn(polygon);
    map.addObject(polygon);
  };

  const { map } = props;
  if (!isEmpty(map) && !polygon) createPolyline();

  return null;
}

Polyline.defaultProps = {
  dataPoints: [],
  fillColor: '#FFFFCC',
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
