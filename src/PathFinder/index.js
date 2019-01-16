import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from '../Utils';
class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.router = null;
    this.path = null;
  }

  componentWillUnmount() {
    const { map } = this.props;
    if (isEmpty(map)) return;
    map.removeObject(this.path);
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

  /**
   * Creates a H.map.Polyline from the shape of the route and adds it to the map.
   * @param {Object} route A route as received from the H.service.RoutingService
   */
  createPath(route) {
    if (this.path) map.removeObject(this.path);

    const { map, style } = this.props;
    const strip = new window.H.geo.Strip();
    const routeShape = route.shape;

    routeShape.forEach(function (point) {
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });

    const path = new window.H.map.Polyline(strip, { style });
  
    map.addObject(path);
    this.props.onPathCreated(path);
    this.route = path;
  }

  /**
   * Turn an array of objects with { lat, lng } into an object with { waypointN }
   * for use in routing params.
   * @param {Object[]} waypoints Array of waypoints ({lat, lng})
   */
  waypointsToRouteParams(waypoints) {
    let params = {};
    waypoints.forEach((wp, index) => {
      const key = `waypoint${index}`;
      params[key] = `${wp.lat},${wp.lng}`;
    });

    return params;
  }

  render() {
    const routeRequestWaypoints = this.waypointsToRouteParams(this.props.waypoints);
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
            this.createPath(result.response.route[0]);
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
  onPathCreated: () => {},
  style: {
    lineWidth: 4,
    strokeColor: 'rgba(0, 128, 255, 0.7)'
  }
};

PathFinder.propTypes = {
  mode: PropTypes.string,
  representation: PropTypes.string,
  routeattributes: PropTypes.string,
  maneuverattributes: PropTypes.string,
  waypoints: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })),
  avoidLinks: PropTypes.string,
  avoidSeasonalClosures: PropTypes.bool,
  alternatives: PropTypes.number,
  onPathCreated: PropTypes.func,
  style: PropTypes.object,
};

export default PathFinder;
