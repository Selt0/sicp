/*
------------
Exercise 3.1
------------
 Using Simpson's Rule, the integral of a function 𝑓 between 𝑎 and 𝑏 is approximated as

ℎ/3[𝑦0+4𝑦1+2𝑦2+4𝑦3+2𝑦4+⋯+2𝑦𝑛−2+4𝑦𝑛−1+𝑦𝑛]

where ℎ=(𝑏−𝑎)/𝑛, for some even integer 𝑛, and 𝑦𝑘=𝑓(𝑎+𝑘ℎ). (Increasing 𝑛 increases the accuracy of the approximation.) Declare a function that takes as arguments 𝑓, 𝑎, 𝑏, and 𝑛 and returns the value of the integral, computed using Simpson's Rule. Use your function to integrate cube between 0 and 1 (with 𝑛=100 and 𝑛=1000), and compare the results to those of the integral function shown above. 
*/
function sum( term, a, next, b) {
  return a > b ? a : term(a) + sum(term, next(a), next, b);
}

function cube(x) {
  return x * x * x;
}

function inc(k) {
  return  k + 1;
}
function simspon_rule_integral(f, a, b, n) {
  function h(h) {
    function y(k) {
      return f((k * h) + a);
    }
    function term(k) {
      return k === 0 || k === n 
             ? y(k) 
             : k % 2 === 0 
                ? 2 * y(k) 
                : 4 * y(k);
    }
    return sum(term, 0, inc, n) * (h / 3);
  }
  return h((b - a) / n);
}

/*
------------
Exercise 3.2
------------

The sum function above generates a linear recursion. The function can be rewritten so that the sum is performed iteratively. Show how to do this by filling in the missing expressions in the following declaration:

function sum(term, a, next, b) {
    function iter(a, result) {
        return ??
               ? ??
               : iter(??,??);
    }
    return iter(??, ??);
}
*/

function sum(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), result + term(a));
  }
  return iter(a, 0);
}