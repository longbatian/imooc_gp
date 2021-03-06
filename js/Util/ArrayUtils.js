/**
 * Created by ao on 2018/4/8.
 */
import React, {Component} from 'react';
import {
    View,
} from 'react-native';
export default class ArrayUtils{
    /*
    *更新数组，若item已存在则从数组中将他移除，否则添加进数组
    *
    * */
    static updateArray(array,item){
        for(var i=0,len=array.length;i<len;i++){
            var temp=array[i];
            if(temp===item){
                 array.splice(i,1);
                return;
            }
        }
        array.push(item)
    }
    /*
    *克隆一个数组
    *
    *
    * */
    static clone(from){
        if(!from) return[];
        let newArray=[];
        for(let i=0,len=from.length;i<len;i++){
            newArray[i]=from[i];
        }
        return newArray;
    }
    /*
    *判断2个数组的元素是否一一对应
    *@returns {boolean} true 数组长度相等且元素对应相等
    * */
    static isEqual(arr1,arr2){
        if(!arr1&&arr2) return false;
        if(arr1.length!==arr2.length) return false;
        for(let i=0,l=arr2.length;i<l;i++){
            if(arr1[i]!==arr2[i]) return false;
        }
        return true;
    }
    /*
    *remove,将数组中指定元素移除
    * */
    static remove(arr,item){
        if(!arr)return;
        for(let i=0,l=arr.length;i<l;i++){
            if(item===arr[i])arr.splice(i,1);
        }
    }
}


