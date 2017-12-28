/**
 * 路由配置
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App'; //主应用
// import ImagePickerDemo from '../../dist/component/image-picker/demo/ImagePickerDemo';
// import ListDemo from '../../dist/component/list/demo/ListDemo'
// import SS from '../../lib/component/button/demo/YYButtonDemo'
import index from '../../dist/component/list/demo/demoindex'
import YYList from '../../dist/component/list/demo/YYListDemo'
// import Refer from '../../lib/component/refer/YYReferlist'
import Referdemo from '../../dist/component/refer/demo/YYreferDemo'
import Imagepicker from '../../dist/component/imagepicker/demo/YYImagePickerDemo'
import Pull from '../../dist/component/list/Pulltorefresh'
import Input from '../../dist/component/input/demo/YYInputDemo'
// import Button from '../../dist/component/button/SSButton'
export default
    <Route path="/" component={App}>
        <IndexRoute key='001' component={index}></IndexRoute>
        <Route path="listview" component={YYList}/>
        <Route path="referdemo" component={Referdemo}/>
        <Route path="imagepicker" component={Imagepicker}/>
        <Route path="pull" component={Pull}/>
        <Route path="input" component={Input}/>
       {/* <IndexRoute key='001' component={ImagePickerDemo}></IndexRoute>
        <Route path="listDemo" component={ListDemo}/>*/}
    </Route>