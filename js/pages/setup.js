/**
 * Created by ao on 2018/3/20.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
// import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import WelcomePage from './WelcomePage';

import HomePage from './HomePage';
function setup() {
//    进行一些初始化的配置
    class Root extends Component{
        renderScene(route,navigator){
            let Component =route.component;
            return <Component {...route.params}
                              navigator={navigator}/>
        }
        render(){
            return <Navigator
                initialRoute={{component:WelcomePage}}
                renderScene={(route,navigator)=>this.renderScene(route,navigator)}
            />
        }
    }
    return <Root/>
}
// const setup = StackNavigator({
//     Home: { screen: WelcomePage },
//     Page: { screen: HomePage },
// });
module.exports=setup;