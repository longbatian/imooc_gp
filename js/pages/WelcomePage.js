/**
 * Created by ao on 2018/3/20.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';

export default class WelcomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabShow: false
        }
    };
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigator.resetTo({
                component:HomePage
            })
        },600);
        // setTimeout(() => {
        //     this.setState({
        //         tabShow: true
        //     });
        // }, 0)
    }
    render(){
        return <View>
             <NavigationBar
             title={'欢迎'}
             />
        </View>
    }
}


