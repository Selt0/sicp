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

//Conditional statements

function expmod(base, exp, m) {
  return exp === 0
          ? 1
          : is_even(exp)
            ? expmod(base, exp / 2, m)
              * expmod(base, exp / 2, m)
              % m
            : base 
              * expmode(base, exp - 1, m)
              % m;
}
//! expmod is called twice. Very unefficient

function expmod(base, exp, m) {
  if (exp === 0) {
    return 1;
  } else {
    if (is_even(exp)) {
      const to_half = expmod(base, exp / 2, m);
      return to_half * to_half % m;
    } else {
      return base * expmod(base, exp - 1, m) % m;
    }
  }
}

function search(f, neg_point, pos_point) {
  const midpoint = average(neg_point, pos_point);
  if (close_enough(neg_point, pos_point)) {
    return midpoint;
  } else {
    const test_value = f(midpoint);
    if (positive(test_value)) {
      return search(f, neg_point, midpoint);
    } else if (negative(test_value)) {
      return search(f, midpoint, pos_point);
    } else {
      return midpoint;
    }
  }
}

function close_enough(x, y) {
  return abs(x - y) < 0.001;
}
//awkward because we can accidentally give it points at which f's values do not have the required sign, in which case we get a wrong answer

//function to check which of the endpoints has a negative value and positive valu. If the function has the same sign, it signals an error
function half_interval_method(f, a, b) {
  const a_value = f(a);
  const b_value = f(b);
  return negative(a_value) && positive(b_value)
          ? search(f, a, b)
          : negative(b_value) && positive(a_value)
            ? search(f, b, a)
            : error('values are not of the opposite sign');
}

//search for a root of x^3 - 2x - 3 = 0
half_interval_method(x => x * x * x - 2 * x - 3, 1.0, 2.0);

const tolerance = 0.00001;
function fixed_point(f, first_guess) {
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }

  function try_with(guess) {
    const next = f(guess);
    return close_enough(guess, next)
            ? next
            : try_with(next)
  }
  return try_with(first_guess);
}

//sqaure root -> y * y = x
// y = x / y

//y = 1/2(y + x/y)

function sqrt(x) {
  return fixed_point( y => average(y, x / y), 1.0);
}

//average damping
function average_damp(f) {
  return x => average(x, f(x));
}

function sqrt(x) {
  return fixed_point(average_damp(y => x / y), 1.0);
}

//There are many ways to formulate a process as a function

//Experienced programmers know how to choose a process formulations 
//that are particularly perspicuous, and where useful elements of 
//the process are exposed as separate entities that can be reused 
//in other applications