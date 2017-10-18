import React, {Component} from 'react';
import PropTypes from 'prop-types';
/*import {List} from 'antd-mobile';*/
import classNames from 'classnames';
import SSIcon from '../icon/SSIcon';
/*const Item = List.Item;
const Brief = Item.Brief;*/
class SSListBrief extends Component {

    renderThumbIcon() {
        const {icon} = this.props;
        let fontSize=icon=='icon-weizhi'?'0.44rem':'0.5rem';
        if(icon=='icon-shuji'){
            fontSize='0.34rem'
        }
        let iconStyle={
            verticalAlign:'middle',
            width:fontSize,
            height:fontSize

        };
        return icon?(
           <SSIcon icon={icon} size="md" style={iconStyle}/>
        ):null;

    };
    renderExtraThumbIcon() {
        const {extraIcon} = this.props;
        let fontSize=extraIcon=='icon-weizhi'?'0.44rem':'0.5rem';
        if(extraIcon=='icon-shuji'){
            fontSize='0.34rem'
        }
        let iconStyle={
            verticalAlign:'middle',
            width:fontSize,
            height:fontSize

        };
        return extraIcon?(
            <SSIcon icon={extraIcon} size="md" style={iconStyle}/>
        ):null;

    }


    renderExtra() {
            const {extra,extraThumb,briefStyle,type} = this.props;
            const cls=classNames({
                    'brief-myExtra':true,
                    'extra-italic':type=='6'||type=='7'?true:false
            });
            let items=null;
            if(extra&&(type=='6'||type=='7')){
                let reg=/[0-9]*$/;
                let num=extra.match(reg)[0];
                let text=extra.replace(reg,'');
                items=<em>{text}<i className="italic-text">{num}</i></em>

            }else {
                items=<i style={{verticalAlign:'middle',fontStyle:'normal'}}>{extra}</i>
            }
            /*  <span style={briefStyle} className={cls}>{this.renderExtraThumbIcon()}{items}</span>*/
            return extra?(
                <span  className={cls}>{this.renderExtraThumbIcon()}{items}</span>

            ):null;

    }
   renderDesc(){
       const {descColor,desc} = this.props;
       let style={
           color:descColor||'#999'
       };
       return desc?(
           <span style={style}>{desc}</span>

       ):null;
   }
    render() {
        let {text, thumb, extra,extraThumb,desc,descStyle,briefStyle}=this.props;


       /* let styleZ = {
            color: textColor,
            background: textBackground,
            fontSize: fontSize,
            position:desc||extra?'absolute':'',
            padding:padding,
            width:'100%',
            marginTop:`${marginTop}rem`

        };*/
        const cls = classNames({
            'am-list-brief':true,
            'listBrief':true,
            'brief-location':desc||extra?true:false

        });
       /* const decCls=classNames({
            'listBrief-desc':desc?true:false
        });*/

        return (
            <div className={cls} style={briefStyle} >
                {this.renderThumbIcon()}
                <span style={{verticalAlign: 'middle'}}>{text}</span>
                {this.renderExtra()}
                {/*<div className={decCls}>
                    {this.renderDesc()}
                </div>*/}
            </div>

        );
    }
}


export default SSListBrief;