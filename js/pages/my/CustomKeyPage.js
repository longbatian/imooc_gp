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
import NavigationBar from '../../common/NavigationBar';

export default class CustomKeyPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabShow: false
        }
    };


    render(){
        return <View>
             <NavigationBar
                title={'自定义标签'}
                leftButton={}
             />
            <Text style={styles.tips}>自定义标签</Text>
        </View>
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    tips:{
        fontSize:29
    }
})


