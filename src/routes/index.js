/**
 * 路由配置
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../App'; //主应用
// 按照组件分类进行排序
/*Layout 布局-Start*/
import index from '../../dist/component/test/demoindex'

/*Navigation 导航-Start*/
import YYNavBarDemo from '../../dist/component/navBar/demo/basic';//NavBar
import YYTabsDemo from '../../dist/component/tabs/demo/basic';//Tabs
import YYTabsDemoFixedHeight from '../../dist/component/tabs/demo/fixedHeight';
import YYTabsDemoVertical from '../../dist/component/tabs/demo/vertical';
import YYTabsDemoMutlitabs from '../../dist/component/tabs/demo/mutlitabs';
import YYTabBarDemo from '../../dist/component/tabBar/demo/layOut';//TabBar
import YYTabBarDemoFirst from '../../dist/component/tabBar/demo/first';
import YYTabBarDemoSecond from '../../dist/component/tabBar/demo/second';
import YYTabBarDemoThird from '../../dist/component/tabBar/demo/third';


/*Data Entry 数据录入-Start*/
import Input from '../../dist/component/input/demo/YYInputDemo'
// import Button from '../../dist/component/button/SSButton'
import YYImagePickerDemo from '../../dist/component/imagepicker/demo/YYImagePickerDemo'

import Switch from '../../dist/component/switch/demo/YYSwitchDemo'
import Datepicker from '../../dist/component/date-picker/demo/YYDatePickerDemo'
import DateDemo from '../../dist/component/date-picker/demo/datepicker'
import Pickerdemo from '../../dist/component/picker/demo/pickerdemo'
import YYPicker from '../../dist/component/picker/demo/YYPickerdemo'

/*Data Display 数据展示-Start*/
import YYAccordionDemo from '../../dist/component/accordion/demo/basic'
import YYIconDemo from '../../dist/component/icon/demo/basic'
import Pull from '../../dist/component/listview/Pulltorefresh'
import YYList from '../../dist/component/listview/demo/YYListDemo'


/*Feedback 交互组件-Start*/
import YYToastDemo from '../../dist/component/toast/demo/basic'

/*业务组件*/
import Referdemo from '../../dist/component/refer/demo/YYreferDemo'
import YYApproveHistoryDemo from '../../dist/component/bpm/demo/YYApproveHistoryDemo'
import YYApproveDemo from '../../dist/component/bpm/demo/YYApproveDemo'
import YYApproveActionDemo from '../../dist/component/bpm/demo/YYApproveActionDemo'

//其他以及测试用
import Test from '../../dist/component/test/test'


export default
    <Route path="/" component={App}>
        <IndexRoute key='001' component={index}></IndexRoute>
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
        <Route path="imagePicker" component={YYImagePickerDemo}/>
        <Route path="input" component={Input}/>
        <Route path="switch" component={Switch}/>
        <Route path="datepicker" component={Datepicker}/>
        <Route path="datedemo" component={DateDemo}/>
        <Route path="pickerdemo" component={Pickerdemo}/>
        <Route path="picker" component={YYPicker}/>



        {/*Data Display 数据展示*/}
        <Route path="accordion" component={YYAccordionDemo}/>
        <Route path="icon" component={YYIconDemo}/>
        <Route path="listview" component={YYList}/>
        <Route path="pull" component={Pull}/>

        {/*Feedback 交互组件*/}
        <Route path="toast" component={YYToastDemo}/>

        {/*业务组件*/}
        <Route path="referdemo" component={Referdemo}/>
        <Route path="approveHistory" component={YYApproveHistoryDemo}/>
        <Route path="approve" component={YYApproveDemo}/>
        <Route path="approveAction" component={YYApproveActionDemo}/>

        {/*测试页面*/}
        <Route path="test" component={Test}/>
    </Route>