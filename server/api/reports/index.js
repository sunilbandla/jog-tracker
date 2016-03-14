'use strict';
import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./reports.controller');

var router = express.Router();

// ?from&to
router.get('/', auth.isAuthenticated(), controller.index);

module.exports = router;
