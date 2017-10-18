/**
 * Created by liulei on 2017/8/24.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {ListView, RefreshControl, Toast, ActivityIndicator} from 'antd-mobile/lib/index';
import classNames from 'classnames';
import '../../../css/SSList.css'
import _ from 'lodash'
import PropTypes from 'prop-types';
import {LoadMore} from 'react-weui'

import ajax from '../../utils/ajax'
let index = 1;
let page;
let pageIndex = 0;
var defaultParams = {};
defaultParams.pageNumber = 0;
defaultParams.pageSize = 10;
class SSList extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => true,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            refreshing: false,
            height: document.documentElement.clientHeight,
            loading: false,
            finish: false,
            data: [],
            scrollTimer: null,
            items:this.props.children

        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params !== this.props.params || nextProps.url !== this.props.url) {
            this.setState({
                refreshing: true,
                finish:false,
                loading:false
            })
        }
    }

    componentWillMount() {
        page = this
    }

    componentDidMount() {
        this.manuallyRefresh = true;
        setTimeout(() => this.setState({refreshing: true}), 10);

        // Set the appropriate height

        setTimeout(() => this.setState({
            height: this.state.height - ReactDOM.findDOMNode(this.refs.lv).offsetTop,
        }), 0);


        // handle https://github.com/ant-design/ant-design-mobile/issues/1588
        this.refs.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
            this.tsPageY = e.touches[0].pageY;
        });
        this.refs.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
            this.tmPageY = e.touches[0].pageY;
            if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
                this.domScroller.options.preventDefaultOnTouchMove = false;
            } else {
                this.domScroller.options.preventDefaultOnTouchMove = undefined;
            }
        });

        /* params.billType = "TADRM";
         params.entityName = "com.yyjz.icop.technology.drawing.entity.TADrawingDistrEntity";*/
        //this.initData(url, params);
        let newParams = Object.assign({}, defaultParams, this.props.params);
        this.initData(this.props.url, newParams);

    }

    componentWillUnmount() {
        this.refs.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
        this.refs.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
    }

    finishRequest = (backData) => {
        if (page.props.initData) page.props.initData(backData);
        setTimeout(() => {
            page.setState({
                dataSource: page.state.dataSource.cloneWithRows([page.props.children]),
                backData: backData,
                refreshing: false,
                finish: false
                /*  isLoading: true,*/
            });
            index = 1
        }, 10);
    };
    noData=()=>{
        Toast.fail('暂无数据！', 1);
        page.finishRequest([])

    };
    initData = (url, params) => {
        ajax.postJSON(url, params, function (result) {
            if (result&&result.code === 'success') {
                page.setState({
                    data: result.data.content,
                    count: result.data.count,
                })
                page.finishRequest(result.data.content)

            } else if (result&&result.success) {
                if (result.backData) {
                    let content=result.backData.content;
                    if (_.isArray(content)&&content.length>0) {
                        page.setState({
                            data: content,
                            count: result.backData.totalElements,
                        });
                        page.finishRequest(content)
                        /*  if(page.props.initData)page.props.initData(result.backData.content);
                         setTimeout(() => {
                         page.setState({
                         dataSource: page.state.dataSource.cloneWithRows([page.props.children]),
                         backData:result.backData.content,
                         refreshing: false,
                         finish:false
                         /!*  isLoading: true,*!/
                         });
                         index=1
                         }, 10);*/
                    } else {
                        page.noData()
                    }
                } else {
                    page.noData()
                }
            } else {

                Toast.fail(result.backMsg, 1);
                page.setState({
                    refreshing: false
                });
            }
        }, function (err) {
            Toast.fail("服务器通讯异常!", 1);
            page.setState({
                refreshing: false,
            });
        })
    };

    getListData = (referUrl, pageNumber) => {
        let newParams = Object.assign({}, defaultParams, this.props.params);
        newParams.pageNumber = pageNumber;
        page.setState({
            banLoad: true,
        });
        ajax.postJSON(referUrl, newParams, function (result) {
            page.setState({
                banLoad: false,
            });
            if (result&&result.code === 'success') {
                page.setState({
                    data: page.state.data.concat(result.data.content),

                })
                if (page.props.onLoadMore) page.props.onLoadMore(page.state.data)
            } else if (result&&result.success) {
                if (result.backData) {
                    page.setState({
                        data: page.state.data.concat(result.backData.content),
                        dataSource: page.state.dataSource.cloneWithRows([page.props.children])


                    });

                    if (page.props.onLoadMore) page.props.onLoadMore(page.state.data)
                }

            } else {
                Toast.fail(result.backMsg, 3);
            }
        }, function (err) {
            page.setState({
                banLoad: false,
            });
            Toast.fail("服务器通讯异常!", 3);
        })
    }

    finish = () => {
        this.setState({
            finish: true,
            loading:false
        });
    }
    resolveLoading = () => {
        this.setState({
            finish: false
        });
    };
    onLoadMore = (resolve, finish) => {
        if (this.state.data.length === this.state.count) {
            finish()
        } else {
            this.getListData(this.props.url, index);
            resolve();
            index++;

        }
    };


    onScroll = (e) => {
        let clientHeight = this.state.height;
        let contentHeight = e.scroller.__contentHeight;
        //let scrollY=e.scroller.__enableScrollY;
        this.st = e.scroller.getValues().top;
        this.domScroller = e;
        if (this.state.banLoad || this.state.finish || this.st <= 0 || contentHeight < clientHeight) return;
        let scrollPercent = Math.floor(((this.st + clientHeight) / contentHeight) * 100);
        if (scrollPercent >= this.props.triggerPercent) {
            this.setState({
                loading: true
            });
            this.onLoadMore(this.resolveLoading, this.finish);

        }


    };

    onRefresh = () => {
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
            let newParams = Object.assign({}, defaultParams, this.props.params);
            this.initData(this.props.url, newParams);
        } else {
            this.manuallyRefresh = false;
        }

    };
    /*  onEndReached = (event) => {
     let clientHeight=this.state.height;

     //let contentHeight=e.scroller.__contentHeight;
     //let scrollY=e.scroller.__enableScrollY;


     // clearTimeout(this.state.scrollTimer);
     /!*this.setState({ scrollTimer: setTimeout( ()=>{
     if (this.props.onScrollEnd) this.props.onScrollEnd();
     }, 150) });*!/
     if (this.state.loading || this.state.finish||this.st<=0) return;
     let scrollPercent = Math.floor(((this.st + clientHeight) /this.contentHeight) * 100);
     if(scrollPercent >= this.props.triggerPercent){
     this.setState({
     loading: true
     });
     this.onLoadMore(this.resolveLoading, this.finish);

     }

     };
     */

    render() {
        let {children, renderHeader, multiLine, loaderLoadingIcon, loaderDefaultIcon} = this.props;
        /*let {loading, refreshText} = this.state;*/
        let {refreshing,finish,loading}=this.state;
        const cls = classNames({
            'my-list': true,
            'list-special': multiLine ? true : false,

        });

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}
                >
                    {!refreshing?children:[]}
                </div>
            );
        };

        return (
            <ListView
                className={cls}
                ref="lv"
                dataSource={this.state.dataSource}
                renderRow={row}
                initialListSize={5}
                pageSize={5}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                renderFooter={() => (
                    <div style={{padding: 5, textAlign: 'center'}}>
                        { refreshing?'':finish ? loaderDefaultIcon :loading ? loaderLoadingIcon : false }
                    </div>)}
                style={{
                    height: this.state.height,
                    margin: '0',
                    background: '#f8f8f8'
                }}
                scrollerOptions={{scrollbars: true}}
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
                onScroll={this.onScroll}
                /*  onEndReached={this.onEndReached}*/


            />



        );
    }
}
SSList.propTypes = {
    params: PropTypes.object,
    url: PropTypes.string,
    initData:PropTypes.func.isRequired,
    onLoadMore:PropTypes.func


};

SSList.defaultProps = {
    loaderLoadingIcon: <LoadMore loading> 加载中... </LoadMore>,
    loaderDefaultIcon: <LoadMore showLine> 无更多数据 </LoadMore>,
    triggerPercent: 100,
    url: '',
    params: {},


};

/*SSList.propTypes = {

 };*/

export default SSList;