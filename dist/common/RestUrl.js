/**
 * Created by Administrator on 2016/4/25.
 */

const EnvConfig = window.EnvConfig || {}

var URL_HOME = '/' //主页的链接
//*********本地开发环境************
// 后端服务地址
// var ADDR = "http://60.205.12.0:81";
var ADDR = EnvConfig.ADDR;
// 后端服务项目名
var ROOT_PATH = EnvConfig.ROOT_PATH;
var WWK_PATH = EnvConfig.WWK_PATH;
// 参照注册服务地址
var REF_SERVER_URL = EnvConfig.REF_SERVER_URL;
// Portal首页地址
var URL_HOME_PORTAL = EnvConfig.URL_HOME_PORTAL;
var URL_WORKBENCH = EnvConfig.URL_WORKBENCH;
var GET_REFINFO_BYCODE = '/icop-support-web/refer/findByCode';

// 单据类型（示例）
var MODULE_URL = {
    SAMPLE: ADDR + ROOT_PATH + '/sample',

    getBpmIds: ADDR + '/icop-bpmcenter-web/bpm/getBpmIds',//bpm 通过业务billid获取流程bpmids
    getBpmId: ADDR + '/icop-bpmcenter-web/bpm/getBpmId',//bpm 通过业务billid获取流程bpmid
    querySingleHistoricProcessInfo: ADDR + '/icop-bpmcenter-web/bpm/querySingleHistoricProcessInfo',//bpm 查询审批历史成功
    beforeReject: ADDR + '/icop-bpmcenter-web/bpm/beforeReject',//bpm 驳回前查询

}

module.exports = {
  URL_HOME,
  URL_HOME_PORTAL,
  REF_SERVER_URL,
  MODULE_URL,
  ADDR,
  URL_WORKBENCH,
  ROOT_PATH,
  WWK_PATH,
  GET_REFINFO_BYCODE
}