import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from '../Utils';
import { addRouteShapeToMap, waypointsToRouteParams } from './routeUtils';

class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.router = null;
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
    const router = platform.getRoutingService();
    this.router = router;
  };

  render() {
    const routeRequestWaypoints = waypointsToRouteParams(this.props.waypoints);
    const routeRequestParams = {
      mode: this.props.mode,
      representation: this.props.representation,
      routeattributes: this.props.routeattributes,
      maneuverattributes: this.props.maneuverattributes,
      avoidLinks: this.props.avoidLinks,
      avoidSeasonalClosures: this.props.avoidSeasonalClosures,
      alternatives: this.props.alternatives,
      ...routeRequestWaypoints,
    };

    if (this.router) {
      this.router.calculateRoute(
        routeRequestParams,
        (result) => {
          if(result.response && result.response.route[0]) {
            addRouteShapeToMap(this.props.map, result.response.route[0], this.props.style);
          }
        },
        (error) => console.error(error.message),
      )
    }

    return null;
  }
}

PathFinder.defaultProps = {
  mode: 'fastest;car',
  representation: 'display',
  routeattributes: 'waypoints,shape',
  maneuverattributes: 'direction',
  waypoints: [],
  avoidLinks: '',
  avoidSeasonalClosures: true,
  alternatives: 1,
  style: {
    lineWidth: 4,
    strokeColor: 'rgba(0, 128, 255, 0.7)'
  }
};

PathFinder.propTypes = {
  mode: PropTypes.string,
  representation: PropTypes.string,
  routerattributes: PropTypes.string,
  maneuverattributes: PropTypes.string,
  waypoints: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })),
  alternatives: PropTypes.number,
  viewBounds: PropTypes.shape({
    north: PropTypes.number,
    south: PropTypes.number,
    east: PropTypes.number,
    west: PropTypes.number,
  }),
  style: PropTypes.object,
};

export default PathFinder;
