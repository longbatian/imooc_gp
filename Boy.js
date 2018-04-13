/**
 * Created by ao on 2018/3/12.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Girl from "./Girl";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar}from 'react-native-scrollable-tab-view';
import {Navigator} from 'react-native-deprecated-custom-components';
export default class Boy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ""
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <NavigationBar
                    title={'Boy'}
                    statusBar={{
                        backgroundColor: 'red'
                    }}
                />
                <Text style={styles.text}>I am Boy</Text>
                {/*
                <Text style={styles.text} onPress={()=> {
                    this.props.navigator.push({
                        component: Gril,
                        params: {
                            word: '一枝玫瑰',
                            onCallBack: (word)=> {
                                this.setState({
                                    word: word
                                })
                            }
                        }
                    })
                }}>
                    送女孩一直玫瑰
                </Text>
                <Text style={styles.text}>{this.state.word}</Text>
                 */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",

    },
    text: {
        fontSize: 20,

    },
})


