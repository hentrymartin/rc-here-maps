export default (appId, appCode, useHTTPS = true) => {
  return {
    appId,
    appCode,
    useHTTPS,
    getPlatform: () => {
      return new window.H.service.Platform({
        app_id: appId,
        app_code: appCode,
        useHTTPS: useHTTPS,
      });
    },
    getHereMap: (container, mapType, options) => {
      return new window.H.Map(container, mapType, options);
    },
  };
};
