import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from '../Utils';

class PathFinder extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { factory } = nextProps;
    // Once factory is available then create platform and create router
    if (!isEqual(factory, this.props.factory)) {
      this.createRouter(factory);
    }
  }

  createRouter = factory => {
    const platform = factory.getPlatform();
    console.log(platform, 'platform');
  };

  render() {
    return null;
  }
}

PathFinder.defaultProps = {
  mode: ['car'],
  representation: ['display'],
  routerattributes: ['waypoints'],
  maneuverattributes: ['direction'],
  waypoints: [],
  avoidLinks: '',
  avoidSeasonalClosures: true,
  departure: null,
  arrival: null,
  alternatives: 1,
};

PathFinder.propTypes = {
  mode: PropTypes.PropTypes.arrayOf(PropTypes.oneOf(['faster', 'car'])),
  representation: PropTypes.arrayOf(PropTypes.oneOf(['display'])),
  routerattributes: PropTypes.arrayOf(PropTypes.oneOf(['waypoints', 'summary', 'shape', 'legs'])),
  maneuverattributes: PropTypes.arrayOf(PropTypes.oneOf(['direction', 'action'])),
  waypoints: PropTypes.array,
  departure: PropTypes.instanceOf(Date),
  arrival: PropTypes.instanceOf(Date),
  alternatives: PropTypes.number,
  viewBounds: PropTypes.shape({
    north: PropTypes.number,
    south: PropTypes.number,
    east: PropTypes.number,
    west: PropTypes.number,
  }),
};

export default PathFinder;
