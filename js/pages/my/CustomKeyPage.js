/**
 * Created by ao on 2018/3/20.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../Util/ViewUtils';
import LanguageDao,{FlAG_LANGUAGE} from '../../expand/dao/LanguageDao';

export default class CustomKeyPage extends Component{
    constructor(props) {
        super(props);
        this.languageDao=new LanguageDao(FlAG_LANGUAGE.flag_key);
        this.state={
            dataArray:[]
        }
    };
    componentDidMount(){
        this.loadData();

    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    dataArray:result
                })
            })
            .catch(error=>{
                alert(error)
            })
    }
    onSave(){
        this.props.navigator.pop();
    }
    renderView(){
        if(!this.state.dataArray||this.state.dataArray.length===0) return null;
        let len=this.state.dataArray.length;
        let views=[];
        for(let i=0,l=len-2;i<l;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        <Text>{this.state.dataArray[i].name}</Text>
                        <Text>{this.state.dataArray[i+1].name}</Text>
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
    }

    render(){
        let rightButton=<TouchableOpacity
            onPress={()=>this.onSave()}
        >
            <View style={{margin:10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>
        return <View style={styles.container}>
             <NavigationBar
                title={'自定义标签'}
                leftButton={ViewUtils.getLeftButton(()=>this.onSave())}
                rightButton={rightButton}
             />
            <ScrollView>
                {this.renderView()}

            </ScrollView>
        </View>
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    tips:{
        fontSize:29
    },
    title:{
        fontSize:20,
        color:'white',

    },
    line:{
        height:1,
        backgroundColor:'black'
    },
    item:{
        flexDirection:'row',
        alignItems:'center'
    }
})


