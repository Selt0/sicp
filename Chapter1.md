#Chapter 1 - Building Abstractions with Functions#

##Abstraction##
>Fancy way of saying, 'taking something that's really complex, taking a step back, and packaging it up in a way thats simpler and easier to understand from the top down.'

All you need to know is what is important to you.

You don't know what's hapenning in the background but just by looking at the procedure, you know what it's trying to do and what effect it's trying to achieve. 

A car. Don't need to know what's under the hood, how the engine works,how it accelerates, etc. All you need to know is you use the wheel to turn, the gas pedal makes it go, and the brakes make it stop. 

Under the hood, all those details can change. It can go from gas to electric, but it doesn't change how you operate the car.

function 1to100() {
  let x = 0;
  for (let i = 0; i <= 100; i++) {
    x += i;
  }
  console.log(x);
}

function 1to100() {
  initialize_variables();
  loop_100_times();
  display_variables();
}

---

```
function square(x) {
  return x * x;
}

function sum_of_squares(x, y) {
  return square(x) + square(y);
}

function f(a) {
  return sum_of_squares(a + 1, a * 2);
}
```
##Applicative Order##

**Evaluate the arguments and then apply**

```
f(5)

sum_of_squares(5 + 1, 5 * 2)
sum_of_squares(6, 10)
square(6) + square(10)
(6 * 6) + square(10)
36 + square(10)
36 + (10 * 10)
36 + 100

 136
```

##Normal Order##

**Fully expand then reduce**

```
f(5)

sum_of_squares(5 + 1, 5 * 2)
square(5 + 1) + square(5 * 2)
(5 + 1) * (5 + 1) + square(5 * 2)
(5 + 1) * (5 + 1) + (5 * 2) + (5 * 2)
6 * (5 + 1) + (5 * 2) * (5 * 2)
6 * 6 + (5 * 2) * (5 * 2)
36 + (5 * 2) * (5 * 2)
36 + 10 * (5 * 2)
36 + 10 * 10
36 + 100

136
```

###Aplicative vs Normal###

```
function zero(x) {
  return x - x;
}
```
Applicative
```
zero(random10) 

zero(8)

8 - 8

0
```
Normal
```
zero(random10)

random10 - random10

3 - 1

2
```
---

##Internal declarations and block structure##

The square-root program consists of separate functions :

```
function sqrt(x) {
  return sqrt_iter(1.0, x);
}
function sqrt_iter(guess, x) {
  return good_enough(guess, x)
         ? guess
         : sqrt_iter(improve(guess, x), x);
}
function good_enough(guess, x) {
  return abs(square(guess) - x) < 0.001;
}
function improve(guess, x) {
  return average(guess, x / guess);
}
```
The problem here is the only function that is important to users is `sqrt`. The other functions clutter up the environment and most likely wont be called as part of another program. However, this could be a possibilty and a huge issue when working on larger systems by many separate programmers. Other programs could have their own functions named `good_enough` or `improve`. We should localize the subfunctions and  make them private to `sqrt`.

Localizing the functions also allow us to simplify the functions. Since `x` is bound to `sqrt`, the functions inside `sqrt` are in the scope of `x`. We can let `x` be a free variable/name. Aka *lexical scoping*.

```
function sqrt(x) {
  function good_enough(guess) {
    return abs(sqaure(guess) - x) < 0.001;
  }
  function improve(guess) {
    return average(guess, x / guess);
  }
  function sqrt_iter(guess) {
    return good_enough(guess) ? guess : sqrt_iter(improve(guess))
  }
  return sqrt_iter(1.0);
}
```

Block strucutre is an important tool for helping to organize the construction of large programs