import optionsProxy from "../utils/optionsProxy.js";

it("Should return the original URL", () => {
  const req = {
    originalUrl: "https://my-website.com/my-page",
  };
  expect(optionsProxy.proxyReqPathResolver(req)).toEqual(req.originalUrl);
});
