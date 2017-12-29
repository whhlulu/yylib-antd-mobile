/**
 * 路由配置
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../App'; //主应用
// 按照组件分类进行排序
// import ImagePickerDemo from '../../dist/component/image-picker/demo/ImagePickerDemo';
// import ListDemo from '../../dist/component/list/demo/ListDemo'
// import SS from '../../lib/component/button/demo/YYButtonDemo'
import index from '../../dist/component/list/demo/demoindex'
import YYList from '../../dist/component/list/demo/YYListDemo'
// import Refer from '../../lib/component/refer/YYReferlist'
import Referdemo from '../../dist/component/refer/demo/YYreferDemo'
import Imagepicker from '../../dist/component/imagepicker/demo/YYImagePickerDemo'
import Pull from '../../dist/component/list/Pulltorefresh'
// import Button from '../../dist/component/button/SSButton'

/*Layout 布局-Start*/
/*Layout 布局-End*/

/*Navigation 导航-Start*/
import YYNavBarDemo from '../../dist/component/NavBar/demo/basic';//NavBar
import YYTabsDemo from '../../dist/component/Tabs/demo/basic';//Tabs
import YYTabsDemoFixedHeight from '../../dist/component/Tabs/demo/fixedHeight';
import YYTabsDemoVertical from '../../dist/component/Tabs/demo/vertical';
import YYTabsDemoMutlitabs from '../../dist/component/Tabs/demo/mutlitabs';
import YYTabBarDemo from '../../dist/component/TabBar/demo/layOut';//TabBar
import YYTabBarDemoFirst from '../../dist/component/TabBar/demo/first';
import YYTabBarDemoSecond from '../../dist/component/TabBar/demo/second';
import YYTabBarDemoThird from '../../dist/component/TabBar/demo/third';
/*Navigation 导航-End*/

/*Data Entry 数据录入-Start*/
/*Data Entry 数据录入-End*/

/*Data Display 数据展示-Start*/
import YYAccordionDemo from '../../dist/component/Accordion/demo/basic'
import YYIconDemo from '../../dist/component/Icon/demo/basic'
/*Data Display 数据展示-End*/

/*Feedback 交互组件-Start*/
import YYToastDemo from '../../dist/component/Toast/demo/basic'
/*Feedback 交互组件-End*/

//其他以及测试用


export default
    <Route path="/" component={App}>
        <IndexRoute key='001' component={index}></IndexRoute>
        <Route path="listview" component={YYList}/>
        <Route path="referdemo" component={Referdemo}/>
        <Route path="imagepicker" component={Imagepicker}/>
        <Route path="pull" component={Pull}/>
       {/* <IndexRoute key='001' component={ImagePickerDemo}></IndexRoute>
        <Route path="listDemo" component={ListDemo}/>*/}

        {/*Layout 布局*/}

        {/*Navigation 导航*/}
        <Route path="navBar" component={YYNavBarDemo}/>
        <Route path="tabs">
            <IndexRoute component={YYTabsDemo}/>
            <Route path="fixedHeight" component={YYTabsDemoFixedHeight}/>
            <Route path="vertical" component={YYTabsDemoVertical}/>
            <Route path="mutlitabs" component={YYTabsDemoMutlitabs}/>
        </Route>
        <Route path="tabBar" component={YYTabBarDemo}>
            <IndexRoute component={YYTabBarDemoFirst}/>
            <Route path="second" component={YYTabBarDemoSecond}/>
            <Route path="third" component={YYTabBarDemoThird}/>
        </Route>

        {/*Data Entry 数据录入*/}

        {/*Data Display 数据展示*/}
        <Route path="accordion" component={YYAccordionDemo}/>
        <Route path="icon" component={YYIconDemo}/>

        {/*Feedback 交互组件*/}
        <Route path="toast" component={YYToastDemo}/>
    </Route>