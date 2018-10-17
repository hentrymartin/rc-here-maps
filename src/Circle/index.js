import { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from './../Utils';

class Circle extends Component {
  constructor(props) {
    super(props);
    this.circle = null;
  }

  componentDidUpdate(prevProps) {
    if (this.circle) {
      // update the circle if the center and radius changes
      if (!isEqual(prevProps.center, this.props.center) || prevProps.radius !== this.props.radius) this.updateCircle();
    }
  }

  componentWillUnmount() {
    // Remove the circle from the map once the component is going
    // to be unmounted
    const { map } = this.props;
    if (isEmpty(map)) return;
    this.circle.removeEventListener('tap', this.props.onClick);
    map.removeObject(this.circle);
  }

  /*
  * Creates the circle for the first time
  */
  createCircle = () => {
    const { map, fillColor, strokeColor, lineWidth, center, radius } = this.props;
    this.circle = new window.H.map.Circle(center, radius, {
      style: {
        fillColor,
        strokeColor,
        lineWidth,
      },
    });
    this.circle.addEventListener('tap', this.props.onClick);
    this.props.onCircleDrawn(this.circle);
    map.addObject(this.circle);
  };

  /*
  * Update the circle if the center and radius changes
  */
  updateCircle = () => {
    const { center, radius } = this.props;
    this.circle.setCenter(center);
    this.circle.setRadius(radius);
  };

  render() {
    const { map } = this.props;
    if (!isEmpty(map) && !this.circle) {
      this.createCircle();
    }

    return null;
  }
}

Circle.defaultProps = {
  center: {},
  radius: 10,
  fillColor: '#FFFFCC',
  strokeColor: '#829',
  lineWidth: 2,
  onCircleDrawn: () => {},
  onClick: () => {},
};

Circle.propTypes = {
  /**
   * Center of the circle
   */
  center: PropTypes.object.isRequired,
  /**
   * Radius of the circle
   */
  radius: PropTypes.number,
  /**
   * Fill color of the circle
   */
  fillColor: PropTypes.string,
  /**
   * Border color or stroke color of the circle
   */
  strokeColor: PropTypes.string,
  /**
   * line width of the circle
   */
  lineWidth: PropTypes.number,
  /**
   * Callback called after circle is drawn
   */
  onCircleDrawn: PropTypes.func,
  /**
   * Click handler for Reactange
   */
  onClick: PropTypes.func,
};

export default Circle;
