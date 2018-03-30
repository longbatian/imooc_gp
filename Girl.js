/**
 * Created by ao on 2018/3/12.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
export default class Girl extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    renderButton(image){
        return  <TouchableOpacity
            onPress={()=>{
                this.props.navigator.pop();
            }
            }
        >
            <Image style={{width:22,height:22}}
                   source={image}>
            </Image>
        </TouchableOpacity>
    }
    render(){

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Girl'}
                    style={{
                        backgroundColor:'#ee6363'
                    }}
                    leftButton={
                        this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))

                    }
                    rightButton={
                        <TouchableOpacity>
                            <Image style={{width:22,height:22}} source={require('./res/images/ic_star.png')}>

                            </Image>
                        </TouchableOpacity>
                    }
                />
                <Text style={styles.tips}>I am Girl</Text>
                <Text style={styles.tips} >我收到了男孩送的:{this.props.what}</Text>
                <Text style={style.tips} onPress={()=>{
                    this.props.onCallback('巧克力');
                    this.props.navugator.pop();
                }}>
                    回赠，男孩巧克力
                </Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,

    },
    tips:{
        fontSize:18,

    }
})
