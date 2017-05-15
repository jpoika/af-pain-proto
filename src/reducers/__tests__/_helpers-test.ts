import {arrayUnique,arrayRemove,arrayPushUnique,obAddProp,copyArray} from '../_helpers';
import * as util from 'util';

describe('arrayPushUnique', () => {
  it('should only add items if they are not already in the array', () => {
      let test_array = [];
      arrayPushUnique('1',test_array);
      let uniqueArray = arrayPushUnique('1',test_array);
    
      expect(uniqueArray.length).toBe(1);

      uniqueArray = arrayPushUnique('5',test_array);
      expect(uniqueArray.length).toBe(2);
      
  });

  it('should remove item if it is in the array', () => {
      let test_array = ['2','7','5'];
      let newArray = arrayRemove('8',test_array);
      //nothing should be removed
      expect(newArray.length).toBe(3);

      newArray = arrayRemove('7',test_array);
      //one item should have been removed
      expect(newArray.length).toBe(2);

      expect(newArray.indexOf('2')).toBeGreaterThanOrEqual(0);
      expect(newArray.indexOf('5')).toBeGreaterThanOrEqual(0);
      expect(newArray.indexOf('7')).toBe(-1);//should return -1 when item is not found in array
      
  });

})
