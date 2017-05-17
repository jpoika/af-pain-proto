/**
 * This class is for testing only. Secrety key is not secret!
 */
import * as CryptoJS from "crypto-js";
import {
  CryptoPromiseInterface,
  CryptoInterface,
  DataInInterface,
  ChangeAnswersWithPinInterface,
  ChangePinWithAnswersInterface,
  ChangePinWithPinInterface,
  CheckPinInterface
} from './interface';
const secretKey = 'asdfaieqklallsdlfas';

export default class BrowserCryptoPromise implements CryptoPromiseInterface {
  crypto: CryptoInterface = null;
  debug: boolean = false;
  private key: string = 'dummyKeyasdfads43453';

  constructor(crypto:CryptoInterface = null){
    this.crypto = crypto;
  }

  setCrypto = (crypto:CryptoInterface) => {
    this.crypto = crypto;
  }

  encryptRaw = (data:DataInInterface) => {
      return new Promise((resEncrypt,rejEncrypt) => {
         return resEncrypt(CryptoJS.AES.encrypt(data.KEY_INPUT,secretKey).toString());
      });
  }

  decryptRaw = (data:DataInInterface) => {
      return new Promise((resolveDecrypt,rejectDecrypt) => {
                    resolveDecrypt(CryptoJS.AES.decrypt(data.KEY_INPUT,secretKey).toString(CryptoJS.enc.Utf8));
      });
  }

  changeAnswersUsingPin = (data: ChangeAnswersWithPinInterface) => {
    return new Promise((res,rej) => {
      res(true);
    });
  }

  changePinUsingPin = (data: ChangePinWithPinInterface) => {
    return new Promise((res,rej) => {
      res(data.KEY_NEW_PIN);
    });
  }

  changePinUsingAnswers = () => {
    return new Promise((res,rej) => {
      res(true);
    });
  }

  checkPin = (data: CheckPinInterface) => {
    return new Promise((res,rej) => {
      res(true);
    });
  }

  getDatabaseKeyUsingPin = (data: CheckPinInterface) => {
    return new Promise((res,rej) => {
      res(this.key);
    });
  }

}
