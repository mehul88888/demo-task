

var sum_to_n_a = (n) => {
    let sum = 0;  
    if (n < 0) {
      for (let i = n; i < 0; i++) {
        sum += i;
      }
    } else {
      for (let i = 1; i <= n; i++) {
        sum += i;
      }
    }
    return sum;
  };
  
  var sum_to_n_b = (n) => {
    if (n >= 0) {
      return (n * (n + 1)) / 2; 
    } else {
      return (-((Math.abs(n) * (Math.abs(n) - 1)) / 2)) + n; 
    }
  };
  
  var sum_to_n_c = (n) => {
    if (n === 0) return 0; 
    return n < 0 ? n + sum_to_n_c(n + 1) : n + sum_to_n_c(n - 1); 
  };


  module.exports = {sum_to_n_a,sum_to_n_b,sum_to_n_c}