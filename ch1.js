/*
------------
Exercise 1.1
------------
Below is a sequence of statements. Before you click on a statement, predict what the result of its evaluation will be. 

10;

5 + 3 + 4;

9 - 1;

6 / 2;

2 * 4 + (4 - 6);

const a = 3;
const b = a + 1;
a + b + a * b;

a === b;

b > a && b < a * b 
  ? b : a

a === 4 ? 6 : b === 4 ? 6 + 7 + a : 25

2 + (b > a ? b : a)

(a > b
  ? a
  : a < b
    ? b
    : - 1)
  *
  (a + 1);

*/

/* 
ANSWER: 
10;
// -> 10

5 + 3 + 4;
// -> 12

9 - 1;
// -> 8

6 / 2;
// -> 3

2 * 4 + (4 - 6);
// -> 6

const a = 3;
const b = a + 1;
a + b + a * b;
// -> 19

a === b;
// -> false

b > a && b < a * b 
  ? b : a
// -> 4

a === 4 ? 6 : b === 4 ? 6 + 7 + a : 25
// -> 16

2 + (b > a ? b : a)
// -> 6

(a > b
  ? a
  : a < b
    ? b
    : - 1)
  *
  (a + 1);
// -> 16
*/

/*
------------
Exercise 1.2
------------
Translate the following  expression into JavaScript

 5 + 4 + (2 - (3 - (6 + 4/5)))
 ----------------------------
        3(6 - 2)(2 -7)
*/

(5 + 4 + (2 - (3 - (6 + 4/5)))) / (3 * (6 - 2) * (2 - 7));

/*
------------
Exercise 1.3
------------
 Declare a function that takes three numbers as arguments and returns the sum of the squares of the two larger numbers.
 */
function square(x) {
  return x * x;
}

function sumOfSquares(a, b ,c) {
//compare a & b to c
 return (a > c && b > c
          ? square(a) + square(b)
          //compare b & c to a
          : b > a && c > a
            ? square(b) + square(c)
            : square(a) + sqaure(c));
}

sumOfSquares(1, 2, 3);
// ->  13

/* book solution

function square(x) {
    return x * x;
}
                
function f(x, y, z) {
   return square(x) + square(y) + square(z) -
          // subtract the square of the smallest
          square(x > y 
                  ? (y > z 
                    ? z 
                    : y) 
                  : (x > z 
                    ? z 
                    : x));
}
*/

/*
------------
Exercise 1.4
------------
Observe that our model of evaluation allows for application combinations whose function expressions are compound expressions. Use this observation to describe the behavior of the following function:

function plus(a, b) { return a + b; }
function minus(a, b) { return a - b; }
function a_plus_abs_b(a, b) {
    return (b >= 0 ? plus : minus)(a, b);
}

Note that in the conditional expression, we cannot directly use the operators + and - instead of the names plus and minus because in infix notation, only operator symbols are allowed in the middle, not compound expressions.
*/

/*
ANSWER: 
function plus takes two arguments and returns the sum.
function minus takes two arguments and returns the difference
function a_plus_abs_b takes two arguments and returns the plus function if b is greater than or equal to 0, else it returns the minus function 
*/

/*
------------
Exercise 1.5
------------
Ben Bitdiddle has invented a test to determine whether the interpreter he is faced with is using applicative-order evaluation or normal-order evaluation. He declares the following two functions :

function p() {
    return p();
}

function test(x, y) {
    return x === 0 ? 0 : y;
}

Then he evaluates the statement

test(0, p());

What behavior will Ben observe with an interpreter that uses applicative-order evaluation? What behavior will he observe with an interpreter that uses normal-order evaluation? Explain your answer. (Assume that the evaluation rule for conditional expressions is the same whether the interpreter is using normal or applicative order: The predicate expression is evaluated first, and the result determines whether to evaluate the consequent or the alternative expression.)
*/

/* ANSWER: 
1. Evaluate the function expression of the application combination
2. Evaluate the argument epression of the combination
3. Apply the function to the arguments

Normal-order: fully expand then reduce
Normal-order will run the test function first and since x === 0, it will not run ph(). 

test(0, ph()) {
  return 0 === 0? 0 : ph());
}

Applicative-order: evalaute the arguments then apply
Applicative-order will attempt to evaluate the function expression ph() before running the test funtion. Thus it will show an error because of too much recursion

test(0, ph());
0 -> 0
phi() --> error, too much recursion

*/

/*
------------
Exercise 1.6
------------
Alyssa P. Hacker doesn't like the syntax of conditional expressions, involving the characters ? and :. Why can't I just declare an ordinary conditional function whose application works just like conditional expressions? she asks. Alyssa's friend Eva Lu Ator claims this can indeed be done, and she declares a conditional function as follows:

function conditional(predicate, then_clause, else_clause) {		    
    return predicate ? then_clause : else_clause;
}

Eva demonstrates the program for Alyssa:

conditional(2 === 3, 0, 5);

evaluates as expected to 5, and

conditional(1 === 1, 0, 5);

evaluates as expected to 0. Delighted, Alyssa uses conditional to rewrite the square-root program:

function sqrt_iter(guess, x) {
    return conditional(good_enough(guess, x),
                       guess,
                       sqrt_iter(improve(guess, x),
                                 x));
}

What happens when Alyssa attempts to use this to compute square roots? Explain. 
*/

/* ANSWER: 
Because of applicative-order, the conditional function evalautes the arguments first. Which leads to sqrt_iter calling itself in an infinite loop. Too much recursion. Thus the condtional loop never actually gets run.
 */

/*
------------
Exercise 1.7
------------
The good_enough test used in computing square roots will not be very effective for finding the square roots of very small numbers. Also, in real computers, arithmetic operations are almost always performed with limited precision. This makes our test inadequate for very large numbers. Explain these statements, with examples showing how the test fails for small and large numbers. An alternative strategy for implementing good_enough is to watch how guess changes from one iteration to the next and to stop when the change is a very small fraction of the guess. Design a square-root function that uses this kind of end test. Does this work better for small and large numbers?
 */

/* 
ANSWER:
good_enough tests whether the returned value is greater than 0.001. this causes the program to calculate very long numbers.

function good_enough(guess, x) {
    return abs(square(guess) - x) < 0.001;
}

sqrt_iter(1,4);
// -> 2.0000000929222947

sqrt_iter(1, 144);
// -> 12.000000012408687

By changing the test to <= 0, it beceomes more precise

function good_enough(guess, x) {
    return abs(square(guess) - x) <= 0;
}
sqrt_iter(1,4);
// -> 2

sqrt_iter(1, 144);
// -> 12

*/

/* Book:
The absolute tolerance of 0.001 is too large when computer small numbers. On the other hand, for very large numbers, rounding errors might make the algorithm fail to ever get close enough  to the square root. Replace the absolute threshold with a relative.

const error_threshold = 0.01;
function good_enough(guess,x) {
    return relative_error(guess, improve(guess, x)) < error_threshold;
}
function relative_error(estimate, reference) {
    return abs(estimate - reference) / reference;
}
*/

/*
------------
Exercise 1.8
------------
Newton's method for cube roots is based on the fact that if 𝑦 is an approximation to the cube root of 𝑥, then a better approximation is given by the value

𝑥/𝑦^2 + 2𝑦
---------
    3

Use this formula to implement a cube-root function analogous to the square-root function. (In section 1.3.4 we will see how to implement Newton's method in general as an abstraction of these square-root and cube-root functions.) 
*/

function cube_iter(guess, x) {
  return good_enough(guess,x)
          ? guess
          : cube_iter(improve(guess,x), x);
}

function improve(guess, x) {
  return div3(x / square(guess), 2 * guess);
}

function good_enough(guess, x) {
  return abs(cube(guess) - x) < 0.001;
}

function div3(x, y) {
  return (x + y) / 3;
}

function square(x) {
  return x * x;
}

function abs(x) {
  return x >= 0 ? x : -x;
}

function cube(x) {
  return  x * x * x;
}

/*
------------
Exercise 1.29
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
Exercise 1.30
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

/*
------------
Exercise 1.34
------------

function f(g) {
  return g(2);
}

What will these return?
f(square);

f(z => z * (z + 1));

What happenes if we ask the interpreter to evaluate the combination f(f)? Explain
*/

/* ANSWER:

f(square) returns 4 because f(square) results to f(square(g(2)))
2 * 2 = 4;

f (z => z * (z + 1)) returns 6 because z will equal 2;

f(f) will return an error because the function f(g) returns g(2). so f(f) will return 2(2) which is a non-function value;
*/