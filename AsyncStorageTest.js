/**
 * Created by ao on 2018/3/12.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput,
} from 'react-native';
import Girl from "./Girl";
import NavigationBar from "./js/common/NavigationBar";
export default class AsyncStorageTest extends Component {
    constructor(props) {
        super(props);

    }
    onSave(){

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
                <TextInput style={{borderWidth:1,height:40}}/>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}
                          onPress={()=>this.onSave()}
                    >保存</Text>
                    <Text style={styles.text}
                          onPress={()=>this.onRemove()}
                    >移除</Text>
                    <Text style={styles.text}
                          onPress={()=>this.onFetch()}
                    >取出</Text>
                </View>


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


