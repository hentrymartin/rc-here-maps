import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import './../HereMaps.scss';

class HereMaps extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      behavior: {},
    };
  }

  onMapLoaded = (map, behavior) => {
    this.setState({
      map,
      behavior,
    });

    this.props.onMapLoaded(map);
  };

  render() {
    const { map, behavior } = this.state;
    const { children } = this.props;
    return (
      <div className="here-map-container">
        <Map {...this.props} onMapLoaded={this.onMapLoaded} />
        {React.Children.map(children, child => {
          if (!child) return null;
          return React.cloneElement(child, { map, behavior });
        })}
      </div>
    );
  }
}

HereMaps.defaultProps = {
  appId: '',
  appCode: '',
  useHTTPS: true,
  onMapLoaded: () => {},
};

HereMaps.propTypes = {
  appId: PropTypes.string,
  appCode: PropTypes.string,
  useHTTPS: PropTypes.bool,
  onMapLoaded: PropTypes.func,
};

export default HereMaps;
