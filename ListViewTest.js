/**
 * Created by ao on 2018/3/12.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ListView,
    RefreshControl,
} from 'react-native';
import NavigationBar from "./js/common/NavigationBar";
import Toast,{DURATION} from 'react-native-easy-toast';

var data = {
    "result": [
        {
            "email": "s.herawdwadwda@awdw.net",
            "fullName": "张2"
        }, {
            "email": "s.herawdwadwda@awdw.net",
            "fullName": "张2322222"
        }, {
            "email": "s.herawdwadwda@awdw.net",
            "fullName": "张22322222"
        }, {
            "email": "s.herawdwadwda@awdw.net",
            "fullName": "张2233332222"
        }, {
            "email": "s.herawdwadwda@awdw.net",
            "fullName": "张22244222"
        }, {
            "email": "s.herawdwadwda@awdw.net",
            "fullName": "张225552222"
        }, {
            "email": "s.herawdwadwda@awdw.net",
            "fullName": "张22662222"
        }, {
            "email": "s.herawdwadwda@awdw.net",
            "fullName": "张27722222"
        }, {
            "email": "s.56456456@awdw.net",
            "fullName": "张288822222"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }, {
            "email": "s.5656+65@awdw.net",
            "fullName": "99999"
        }

    ],
    "statusCode":0
};
export default class ListViewTest extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
            isLoading:true,
        };
        this.onLoad();
    }
    renderRow(item){
        return <View style={styles.row}>
            <TouchableOpacity
                onPress={()=>{
                      this.toast.show('你点击了：'+item.fullName,DURATION.LENGTH_LONG)
                }}
            >
                <Text style={styles.tips}>{item.fullName}</Text>
                <Text style={styles.tips}>{item.email}</Text>
            </TouchableOpacity>


        </View>
    }
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={styles.line}>
        </View>
    }
    renderFooter () {
        return <Image source={require('./res/images/16.ffa5badd.jpg')}/>
    //    网络图片
    //     <Image style={{width:400,height:100}} source={{uri:'https://****'}}/>
    }
    onLoad(){
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        },2000)
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'ListViewTest'}
                    statusBar={{
                        backgroundColor: 'red'
                    }}
                />
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(item)=>this.renderRow(item)}
                renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                renderFooter={()=>this.renderFooter()}
                refreshControl={<RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={()=>{this.onLoad()}}
                />}
                />
                <Toast ref={toast=>{this.toast=toast}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 18,

    },
    row:{
        height:50,
    },
    line:{
        height:1,
        backgroundColor:'black',
    }
})
