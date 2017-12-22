'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,

        sendAction: function sendAction() {
            dispatch(ReduxUtils.createAction.apply(this, arguments));
        }
    };
}
var ReduxUtils = {
    ACTION_KEY: "__REDUX_SEND_ACTION_DATA__",
    UNKNOW_ACTION_KEY: "__REDUX_SEND_ACTION_UNKNOW__",
    connectAction: function connectAction(reactClass, mapStateToProps, mapDispatchToProps) {
        return (0, _reactRedux.connect)(mapStateToProps, function (dispatch) {
            var _props = _mapDispatchToProps(dispatch);
            if (_lodash2.default.isFunction(mapDispatchToProps)) {
                _props = _lodash2.default.assign(_props, mapDispatchToProps(dispatch));
            }
            return _props;
        })(reactClass);
    },
    createAction: function createAction(key) {
        var actionKey = arguments[0];
        if (!actionKey) {
            console.error('调用sendAction方法，需要将动作指令名称{string}作为第一个参数值');
            return { "type": ReduxUtils.UNKNOW_ACTION_KEY };
        }

        var actionArgs = [];
        for (var i = 1; i < arguments.length; i++) {
            actionArgs.push(arguments[i]);
        }

        var newAction = {};
        newAction.type = ReduxUtils.ACTION_KEY;
        newAction.actionKey = actionKey;
        newAction.actionArgs = actionArgs;
        return newAction;
    },
    listenActions: function listen(actions) {
        return function () {
            var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var action = arguments.length <= 1 || arguments[1] === undefined ? { type: null, actionKey: null, actionArgs: [] } : arguments[1];

            if (action.type === ReduxUtils.ACTION_KEY) {
                var actionFunc = actions[action.actionKey];
                if (_lodash2.default.isFunction(actionFunc)) {
                    var callArgs = [state].concat(action.actionArgs);

                    var newState = actionFunc.apply(this, callArgs);

                    return newState === undefined ? state : newState;
                } else {
                    return state;
                }
            } else {
                return state;
            }
        };
    }
};

exports.default = ReduxUtils;