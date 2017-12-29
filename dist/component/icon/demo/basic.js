/**
 * Created by whh on 2017/12/26.
 */
import React, {Component} from 'react';
import { Grid,Icon,WingBlank,WhiteSpace } from 'antd-mobile';
import YYIcon from '../YYIcon'

class YYIconDemo extends Component {

    render() {
        const list = [
            'check-circle', 'check', 'check-circle-o',
            'cross-circle', 'cross', 'cross-circle-o',
            'up', 'down', 'left',
            'right', 'ellipsis',
            'loading',
        ];
        const listData = list.map(item => ({
            icon: (<Icon type={item} />),
            text: item,
        }));
        //icon获取方案
        /*var list = document.getElementsByClassName('fontclass');
         var listClazz = []
         for(var i=0;i<list.length;i++){
         var item = list[i].innerHTML.substr(6);
         listClazz.push(item)
         }
         console.log(listClazz)*/
        const listSvg = ["wage", "phone", "chart", "exchange-rate", "warning", "tips", "helping", "waiting", "camera", "address", "setting", "more-o", "edit", "delete", "share-o", "map-o", "add", "scan", "qr-code", "call-o", "wage-o", "tag-o", "tag", "users-o", "upload", "message", "user-o", "message-fill", "chat", "org", "asterisk", "check-square", "apps", "screen", "users", "user", "pic", "warn", "check-square-o", "question", "attachment"];
        const listSvgData = listSvg.map(item => ({
            icon: (<YYIcon type={item}/>),
            text: item,
        }));
        const size = ['xxs', 'xs', 'sm', 'md', 'lg'];
        const data = size.map(item => ({
            icon: (<YYIcon type="asterisk" color="red" size={item}/>),
            text: item,
        }));
        return (
            <div>
                <WingBlank><h3>基本 {'<Icon type="search" />'}</h3></WingBlank>
                <Grid data={listData} columnNum={4} hasLine={false} activeStyle={false} />
                <WhiteSpace size="lg"/>
                <WingBlank><h3>大小 {'<YYIcon type="asterisk" size="lg"/>'}</h3></WingBlank>
                <Grid data={data} columnNum={5} hasLine={false} activeStyle={false} />
                <WhiteSpace size="lg"/>
                <WingBlank><h3>用友建筑图标 {'<YYIcon type=“phone”/>'}</h3></WingBlank>
                <Grid data={listSvgData} columnNum={4} hasLine={false} activeStyle={false} />

            </div>
        );
    }
}

export default YYIconDemo