/**
 * Created by ao on 2018/3/23.
 */
import {
    AsyncStorage,
} from 'react-native';

export default class DataRepository{
    fetchRepository(url){
        return new Promise((resolve,reject)=>{
        //    获取本地的数据
            this.fetchLocalRepository(url)
                .then(result=>{
                    if(!result){
                        resolve(result);
                    }else {
                        this.fetchNetRepository(url)
                            .then(result=>{
                                resolve(result)
                            })
                            .catch(e=>{
                                resolve(e);
                            })
                    }
                })
                .catch(e=>{
                    this.fetchNetRepository(url)
                        .then(result=>{
                            resolve(result)
                        })
                        .catch(e=>{
                            resolve(e);
                        })
                })
        })
    }
    /*
    * 获取本地数据
    *
    * */
    fetchLocalRepository(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                    try{
                        resolve(JSON.parse(result))
                    }catch(e){
                        reject(e)
                    }
                }else {
                    reject(error)
                }
            })
        })
    }
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    if(!result){
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result.item);
                    this.saveRepository(url,result.items)
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }
    saveRepository(url,items,callBack){
        if(!url||!items) return;
        //时间戳
        let wrapData={items:items,update_date:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
    }
    /*
     *判断数据是否过时
     * @param longTime 数据的时间戳
     * @returns {boolean}
     * */
    checkData(longTime){
        let cDate=new Date();
        let tDate=new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth()!==tDate.getMonth())return false;
        if(cDate.getDate()!==tDate.getDate())return false;
        if(cDate.getHours()-tDate.getHours()>4)return false;
        return true;
    }

}