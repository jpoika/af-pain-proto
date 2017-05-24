import T2CordovaStorageEngine from '../T2CordovaStorageEngine';
import BrowserCryptoPromise from '../BrowserCryptoPromise';
//import CordovaCryptoPromise from '../CordovaCryptoPromise';

export const createMockStorageEngine = () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn()
  }
}




describe('Testing data flow for storage engine', () => {


  const plainFields = ['migrations','navigation','routing','view','onLogout','user'];
  const encryptFields = ['workbooks','workbookIds','goals','notes','noteIds'];
  const lockableFields = ['workbooks','workbookIds','goals','notes','noteIds'];  
  const key = 'asdfasddoesn';


  const config = {
    storage: createMockStorageEngine(),
    crypto: new BrowserCryptoPromise(),
    plainFields: plainFields,
    encryptFields: encryptFields,
    lockableFields: lockableFields
  };
  
  const encryptionEngine = new T2CordovaStorageEngine(config);
  
   it('locking feature UNLOCKED for lockableFields',(done) => {
     encryptionEngine.unLock(key);
     lockableFields.forEach((field) => {
       expect(encryptionEngine.allowIncomming(field)).toBe(true);
     });
     done();
   });


   it('locking feature LOCKED for lockableFields',(done) => {
     encryptionEngine.lock();
     lockableFields.forEach((field) => {
       expect(encryptionEngine.allowIncomming(field)).toBe(false);
     });
     done();
   });

});