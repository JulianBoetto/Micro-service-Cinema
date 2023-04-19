export default {
    proxyReqPathResolver: (req) => {
      return req.originalUrl;
    },
  };