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
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
// import {Navigator} from 'react-native-deprecated-custom-components';
// import Boy from "./Boy";
// import setup from './js/pages/setup';
// import FetchTest from "./FetchTest";
// import ListViewTest from './ListViewTest';
import AsyncStorageTest from './../../AsyncStorageTest';
import PopularPage from './PopularPage'
import MyPage from './my/MyPage';
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tp_popular',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    <TabNavigator>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'tp_popular'}
                            selectedTitleStyle={{color: '#2196F3'}}
                            title="最热"
                            renderIcon={() => <Image style={styles.image}
                                                     source={require('../../res/images/ic_polular.png')}/>}
                            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: "#2196F3"}]}
                                                             source={require('../../res/images/ic_polular.png')}/>}
                            onPress={() => this.setState({selectedTab: 'tp_popular'})}>
                            <PopularPage/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'tb_trending'}
                            selectedTitleStyle={{color: 'yellow'}}
                            title="趋势"
                            renderIcon={() => <Image style={styles.image}
                                                     source={require('../../res/images/ic_trending.png')}/>}
                            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: "yellow"}]}
                                                             source={require('../../res/images/ic_trending.png')}/>}

                            onPress={() => this.setState({selectedTab: 'tb_trending'})}>

                            <AsyncStorageTest/>

                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'tb_favorite'}
                            selectedTitleStyle={{color: 'red'}}
                            title="收藏"
                            renderIcon={() => <Image style={styles.image}
                                                     source={require('../../res/images/ic_polular.png')}/>}
                            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: "red"}]}
                                                             source={require('../../res/images/ic_polular.png')}/>}
                            onPress={() => this.setState({selectedTab: 'tb_favorite'})}>

                            <Text>3</Text>

                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'tb_my'}
                            selectedTitleStyle={{color: 'yellow'}}
                            title="我的"
                            renderIcon={() => <Image style={styles.image}
                                                     source={require('../../res/images/ic_trending.png')}/>}
                            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: "yellow"}]}
                                                             source={require('../../res/images/ic_trending.png')}/>}

                            onPress={() => this.setState({selectedTab: 'tb_my'})}>

                            <MyPage {...this.props}></MyPage>
                        </TabNavigator.Item>
                    </TabNavigator>
                }
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
