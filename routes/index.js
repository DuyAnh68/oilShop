const express = require("express");
const productRoute = require("./product.route");

const router = express.Router();

const defaultRoutes = [{ path: "/products", route: productRoute }];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
