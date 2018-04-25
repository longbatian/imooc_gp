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
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
// import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar}from 'react-native-scrollable-tab-view';
import {Navigator} from 'react-native-deprecated-custom-components';
import NavigationBar from '../common/NavigationBar';
import RepositoryCell from '../common/RepositoryCell'
import RepositoryDetail from './RepositoryDetail';
import ProjectModel from '../model/ProjectModel';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository';
import LanguageDao, {FlAG_LANGUAGE} from '../expand/dao/LanguageDao';
import FavoriteDao from '../expand/dao/FavoriteDao';
import Utils from '../Util/Utils';

// https://api.github.com/search/repositories?q=ios&sort=stars
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stats';
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FlAG_LANGUAGE.flag_key);
        this.dataRepository = new DataRepository();
        this.state = {
            languages: []

        }
    };

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result=> {
                this.setState({
                    languages: result
                })
            })
            .catch(error=> {
                alert(error)
            })
    }

    onLoad() {
        let url = this.genUrl(this.text);
        this.dataRepository.fetchNetRepository(url)
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
        // alert(this.props.data)
        let content = this.state.languages.length > 0 ? <ScrollableTabView
            tabBarBackgroundColor="#2196F3"
            tabBarActiveTextColor="white"
            tabBarInactiveTextColor="mintcream"
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            renderTabBar={() => <ScrollableTabBar/>}
        >
            {this.state.languages.map((result, i, arr)=> {
                let lan = arr[i];
                return lan.checked ? <PopularTab key={i} tabLabel={lan.name} {...this.props}/> : null;
            })}
        </ScrollableTabView> : null;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
                    statusBar={{
                        backgroundColor: '#2196F3'
                    }}
                />
                {content}
            </View>
        )
    }
}
class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2}),
            isLoading: false,
            favoriteKeys: []
        }
    };

    componentDidMount() {
        this.loadData()
    }

    /*
     *更新Project Item Favorite收藏的状态
     * */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)));
        }
        this.updateState({
            isLoading: false,
            dataSource: this.getDataSource(projectModels),
        })
    }

    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys()
            .then((keys)=> {
                if (keys) {
                    this.updateState({favoriteKeys: keys});
                }
                this.flushFavoriteState();
            })
            .catch((error)=> {
                this.flushFavoriteState();
                console.log(error);
            });
    }

    updateState(dic) {
        if (!this)return;
        this.setState(dic);
    }

    loadData() {
        this.setState({
            isLoading: true
        })
        // let url = URL+this.props.tabLabel+QUERY_STR;
        let url = this.genFetchUrl(this.props.tabLabel);
        this.dataRepository
            .fetchRepository(url)
            .then(result=> {
                this.items = result && result.items ? result.items : result ? result : [];
                this.getFavoriteKeys();
                if (!this.items&&result && result.update_date && !this.dataRepository.checkData(result.update_date)) {
                    DeviceEventEmitter.emit('showToast', '数据过时');
                    return this.dataRepository.fetchNetRepository(url)
                } else {
                    DeviceEventEmitter.emit('showToast', '显示缓存数据');
                }
            })
            .then(items=> {
                if (!items || items.length === 0)return;
                this.items = items;
                this.getFavoriteKeys();
                // DeviceEventEmitter.emit('showToast', '显示网络数据');
            })
            .catch(error=> {
                alert(error);
                this.updateState({
                    isLoading: false
                })
            })
    }

    onSelect(projectModel) {
        // alert(item.html_url)
        this.props.navigator.push({
            title:projectModel.item.full_name,
            component: RepositoryDetail,
            params: {
                projectModel: projectModel,
                parentComponent:this,
                flag:FLAG_STORAGE.flag_popular,
                ...this.props
            }

        })
    }

    /**
     *favoriteIcon的单击回调函数
     *  item
     *  isFavorite
     */
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
        } else {
            favoriteDao.removeFavoriteItem(item.id.toString())
        }
    };

    renderRow(projectModel) {
        return <RepositoryCell
            onSelect={()=>this.onSelect(projectModel)}
            key={projectModel.item.id}
            projectModel={projectModel}
            onFavorite={(item, isFavorite)=> {
                this.onFavorite(item, isFavorite)
            }}
        />
    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }


    render() {
        // alert(this.props.data)
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=> {
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


