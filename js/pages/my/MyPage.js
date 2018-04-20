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
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
import {FlAG_LANGUAGE} from '../../expand/dao/LanguageDao';
export default class MyPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabShow: false
        }
    };


    render(){
        return <View>
             <NavigationBar
             title={'我的'}
             />
            <Text style={styles.tips}
                onPress={()=>{
                    this.props.navigator.push({
                        component:CustomKeyPage,
                        params:{
                            ...this.props,
                            flag:FlAG_LANGUAGE.flag_key
                        }
                    })
                }}
            >自定义标签 </Text>
            <Text style={styles.tips}
                onPress={()=>{
                    this.props.navigator.push({
                        component:CustomKeyPage,
                        params:{
                            ...this.props,
                            flag:FlAG_LANGUAGE.flag_language
                        }
                    })
                }}
            >自定义语言 </Text>
            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigator.push({
                          component:SortKeyPage,
                          params:{
                              ...this.props,
                              flag:FlAG_LANGUAGE.flag_key
                          }
                      })
                  }}
            >标签排序 </Text>
            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigator.push({
                          component:SortKeyPage,
                          params:{
                              ...this.props,
                              flag:FlAG_LANGUAGE.flag_language
                          }
                      })
                  }}
            >语言排序 </Text>
            <Text style={styles.tips}
                  onPress={()=>{
                      this.props.navigator.push({
                          component:CustomKeyPage,
                          params:{
                              ...this.props,
                              isRemoveKey:true,
                              flag:FlAG_LANGUAGE.flag_key
                          }
                      })
                  }}
            >移除标签 </Text>

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


