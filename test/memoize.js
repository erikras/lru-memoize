import expect from 'expect';
import memoize from '../src/memoize';

describe('memoize', () => {

  describe('basic', () => {

    it('single', () => {
      let callCount = 0;
      let multiply = (x, y, z) => {
        callCount += 1;
        return x*y*z;
      };
      multiply = memoize()(multiply);

      expect(
        multiply(1,2,3)
      ).toBe(6);

      expect(
        multiply(1,2,3)
      ).toBe(6);

      expect(
        callCount
      ).toBe(1);

      expect(
        multiply(4,5,6)
      ).toBe(120);

      expect(
        callCount
      ).toBe(2);

      expect(
        multiply(1,2,3)
      ).toBe(6);

      expect(
        callCount
      ).toBe(3);
    });

    it('multiple', () => {
      let callCount = 0;
      let multiply = (x, y, z) => {
        callCount += 1;
        return x*y*z;
      };
      multiply = memoize(2)(multiply);

      expect(
        multiply(1,2,3)
      ).toBe(6);

      expect(
        multiply(1,2,3)
      ).toBe(6);

      expect(
        callCount
      ).toBe(1);

      expect(
        multiply(4,5,6)
      ).toBe(120);

      expect(
        callCount
      ).toBe(2);

      expect(
        multiply(1,2,3)
      ).toBe(6);

      expect(
        callCount
      ).toBe(2);

      expect(
        multiply(4,5,6)
      ).toBe(120);

      expect(
        callCount
      ).toBe(2);

    });

  });

  describe('shallow', () => {

    it('array', () => {
      let callCount = 0;
      let multiply = (x, y, z) => {
        callCount += 1;
        return x.concat(y,z).reduce((t, n) => t*n);
      };
      multiply = memoize()(multiply);

      const x = [1,2,3];
      const y = [4,5,6];
      const z = [7,8,9];

      const x2 = [1,2,3];

      expect(
        multiply(x,y,z)
      ).toBe(362880);

      expect(
        multiply(x2,y,z)
      ).toBe(362880);

      expect(
        callCount
      ).toBe(2);
    });

    it('object', () => {
      let callCount = 0;
      let multiply = (x, y, z) => {
        callCount += 1;
        return x.val*y.val*z.val;
      };
      multiply = memoize(2)(multiply);

      const x = {val:1};
      const y = {val:2};
      const z = {val:3};

      const x2 = {val:1};

      expect(
        multiply(x,y,z)
      ).toBe(6);

      expect(
        multiply(x2,y,z)
      ).toBe(6);

      expect(
        callCount
      ).toBe(2);
    });


  });

  describe('deep', () => {

    it('array', () => {
      let callCount = 0;
      let multiply = (x, y, z) => {
        callCount += 1;
        return x.concat(y,z).reduce((t, n) => t*n);
      };
      multiply = memoize(true)(multiply);

      const x = [1,2,3];
      const y = [4,5,6];
      const z = [7,8,9];

      const x2 = [1,2,3];
      const x3 = [3,2,1];

      expect(
        multiply(x,y,z)
      ).toBe(362880);

      expect(
        multiply(x2,y,z)
      ).toBe(362880);

      expect(
        callCount
      ).toBe(1);

      expect(
        multiply(x3,y,z)
      ).toBe(362880);

      expect(
        callCount
      ).toBe(2);
    });

    it('object', () => {
      let callCount = 0;
      let multiply = (x, y, z) => {
        callCount += 1;
        return x.val*y.val*z.val;
      };
      multiply = memoize(true)(multiply);

      const x = {val:1};
      const y = {val:2};
      const z = {val:3};

      const x2 = {val:1};
      const x3 = {val:4};

      expect(
        multiply(x,y,z)
      ).toBe(6);

      expect(
        multiply(x2,y,z)
      ).toBe(6);

      expect(
        callCount
      ).toBe(1);

      expect(
        multiply(x3,y,z)
      ).toBe(24);

      expect(
        callCount
      ).toBe(2);
    });

    it('object nested', () => {
      let callCount = 0;
      let multiply = (x, y, z) => {
        callCount += 1;
        return x.inner.val*y.inner.val*z.inner.val;
      };
      multiply = memoize(true)(multiply);

      const x = {inner:{val:1}};
      const y = {inner:{val:2}};
      const z = {inner:{val:3}};

      const x2 = {inner:{val:1}};
      const x3 = {inner:{val:4}};

      expect(
        multiply(x,y,z)
      ).toBe(6);

      expect(
        multiply(x2,y,z)
      ).toBe(6);

      expect(
        callCount
      ).toBe(1);

      expect(
        multiply(x3,y,z)
      ).toBe(24);

      expect(
        callCount
      ).toBe(2);
    });

  });

});
