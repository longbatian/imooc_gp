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
    Image,
    Alert,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import NavigationBar from '../../common/NavigationBar';
import Checkbox from 'react-native-check-box'
import ViewUtils from '../../Util/ViewUtils';
import LanguageDao, {FlAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../Util/ArrayUtils'

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);

        this.changeValues=[];
        this.isRemoveKey=this.props.isRemoveKey?true:false;
        this.state = {
            dataArray: []
        }
    };

    componentDidMount() {
        this.languageDao=new LanguageDao(this.props.flag);
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result=> {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error=> {
                alert(error)
            })
    }

    onSave() {
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return;
        }
        if(this.isRemoveKey){
            for(let i=0,l=this.changeValues.length;i<l;i++){
                ArrayUtils.remove(this.state.dataArray,this.changeValues[i])
            }
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckbox(this.state.dataArray[i])}
                        {this.renderCheckbox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}>
                        <Text>1</Text>
                    </View>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckbox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckbox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}>
                    <Text>2</Text>
                </View>
            </View>
        )
        return views;

    }
    onClick(data){
        if(!this.isRemoveKey)data.checked=!data.checked;
        ArrayUtils.updateArray(this.changeValues,data);
    }
    renderCheckbox(data) {
        let leftText = data.name;
        let isChecked = this.isRemoveKey ? false : data.checked;
        return (
            <Checkbox
                style={{flex:1,padding:10}}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                isChecked={isChecked}
                checkedImage={<Image style={{tintColor:'#6495ED'}}
                    source={require('./img/ic_check_box.png')}
                />}
                unCheckedImage={<Image style={{tintColor:'#6495ED'}}
                    source={require('./img/ic_check_box_outline_blank.png')}
                />}
            />
        )
    }
    onBack(){
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [

                {text: '不保存', onPress: () => {
                    this.props.navigator.pop()
                }, style: 'cancel'},
                {text: '保存', onPress: () => {this.onSave()}},
            ],
            { cancelable: false }
        )
    }
    render() {
        let title=this.isRemoveKey?'标签移除':'自定义标签';
        let rightButtonTitle=this.isRemoveKey?'移除':'保存';
        title=this.props.flag===FlAG_LANGUAGE.flag_language?'自定义语言':title;
        return <View style={styles.container}>
            <NavigationBar
                title={title}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                rightButton={ViewUtils.getRightButton(rightButtonTitle,()=>this.onSave())}
            />
            <ScrollView>
                {this.renderView()}
            </ScrollView>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 29
    },
    title: {
        fontSize: 20,
        color: 'white',

    },
    line: {
        height: 0.8,
        backgroundColor: 'darkgray'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})


