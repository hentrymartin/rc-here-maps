import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from './../Utils';

/**
 * Creates rectange on the map based on the bounds
 */
class Rectangle extends Component {
  constructor(props) {
    super(props);
    this.rectangle = null;
  }

  componentDidUpdate(prevProps) {
    if (this.rectangle) {
      // update the rectangle if the bounds changes
      if (!isEqual(prevProps.bounds, this.props.bounds)) this.updateRectangle();
    }
  }

  componentWillUnmount() {
    // Remove the rectangle from the map once the component is going
    // to be unmounted
    const { map } = this.props;
    if (isEmpty(map)) return;
    this.rectangle.removeEventListener('tap', this.props.onClick);
    map.removeObject(this.rectangle);
  }

  /**
   *  Get the rect object based on the bounds
   */
  getGeometry = bounds => {
    return new window.H.geo.Rect(bounds.north, bounds.south, bounds.east, bounds.west);
  };

  /**
   * Creates the rectangle for the first time
   */
  createRectangle = () => {
    const { map, fillColor, strokeColor, lineWidth, bounds } = this.props;
    this.rectangle = new window.H.map.Rect(this.getGeometry(bounds), {
      style: {
        fillColor,
        strokeColor,
        lineWidth,
      },
    });
    this.rectangle.addEventListener('tap', this.props.onClick);
    this.props.onRectangleDrawn(this.rectangle);
    map.addObject(this.rectangle);
  };

  /**
   * Update the rectangle if the bounds
   */
  updateRectangle = () => {
    const { bounds } = this.props;
    this.rectangle.setBounds(this.getGeometry(bounds));
  };

  render() {
    const { map } = this.props;
    if (!isEmpty(map) && !this.rectangle) {
      this.createRectangle();
    }

    return null;
  }
}

Rectangle.defaultProps = {
  bounds: {},
  fillColor: '#FFFFCC',
  strokeColor: '#829',
  lineWidth: 1,
  onRectangleDrawn: () => {},
  onClick: () => {},
};

Rectangle.propTypes = {
  /**
   * Bounds represents a rectangular geographic area defined by the geographic
   * coordinates of its top-left and bottom-right corners.
   * {
   *  north: 22,
   *  south: 12,
   *  east: 11,
   *  west: 10,
   * }
   */
  bounds: PropTypes.object.isRequired,
  /**
   *  Fillcolor of the rectangle. It can be an Hex value or RGBA value
   */
  fillColor: PropTypes.string,
  /**
   * Stroke color is the border color of the rectangle
   */
  strokeColor: PropTypes.string,
  /**
   * Linewidth of the rectangle. Defaults to 1.
   */
  lineWidth: PropTypes.number,
  /**
   * Called when the rectange is added to the map
   */
  onRectangleDrawn: PropTypes.func,
  /**
   * Click handler for Reactange
   */
  onClick: PropTypes.func,
};

export default Rectangle;
