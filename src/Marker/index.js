import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { isEmpty } from './../Utils';
import './../HereMaps.scss';

/**
 * Creates dom marker based on the lat and lng
 */
class Marker extends Component {
  constructor(props) {
    super(props);
    this.marker = null;
  }

  componentDidUpdate(prevProps) {
    // update the lat and lng when it changes
    if (this.props.lat !== prevProps.lat || this.props.lng !== prevProps.lng) this.updatePosition();
  }

  componentWillUnmount() {
    const { map, draggable } = this.props;

    if (isEmpty(map)) return;
    // Remove the events added if draggable
    if (draggable) {
      this.removeEventListeners();
    }
    this.marker.removeEventListener('tap', this.props.onClick);
    map.removeObject(this.marker);
  }

  /**
   * Get the dom marker html icon
   */
  getDomMarkerIcon = html => {
    return new window.H.map.DomIcon(html);
  };

  /**
   * Create marker based on the props from the parent
   */
  createMarker = () => {
    if (this.marker) map.removeObject(this.marker);
    const { map, children, lat, lng, draggable } = this.props;
    const htmlEl = ReactDOMServer.renderToStaticMarkup(
      React.createElement('div', { className: 'rc-marker' }, children),
    );
    const icon = this.getDomMarkerIcon(htmlEl);
    const marker = new window.H.map.DomMarker({ lat, lng }, { icon });
    marker.addEventListener('tap', this.props.onClick);
    marker.addEventListener('pointerenter', this.props.onMouseEnter);
    marker.addEventListener('pointerleave', this.props.onMouseLeave);
    if (draggable) {
      marker.draggable = true;
      this.addEventListeners();
    }
    map.addObject(marker);
    this.props.onMarkerCreated(marker);
    this.marker = marker;
  };

  /**
   * Update the marker when the dom changes in parent
   */
  updateMarker = () => {
    const { children } = this.props;
    const htmlEl = ReactDOMServer.renderToStaticMarkup(<div className="rc-marker">{children}</div>);
    const icon = this.getDomMarkerIcon(htmlEl);
    this.marker.setIcon(icon);
  };

  /**
   * Update the lat and lng on change
   */
  updatePosition = () => {
    this.marker.setPosition({
      lat: this.props.lat,
      lng: this.props.lng,
    });
  };

  /**
   * Adds event listeners to the map object
   */
  addEventListeners = () => {
    const { map } = this.props;

    map.addEventListener('dragstart', this.onDragStart, false);

    // re-enable the default draggability of the underlying map
    // when dragging has completed
    map.addEventListener('dragend', this.onDragEnd, false);

    // Listen to the drag event and move the position of the marker
    // as necessary
    map.addEventListener('drag', this.onDrag, false);
  };

  /**
   * Removes the event listener added to the map object
   */

  removeEventListeners = () => {
    const { map } = this.props;
    map.removeEventListener('dragstart', this.onDragStart, false);
    map.removeEventListener('dragend', this.onDragStart, false);
    map.removeEventListener('drag', this.onDragStart, false);
  };

  /**
   * Trigged on drag start. This disable the normal
   * map UI behavior like dragging, panning etc.,
   */
  onDragStart = e => {
    const { target } = e;
    const { behavior } = this.props;
    if (target instanceof window.H.map.DomMarker) {
      behavior.disable();
    }
  };

  /**
   * Trigged on drag end. This enable the normal
   * map UI behavior like dragging, panning etc.,
   */
  onDragEnd = e => {
    const { target } = e;
    const { behavior } = this.props;
    if (target instanceof window.mapsjs.map.DomMarker) {
      behavior.enable();
    }
  };

  /**
   * Triggered on drag and this sets the position of
   * the marker based on the current pointed position
   */
  onDrag = e => {
    const { target, currentPointer } = e;
    const { map } = this.props;
    if (target instanceof window.mapsjs.map.DomMarker) {
      target.setPosition(map.screenToGeo(currentPointer.viewportX, currentPointer.viewportY));
    }
  };

  render() {
    const { map } = this.props;
    if (!isEmpty(map) && !this.marker) {
      this.createMarker();
    } else if (this.marker) {
      this.updateMarker();
    }
    return null;
  }
}

Marker.defaultProps = {
  lat: 0,
  lng: 0,
  onMarkerCreated: () => {},
  onClick: () => {},
  draggable: false,
  behavior: {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

Marker.propTypes = {
  /**
   * Latitude position of the marker
   */
  lat: PropTypes.number.isRequired,
  /**
   * Longitude position of the marker
   */
  lng: PropTypes.number.isRequired,
  /**
   * Called when the marker is added to the map
   */
  onMarkerCreated: () => {},
  /**
   * If set true, the marker will be draggable. Defaults to false.
   */
  draggable: PropTypes.bool,
  /**
   * Click handler for marker
   */
  onClick: PropTypes.func,
  behavior: PropTypes.object,
  /**
   * This method will be called when mouse enters the marker
   */
  onMouseEnter: PropTypes.func,
  /**
   * This method will be called when mouse leaves the marker
   */
  onMouseLeave: PropTypes.func,
};

export default Marker;
