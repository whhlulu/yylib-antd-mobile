/**
 * 路由配置
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App'; //主应用
import ImagePickerDemo from '../../dist/component/image-picker/demo/ImagePickerDemo';

export default
    <Route path="/" component={App}>
        <IndexRoute key='001' component={ImagePickerDemo}></IndexRoute>
    </Route>