const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/server1/**", {
      target: "http://47.94.223.5:8005",
      changeOrigin: true,
      pathRewrite: {
        "^/server1": "http://47.94.223.5:8005" //路径重写
      }
    })
  );
  app.use(
    proxy("/server2/**", {
      // target: "http://118.25.155.176",
      target: "https://company.cnshanzhi.com",
      changeOrigin: true,
      pathRewrite: {
        "^/server2": "https://company.cnshanzhi.com" //路径重写
      }
    })
  );
};
