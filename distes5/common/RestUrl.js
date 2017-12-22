'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var EnvConfig = window.EnvConfig || {};

var URL_HOME = '/';
var ADDR = EnvConfig.ADDR;

var ROOT_PATH = EnvConfig.ROOT_PATH;
var WWK_PATH = EnvConfig.WWK_PATH;

var REF_SERVER_URL = EnvConfig.REF_SERVER_URL;

var URL_HOME_PORTAL = EnvConfig.URL_HOME_PORTAL;
var URL_WORKBENCH = EnvConfig.URL_WORKBENCH;
var GET_REFINFO_BYCODE = '/icop-support-web/refer/findByCode';

var MODULE_URL = {
  SAMPLE: ADDR + ROOT_PATH + '/sample'
};

exports.default = {
  URL_HOME: URL_HOME,
  URL_HOME_PORTAL: URL_HOME_PORTAL,
  REF_SERVER_URL: REF_SERVER_URL,
  MODULE_URL: MODULE_URL,
  ADDR: ADDR,
  URL_WORKBENCH: URL_WORKBENCH,
  ROOT_PATH: ROOT_PATH,
  WWK_PATH: WWK_PATH,
  GET_REFINFO_BYCODE: GET_REFINFO_BYCODE
};