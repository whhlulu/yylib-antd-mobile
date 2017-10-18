import React, {Component} from 'react';
import $ from 'jquery'
import SSButton from "../button/SSButton";
import {WhiteSpace,Toast} from 'antd-mobile/lib/index';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ajax from '../../utils/ajax'
import BaseHost from '../../utils/BaseHost'
//上传url
var uploadUrl = '/icop-file/file/muploadx';
var ADDR = BaseHost.ADDR
/*
 * 签名板：
* 说明：当浏览态时，需要传disabled和imgUrl
*
*
*
* */
export default class SSignature extends Component {
    state = {
        imgs: '',
        lineColor: '#000',
        lineWidth: 2,
        height: 280,
        autoFit: false,
        display:'inline'
    };

    componentWillMount() {
        //绘制的过程中平滑过渡
        window.requestAnimFrame = (function (callback) {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimaitonFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();


    }

    componentDidMount() {
        if (this.props.disabled)return
        this.signature()
    }

    _renderCanvas = () => {
        if (this.drawing) {
            this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
            this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
            this.ctx.stroke();
            this.lastPos = this.currentPos;
        }
    };
    _resetCanvas = () => {
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = this.state.lineColor;
        this.ctx.lineWidth = this.state.lineWidth;

    };
    _resizeCanvas = () => {
        var width = this.$element.outerWidth();
        this.$canvas.attr('width', width);
        this.$canvas.css('width', width + 'px');
    };
    signature = () => {
        this.$element = $('.signature');
        this.canvas = false;
        this.$canvas = false;
        this.ctx = false;
        this.drawing = false;
        this.currentPos = {
            x: 0,
            y: 0
        };
        this.lastPos = this.currentPos;
        // Determine plugin settings
        /*  this._data = this.$element.data();
         this.settings = $.extend({}, defaults, options, this._data);*/
        // Initialize the plugin
        this.init();
    };
    init = () => {
        // Set up the canvas
        let width = $('.signature').width();
        this.clear=true;
        this.$canvas = $(this.refs.sign);
        this.$canvas.attr({
            width: width,
            height: this.state.height
        });
        this.$canvas.css({
            boxSizing: 'border-box',
            height: this.state.height + 'px',
            position:'relative',
            zIndex:100
        });
        // Fit canvas to width of parent
        if (this.state.autoFit === true) {
            this._resizeCanvas();
            // TO-DO - allow for dynamic canvas resizing
            // (need to save canvas state before changing width to avoid getting cleared)
            // var timeout = false;
            // $(window).on('resize', $.proxy(function(e) {
            //   clearTimeout(timeout);
            //   timeout = setTimeout($.proxy(this._resizeCanvas, this), 250);
            // }, this));
        }
        this.canvas = this.$canvas[0];
        this._resetCanvas();
        // Set up mouse events
        /*   this.$canvas.on('mousedown touchstart', $.proxy(function(e) {
         this.drawing = true;
         this.lastPos = this.currentPos = this._getPosition(e);
         }, this));*/
        this.$canvas.on('mousedown touchstart', (e) => {
            /*//为了清空开始时的提示文字
            if(this.clear){
                this.clearCanvas();
                this.clear=false;
            }*/
            this.setState({
                display:'none'
            })
            this.drawing = true;
            this.lastPos = this.currentPos = this._getPosition(e);
        })
        /*   this.$canvas.on('mousemove touchmove', $.proxy(function(e) {
         this.currentPos = this._getPosition(e);
         }, this));*/
        this.$canvas.on('mousemove touchmove', (e) => {
            this.currentPos = this._getPosition(e);
            this.signed=true
        });

        this.$canvas.on('mouseup touchend', (e) => {
            this.drawing = false;

            /*var changedEvent = $.Event('jq.signature.changed');
             this.$element.trigger(changedEvent);*/
        });
        $(document).on('touchstart touchmove touchend', (e) => {

            if (e.target === this.canvas) {
                e.preventDefault();
            }
        });

  /*      this.hintText()*/

        // Start drawing
        var that = this;
        (function drawLoop() {
            window.requestAnimFrame(drawLoop);
            that._renderCanvas();
        })();
    };
    /*hintText = () => {
        let ctx = this.canvas.getContext("2d");
        ctx.font="15px Arial";
        ctx.fillText("请在这里签字...", 20, 25, 320);

    };*/

    _getPosition = (event) => {
        var xPos, yPos, rect;
        rect = this.canvas.getBoundingClientRect();
        event = event.originalEvent;
        // Touch event
        if (event.type.indexOf('touch') !== -1) { // event.constructor === TouchEvent
            xPos = event.touches[0].clientX - rect.left;
            yPos = event.touches[0].clientY - rect.top;
        }
        else {
            xPos = event.clientX - rect.left;
            yPos = event.clientY - rect.top;
        }
        return {
            x: xPos,
            y: yPos
        };
    };
    clearCanvas = () => {
        this.canvas.width = this.canvas.width;
        this._resetCanvas();
        this.signed=false;
        this.setState({
            display:'inline'
        })
    };
    getDataURL = () => {
        return this.canvas.toDataURL();
    };
    upLodeFile=(params)=>{
        let that=this;
        ajax.postJSON(ADDR + uploadUrl, params, function (data) {
            if (data.success) {
                var backData = data.backData;
                Toast.success(data.backMsg ? data.backMsg : '保存成功!', 1)

            } else {
                Toast.fail(data.backMsg ? data.backMsg : '保存失败!', 1)
            }
            if (_.isFunction(that.props.saveData)) that.props.saveData(data);
        })
    }

    saveData = () => {
       /* UploadFileUtils.zipImg(this.getDataURL(), {}, (dataUrl) => {
            if(!this.signed){
                Toast.fail('您还没有签字!',1);
                return;
            }

            if (_.isFunction(this.props.saveData)) this.props.saveData(dataUrl)
        })*/
        if(!this.signed){
            Toast.fail('您还没有签字!',1);
            return;
        }
       let params=this.props.source;
       console.log(params,'source')
       let content=this.getDataURL().replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');

        params.files=[
           {
               fileName:`${params.sourceType}.jpg`,
               fileContent:content
           }
       ]
        this.upLodeFile(params)

    };

    render() {
        let {disabled, imgUrl} = this.props;
        let {display}=this.state;
        let spanStyle={
            display:display,
            position:'absolute',
            left:'0.6rem',
            top:'0.9rem'
        };
        return (
            disabled ? (<div><WhiteSpace size="xl" style={{backgroundColor: '#EFEFF4'}}/><img style={{width: '100vw',backgroundColor:'#fff'}} src={imgUrl} alt=""/></div>) :
                (<div>
                    <div className="signature" style={{backgroundColor: '#fff',position:'relative'}}>
                        <WhiteSpace style={{backgroundColor: '#EFEFF4',height:'0.6rem'}}/>
                        <span style={spanStyle}>请在这里签字...</span>
                        <canvas ref="sign"></canvas>
                        <WhiteSpace size="xl" style={{backgroundColor: '#EFEFF4'}}/>
                    </div>
                    <SSButton
                        type='left-right'
                        lText='清除'
                        lClick={this.clearCanvas}
                        rClick={this.saveData}
                    />
                </div>)
        );
    }
}


SSignature.propTypes = {
    saveData: PropTypes.func,
    imgUrl: PropTypes.string,//当为浏览态时需要传


};

SSignature.defaultProps = {
    imgUrl: ''
};
