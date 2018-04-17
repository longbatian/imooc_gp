/**
 * Created by ao on 2018/3/23.
 */
import React, {Component} from 'react';
import {
    AsyncStorage,
} from 'react-native';
import keys from '../../../res/data/keys.json';
import langsData from '../../../res/data/langs.json';
//language_dao_key
export var FlAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'};

export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }

    fetch() {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(this.flag, (error, result)=> {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    var data = this.flag === FlAG_LANGUAGE.flag_language ? langsData : keys;
                    // var data = this.flag === FlAG_LANGUAGE.flag_language ? keys : langsData;
                    // alert(this.flag)
                    this.save(data);
                    resolve(data);
                } else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e)
                    }
                }

            })
        })
    }

    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data), (error)=> {

        })
    }
}
