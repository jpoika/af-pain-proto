
import BrowserCryptoPromise from '../BrowserCryptoPromise';

describe('Testing Browser Crypto which is a for TESTING ONLY', () => {






  
   it('locking feature UNLOCKED for lockableFields',(done) => {
      const cryptoPromise = new BrowserCryptoPromise();
      const testDataInput = {
        cat: 'meow',
        dog: 'woof'
      };
      const input1 = {KEY_PIN: 'test_pin', KEY_INPUT: JSON.stringify(testDataInput)};
      cryptoPromise.encryptRaw(input1).then((encrypted) => {
          console.log((encrypted as any).toString());
          done();
      });
   });


   it('locking feature LOCKED for lockableFields',(done) => {
      const cryptoPromise = new BrowserCryptoPromise();
     done();
   });

});