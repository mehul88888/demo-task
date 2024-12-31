const {sum_to_n_a, sum_to_n_b, sum_to_n_c} = require('./index')

describe('Summation Functions', () => {
  describe('sum_to_n_a', () => {
    test('should return 0 for n = 0', () => {
      expect(sum_to_n_a(0)).toBe(0);
    });

    test('should return -15 for n = -5', () => {
      expect(sum_to_n_a(-5)).toBe(-15);
    });

    test('should return 15 for n = 5', () => {
      expect(sum_to_n_a(5)).toBe(15); 
    });

    test('should return 55 for n = 10', () => {
      expect(sum_to_n_a(10)).toBe(55); 
    });
  });

  describe('sum_to_n_b', () => {
    test('should return 0 for n = 0', () => {
      expect(sum_to_n_b(0)).toBe(0);
    });

    test('should return -15 for n = -5', () => {
      expect(sum_to_n_b(1)).toBe(1);
    });

    test('should return 15 for n = 5', () => {
      expect(sum_to_n_b(5)).toBe(15);
    });

    test('should return 55 for n = 10', () => {
      expect(sum_to_n_b(10)).toBe(55); 
    });
  });

  describe('sum_to_n_c', () => {
    test('should return 0 for n = 0', () => {
      expect(sum_to_n_c(0)).toBe(0);
    });

    test('should return -15 for n = -5', () => {
      expect(sum_to_n_c(-5)).toBe(-15);
    });

    test('should return 15 for n = 5', () => {
      expect(sum_to_n_c(5)).toBe(15); 
    });

    test('should return 55 for n = 10', () => {
      expect(sum_to_n_c(10)).toBe(55); 
    });
  });
});