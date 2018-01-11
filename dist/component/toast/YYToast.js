/**
 * Created By whh 2017/12/28
 * */
import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import '../../../css/YYToast.css';
import PropTypes from 'prop-types';
import _ from 'lodash';

const YYToast = {
    success:function (content, duration = 3, onClose, mask = true) {
        Toast.success(content, duration, onClose, mask)
    },
    fail:function (content, duration = 3, onClose, mask = true) {
        Toast.fail(content, duration, onClose, mask)
    },
    info:function (content, duration = 3, onClose, mask = true) {
        Toast.info(content, duration, onClose, mask)
    },
    loading:function (content, duration = 3, onClose, mask = true) {
        Toast.loading(content, duration, onClose, mask)
    },
    offline:function (content, duration = 3, onClose, mask = true) {
        Toast.offline(content, duration, onClose, mask)
    },
    hide:function () {
        Toast.hide()
    },
}

export default YYToast;
