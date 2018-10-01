import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from './../Utils';

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
    map.removeObject(this.rectangle);
  }

  getGeometry = bounds => {
    return new window.H.geo.Rect(bounds.north, bounds.south, bounds.east, bounds.west);
  };

  /*
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
    this.props.onRectangleDrawn(this.rectangle);
    map.addObject(this.rectangle);
  };

  /*
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
};

Rectangle.propTypes = {
  bounds: PropTypes.object.isRequired,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
  lineWidth: PropTypes.number,
  onRectangleDrawn: PropTypes.func,
};

export default Rectangle;
