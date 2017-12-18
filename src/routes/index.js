/**
 * 路由配置
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App'; //主应用
// import ImagePickerDemo from '../../dist/component/image-picker/demo/ImagePickerDemo';
// import ListDemo from '../../dist/component/list/demo/ListDemo'
// import SS from '../../lib/component/button/demo/YYButtonDemo'
import YYList from '../../lib/component/list/demo/YYListDemo'
// import Refer from '../../lib/component/refer/YYReferlist'
import Referdemo from '../../lib/component/refer/demo/YYreferDemo'
// import Button from '../../dist/component/button/SSButton'
export default
    <Route path="/" component={App}>
        <IndexRoute key='001' component={YYList}></IndexRoute>
        <Route path="listview" component={YYList}/>
        <Route path="referdemo" component={Referdemo}/>
       {/* <IndexRoute key='001' component={ImagePickerDemo}></IndexRoute>
        <Route path="listDemo" component={ListDemo}/>*/}
    </Route>