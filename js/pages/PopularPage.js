/**
 * Created by ao on 2018/3/20.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ListView,
    RefreshControl
} from 'react-native';
// import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ScrollableTabView,{ScrollableTabBar,DefaultTabBar}from 'react-native-scrollable-tab-view';
import {Navigator} from 'react-native-deprecated-custom-components'
import NavigationBar from '../common/NavigationBar';
import RepositoryCell from '../common/RepositoryCell'

import HomePage from './HomePage';
import DataRepository from '../expand/dao/DataRepository'
// https://api.github.com/search/repositories?q=ios&sort=stars
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stats';


export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.DataRepository = new DataRepository();
        this.state = {
            result: '',

        }
    };

    onLoad() {
        let url = this.genUrl(this.text);
        this.DataRepository.fetchNetRepository(url)
            .then(result=> {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error=> {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    genUrl(key) {
        return URL + key + QUERY_STR;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    statusBar={{
                        backgroundColor:'#2196F3'
                    }}
                />
                <ScrollableTabView
                    tabBarBackgroundColor="#2196F3"
                    tabBarActiveTextColor="white"
                    tabBarInactiveTextColor="mintcream"
                    tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                    renderTabBar={() => <ScrollableTabBar/>}
                >
                    <PopularTab tabLabel="Java">java</PopularTab>
                    <PopularTab tabLabel="IOS">IOS</PopularTab>
                    <PopularTab tabLabel="Android">Android</PopularTab>
                    <PopularTab tabLabel="Javascript">js</PopularTab>
                </ScrollableTabView
>
            </View>
        )
    }
}
class PopularTab extends Component{
    constructor(props) {
        super(props);
        this.DataRepository = new DataRepository();
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:false,
        }
    };
    componentDidMount(){
        this.loadData()
    }
    loadData() {
        this.setState({
            isLoading:true
        })
        let url = URL+this.props.tabLabel+QUERY_STR;
        this.DataRepository.fetchNetRepository(url)
            .then(result=> {
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false,
                })
            })
            .catch(error=> {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }
    renderRow(data){
        return <RepositoryCell data={data}/>
    }
    render(){
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>{
                            this.loadData()
                        }}
                        colors={['#2196F3']}
                        tintColor={'#2196F3'}
                        title={'Loading...'}
                        titleColor={'#2196F3'}
                    />}
            />
            {/*<Text style={{height:300,backgroundColor:"red"}}>{this.state.result}</Text>*/}
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1.
    },
    tips: {
        fontSize: 20
    }
})


