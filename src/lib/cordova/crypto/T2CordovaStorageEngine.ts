import {Storage as StorageInterface,OnComplete} from 'redux-persist';
//storage interface https://github.com/rt2zz/redux-persist/blob/44fc2bb8d87866459e8d4c36f6edaea59949c8dc/type-definitions/index.d.ts
import {CryptoPromiseInterface} from './interface';

interface ConfigInterface {
  storage: StorageInterface;
  crypto: CryptoPromiseInterface;
  plainFields: string[];
  encryptFields: string[];
  lockableFields: string[];
}

export default class T2CordovaStorageEngine implements StorageInterface {
  public isReady: boolean = false;
  private storage: StorageInterface;
  private crypto: CryptoPromiseInterface;
  private plainFields: string[] = [];
  private encryptFields: string[] = [];
  private lockableFields: string[] = [];
  private activeFields: string[] = [];
  private locked: boolean = true;
  private key: string = '';


  constructor(config: ConfigInterface){
    this.storage = config.storage;
    this.crypto = config.crypto;
    this.plainFields = config.plainFields;
    this.lockableFields = config.lockableFields;
    this.encryptFields = config.encryptFields;
    this.activeFields = this.plainFields.concat(this.lockableFields,this.encryptFields);
    let overlap = this.plainFields.filter((n) => {
        return this.encryptFields.indexOf(n) !== -1;
    });

    if(overlap.length > 0){
      throw 'cannot have a field that is both plain and enscrypted';
    }

    let extraFields = this.lockableFields.filter((lockField) => {
        return this.encryptFields.indexOf(lockField) === -1 && this.plainFields.indexOf(lockField) === -1;
    });

    if(extraFields.length > 0){
      throw 'unregistered fields ' + extraFields.join(', ');
    }
  }

  setItem = (key:string, value: any, onComplete?: OnComplete<any>):Promise<any> => {
    return new Promise<any>((resolve,reject) => {
         if(this.allowIncomming(key)){
           return this._setItem(key,value).then((result) => {
                                               resolve(result);
                                               onComplete(null);
                                           }).catch((e) => {
                                               reject(e);
                                               onComplete(e);
                                           });
         }
    });
  }

  private _setItem = (key:string, value: any) => {
       if(this.shouldEncrypt(key)){
         return this.crypto
                           .encryptRaw({KEY_PIN: key, KEY_INPUT: value})
                           .then((encryptedData)=>{
                             return this.storage.setItem(key,encryptedData);
                           });
       } else {
         return this.storage.setItem(key,value);
       }
  }




  getItem  = <Result>(key:string, onComplete?: OnComplete<Result>) => {

    return new Promise((resolve,reject) => {
        if(this.allowOutgoing(key)){
          this._getItem<Result>(key)
                    .then((data:Result) => {
                        resolve(data);
                        onComplete && onComplete(null,data);
                    })
                    .catch((e) => {
                         reject(e);
                         onComplete && onComplete(e);
                     });
        }else{
          onComplete(null,null);
        }
    });
  }

  private _getItem = <Result>(key:string) => {
       let dataPromise = this.storage.getItem(key);
       if(this.shouldDecrypt(key)){
           return dataPromise.then((data) => {
               return this.crypto
                         .decryptRaw({KEY_PIN: key, KEY_INPUT: data})
                         .then((serializedDecryptedData) => {
                             return serializedDecryptedData;
                         });
           });
       }
       return dataPromise as Promise<Result>;
  }

  //removeItem  = <Result>(key:string, onComplete?: OnComplete<any>) => {
  removeItem  = (key:string, onComplete?: OnComplete<any>) => {
    return new Promise<any>((resolve,reject) => {
      //TODO
    });
  }

  getAllKeys = <Result>(onComplete?: OnComplete<Result>) => {
    return new Promise<Result>((resolve,reject) => {
      //TODO
    });
  }

    getLockableFields = () => {
      return this.lockableFields;
    }

    getEncryptFields = () => {
      return this.encryptFields;
    }

    getPlainFields = () => {
      return this.plainFields;
    }
    
    getActiveFields = () => {
      return this.activeFields;
    }

    isLocked = () => {
      return this.locked;
    }

    lock = () => {
      this.locked = true;
      this.key = '';
    }

    unLock = (key) => {
      this.locked = false;
      this.key = key;
    }

    shouldEncrypt(field){
      return this.encryptFields.indexOf(field) > 1;
    }

    shouldDecrypt(field){
      return this.encryptFields.indexOf(field) > 1;
    }


    allowIncomming = (field) => {

      if(this.activeFields.indexOf(field) === -1){ //if not a field we are monitoring then don't allow in
        return false;
      }

      if(this.lockableFields.indexOf(field) > -1 && this.locked){ //if field is locked and is lockable then deny incomming
        return false;
      }

      return true;
    }

    allowOutgoing = (field) => {
      return this.allowIncomming(field);
    }


}
