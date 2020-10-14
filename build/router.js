"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _HealthcheckController = _interopRequireDefault(require("./controllers/HealthcheckController"));

var _Register = _interopRequireDefault(require("./controllers/Register"));

var _Workload = _interopRequireDefault(require("./controllers/Workload"));

var _UpdateRecord = _interopRequireDefault(require("./controllers/UpdateRecord"));

var _WorkloadDummy = _interopRequireDefault(require("./controllers/WorkloadDummy"));

// import Workload from './controllers/Workload';
var router = _express["default"].Router();

router.use('/', _HealthcheckController["default"], _WorkloadDummy["default"]); // router.use('/', Register);
// router.use('/', UpdateRecord);

router.get('/reports/workload', _Workload["default"]); // router.use('/', Register);

var _default = router;
exports["default"] = _default;