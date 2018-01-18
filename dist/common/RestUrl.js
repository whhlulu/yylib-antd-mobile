/**
 * Created by Administrator on 2016/4/25.
 */
const EnvConfig = window.EnvConfig || {}

var URL_HOME = '/' //主页的链接
var ADDR = EnvConfig.ADDR;// 后端服务地址
var MAURL = EnvConfig.MAURL;// MA服务地址
var ROOT_PATH = EnvConfig.ROOT_PATH;// 后端服务项目名
var REF_SERVER_URL = EnvConfig.REF_SERVER_URL;// 参照注册服务地址
// Portal首页地址
var URL_HOME_PORTAL = EnvConfig.URL_HOME_PORTAL;
var URL_WORKBENCH = EnvConfig.URL_WORKBENCH;

var GET_REFINFO_BYCODE = '/icop-support-web/refer/findByCode';

// 单据类型（示例）
var MODULE_URL = {
    SAMPLE: ADDR + ROOT_PATH + '/sample',
    //审批流
    getBpmIds: ADDR + '/icop-bpmcenter-web/bpm/getBpmIds',//bpm 通过业务billid获取流程bpmids
    getBpmId: ADDR + '/icop-bpmcenter-web/bpm/getBpmId',//bpm 通过业务billid获取流程bpmid
    querySingleHistoricProcessInfo: ADDR + '/icop-bpmcenter-web/bpm/querySingleHistoricProcessInfo',//bpm 查询审批历史成功
    beforeReject: ADDR + '/icop-bpmcenter-web/bpm/beforeReject',//bpm 驳回前查询
    doApprove: ADDR + '/icop-bpmcenter-web/bpm/doApprove',//bpm doApprove
    delegateTaskCompletely: ADDR + '/icop-bpmcenter-web/bpm/delegateTaskCompletely',//改派
    disApprove: ADDR + '/icop-bpmcenter-web/bpm/disApprove',//不同意且退回
    diagramUrl: ADDR + '/icop-bpmcenter-web/pages/diagram-viewer/index.html?processInstanceId=',//不同意且退回
    queryAssignUser: ADDR + '/icop-bpmcenter-web/bpm/queryAssignUser',//获取审批指派用户
    queryStartAssignUser: ADDR + '/icop-bpmcenter-web/bpm/queryStartAssignUser',//获取审批指派用户
    unapprove: ADDR + '/icop-bpmcenter-web/bpm/unapprove',//弃审
    doCallBack: ADDR + '/icop-bpmcenter-web/bpm/doCallBack',//收回
}

module.exports = {
    URL_HOME,
    ADDR,
    MAURL,
    ROOT_PATH,
    REF_SERVER_URL,
    URL_HOME_PORTAL,
    URL_WORKBENCH,
    GET_REFINFO_BYCODE,
    MODULE_URL,
}