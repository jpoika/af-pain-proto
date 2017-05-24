import BrowserCryptoPromise from '../BrowserCryptoPromise';

const testDataInput = {
  cat: 'meow',
  dog: 'woof'
};
const inputPlain1 = {KEY_PIN: 'test_pin', KEY_INPUT: JSON.stringify(testDataInput)};

describe('Testing Browser Crypto which is a for TESTING ONLY', () => {

   it('Should Encrypt and decrypt data without any loss',(done) => {
      const cryptoPromise = new BrowserCryptoPromise();

      
      cryptoPromise.encryptRaw(inputPlain1).then((encrypted) => {
        return (encrypted as any);
      }).then((encString) => {

        const encInput = {KEY_PIN: 'test_pin', KEY_INPUT: encString};
        cryptoPromise.decryptRaw(encInput).then((decryptedString) => {
          
          let decriptypedObject = JSON.parse(decryptedString as any);
          expect(decriptypedObject).toEqual(testDataInput);
          done();
        });

      });
   });


   it('locking feature LOCKED for lockableFields',(done) => {
     // const cryptoPromise = new BrowserCryptoPromise();
     done();
   });

});