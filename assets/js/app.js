'use strict';

var app = angular.module("ISPCU", ['ngSailsBind', "xeditable"]);

// Declare app level module which depends on filters, and services
angular.module('ISPCU', [
  'ngRoute',
    'ISPCU.controllers'
]);
