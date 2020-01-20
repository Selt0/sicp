/*
------------------------------------
1.3 Formulating Abstractions with
Higher-Order Function
------------------------------------
*/
//computes sum of integers
function sum_intergers(a, b) {
  return a > b ? 0 : a + sum_intergers(a + 1, b);
}

//computes the sum of the cubes of integers
function sum_cubes(a, b) {
  return a > b ? 0 : cube(a) + sum_cubes(a + 1, b);
}

//computes sum of a sequence of terms in a series
function pi_sum(a, b) {
  return a > b ? 0 : 1.0 / (a * (a + 2)) + pi_sum(a + 4, b);
}

//These functions look identical, we can create a template
function name(a, b) {
  return a > b ? 0 : term(a) + name(next(a), b);
}

//using our template, create a function expressing the concept of adding
function sum(term, a , next, b) {
  return a > b ? 0 : term(a) + sum(term, next(a) , next, b);
}

//incrementing function
function inc(n) {
  return n + 1;
}

//rewrite sum of cubes with sum function
function sum_cubes(a, b) {
  return sum(cube, a, inc, b);
}

//identity function
function identity(x) {
  return x;
}

//rewrite sum of integers using sum and idectity
function sum_intergers(a, b) {
  return sum(identity, a, inc, b);
}

//rewrite pi_sum
function pi_sum(a, b) {
  function pi_term(x) {
    return 1.0 / (x * (x + 2));
  }
  
  function pi_next(x) {
    x + 4;
  }

  return sum(pi_term, a , pi_next, b);
}

//Rather than declare pi_next and pi_term, we can use
//function definition expression

function pi_sum(a, b) {
  return sum(x => 1.0 / (x * (x + 2)), a, x => x + 4, b);
}

//(parameters) => expression

function plus4x(X) { return x + 4}
//same as
const plus4 = x => x + 4;

//read                   x         =>             x    +  4
//as:                    ^         ^              ^    ^  ^
//function with argument x that results in the value plus 4

((x, y, z) => x + y + square(z))(1, 2, 3);

//f(x, y) = x(1 + xy)^2 + y(1 - y) + (1 +xy)(1 - y)
//a = 1 + xy
//b = 1 - y
//f(x, y) = xa^2 + yb + ab

//auxiliary function
function f(x, y) {
  function f_helper(a, b) {
    return x * square(a) + y * b + a * b;
  }
  return f_helper(1 + x * y, 1 - y);
}

//function expression
function f(x, y) {
  return ((a, b) => x * square(a) + y * b + a * b)(1 + x * y, 1 - y);
}

//variable declarations
function f(x, y) {
  const a = 1 + x * y;
  const b = 1 - y;

  return x * square(a) + y * b + a * b;
}