/**
 * Created by ao on 2018/3/20.
 */

import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    Image,
    Navigator,
    View,
    DeviceEventEmitter,

} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
// import {Navigator} from 'react-native-deprecated-custom-components';
import Toast,{DURATION} from 'react-native-easy-toast';

import AsyncStorageTest from './../../AsyncStorageTest';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import MyPage from './my/MyPage';
import WebViewTest from '../../WebViewTest';
import TrendingTest from '../../TrendingTest';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tp_popular',
        }
    }
    componentDidMount(){
        this.listener=DeviceEventEmitter.addListener('showToast',(text)=>{
            this.toast.show(text,DURATION.LENGTH_LONG);
        })
    }
    componentWillUnmount(){
        this.listener&&this.listener.remove();
    }
    _renderTab(Component,selectTab,title,renderIcon){
        return <TabNavigator.Item
            selected={this.state.selectedTab === selectTab}
            selectedTitleStyle={{color: '#2196F3'}}
            title={title}
            renderIcon={() => <Image style={styles.image}
                                     source={renderIcon}/>}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: "#2196F3"}]}
                                             source={renderIcon}/>}
            onPress={() => this.setState({selectedTab: selectTab})}>
            <Component {...this.props}/>
        </TabNavigator.Item>
    }
    render() {
        // alert(this.props.data)
        return (
            <View style={styles.container}>

                    <TabNavigator>

                        {this._renderTab(PopularPage,'tp_popular',"最热",require('../../res/images/ic_polular.png'))}
                        {this._renderTab(TrendingPage,'tb_trending',"趋势",require('../../res/images/ic_trending.png'))}
                        {this._renderTab(AsyncStorageTest,'tb_favorite',"收藏",require('../../res/images/ic_polular.png'))}
                        {this._renderTab(MyPage,'tb_my',"我的",require('../../res/images/ic_trending.png'))}
                    </TabNavigator>
                <Toast ref={toast=>this.toast=toast}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex: 1,
        // backgroundColor: "red",
    },
    page2: {
        flex: 1,
        backgroundColor: "yellow",
    },
    image: {
        height: 22,
        width: 22,
    },
});
