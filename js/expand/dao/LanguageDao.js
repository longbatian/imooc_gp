/**
 * Created by ao on 2018/3/23.
 */
import React, {Component} from 'react';
import {
    AsyncStorage,
} from 'react-native';
import keys from '../../../res/data/keys.json';

export var FlAG_LANGUAGE={flag_language:'flag_language_language',flag_key:'flag_language_key'};

export default class LanguageDao{
    constructor(flag){
        this.flag=flag;
    }
    fetch(){
        return new Promise((resolve,reject)=>{

            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }else{
                    if (!result){
                        var data=this.flag===FlAG_LANGUAGE.flag_key?keys:null;
                        this.save(data);
                        resolve(data);
                    }else{
                        try{
                            resolve(JSON.parse(result));
                        }catch(e){
                            reject(e)
                        }
                    }
                }
            })
        })
    }
    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{

        })
    }
}
