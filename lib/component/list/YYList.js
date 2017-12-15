// import './listview.less'
import React from 'react';
import {Link} from 'react-router'
import {List, Badge, ListView, PullToRefresh} from 'antd-mobile/lib/index';
const Item = List.Item;
const Brief = Item.Brief;


function MyBody(props){
    return(
        <div className="am-list-body my-body">
            {props.children}
        </div>
    )
}

export default class YYListview extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            refreshing:false,
            initdata:'',            //第一次传的列表参数
            footer:'',               //页脚是否显示加载完成
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        // simulate initial Ajax
        setTimeout(() => {
            let data = this.props.init;  //获取列表初始值
            if(this.props.isreached){
                this.setState({
                    footer:'加载完成',
                })
            } else {
                this.setState({
                    footer:'',
                })
            }
            this.setState({
                initdata:data,
                dataSource: this.state.dataSource.cloneWithRows(data),
                isLoading: false,
            });
        }, 0);
    }
    /*componentWillReceiveProps(nextProps){
        setTimeout(() => {
            console.log('组件will')
            let data = nextProps.init;  //获取列表初始值
            this.setState({
                initdata:data,
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.state.initdata),
                isLoading: false,
            });
        }, 0);
    }*/
    /* componentDidUpdate(){
             console.log('组件DidUpdate')
             let data = this.props.init;  //获取列表初始值
             this.setState({
                 initdata:data,
             })
             this.setState({
                 dataSource: this.state.dataSource.cloneWithRows(data),
                 isLoading: false,
             });

     }*/

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }
    onRefresh = () => {
        this.setState({refreshing:true,isLoading:true});
        setTimeout(()=>{
            this.rData = this.props.init;
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(this.rData),
                refreshing:false,
                isLoading:false,
            });
            console.log('----> refresh')
        },600)
}

    onEndReached = (event) => {

        let _self = this;
        if(!_self.props.isreached){
            return false;
        }
        this.props.reached(function(){
            // load new data
            // hasMore: from backend data, indicates whether it is the last page, here is false
            if (_self.state.isLoading && !_self.state.hasMore) {
                return;
            }
            console.log('reach end', event);
            _self.setState({ isLoading: true });
            setTimeout(() => {
                _self.rData = [..._self.state.initdata,..._self.props.row];
                console.log('rData render already');
                _self.setState({
                    dataSource: _self.state.dataSource.cloneWithRows(_self.rData),
                    isLoading: false,
                });
            }, 1000);

        });

    }

    render() {
        let{refreshing} = this.state;
        let{children,onEndReachedhold,height}=this.props;
        const head = (url,name,index)=>{if(url==''||url==undefined){
            //颜色处理headColor+求余数
            let headColor = 'headColor'+(index%4);
            //名字最后一位
            let nameLast = name.substr(name.length-1,1);
            return <div className={"headLast" + " " + 'headColor0'}><span style={{color:'white'}}>{nameLast}</span></div>;
        }else{
            return url;
        }}

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? '正在加载...' : this.state.footer}
                </div>)}
                renderRow={children}
                className="am-list"
                pageSize={5}
                renderBodyComponent={()=> <MyBody/>}
                style={{height:height,overflow:'auto'}}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={400}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={onEndReachedhold}
            />
        );
    }
}
YYListview.defaultProps={
    onEndReachedhold:600,
    height:'600px'
}