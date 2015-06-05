'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

function Blob() {
  this.hoursInTown = 0;
  this.consumption = function(population) {
    for (var i = 1, peopleEaten = 0; peopleEaten < this.population; i++) {
      peopleEaten += i;
      this.hoursInTown++;
    }
    return this.hoursInTown;
  };
}

var blob = new Blob();

var hoursSpentInDowington = blob.consumption(1000); // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)



// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  var hours = 0;
  for (var i = peoplePerHour, peopleEaten; peopleEaten < population; i += peoplePerHour) {
    peopleEaten += i;
    hours++;
  }
  return hours;
}

Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');


// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(2000, 2) === hoursSpentInDowington,
  "the population is double, but the rate is double as well");
assert(blob.hoursToOoze(3000, 3) === hoursSpentInDowington,
  "it didn't work with a rate of 3");
assert(blob.hoursToOoze(4000, 4) === hoursSpentInDowington,
  "it didn't work with a rate of 4");
//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing (homePlanet, language) {
  this.homePlanet = homePlanet;
  this.language = language;
}

// sb is a SentientBeing object
function sayHello (sb) {

  console.log(hello[this.language])

  return hello[sb.language];

    //TODO: put this on the SentientBeing prototype
}

SentientBeing.prototype.sayHello = sayHello;

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Human() {
  this.homePlanet = 'Earth';
  this.language = 'federation standard';
}

Human.prototype = new SentientBeing();

function Klingon() {
  this.homePlanet = "Qon'noS";
  this.language = 'klingon';
}

Klingon.prototype = new SentientBeing();

function Romulan() {
  this.homePlanet = "Romulus";
  this.language = 'romulan';
}

Romulan.prototype = new SentientBeing();

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');
assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  "the romulan should hear Jolan 'tru");
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  "the romulan should hear Jolan 'tru");
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the romulan should hear nuqneH');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the romulan should hear hello');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the romulan should hear hello');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    var aLastLetter = a.charAt(a.length - 1),
    bLastLetter = b.charAt(b.length - 1);

    return aLastLetter - bLastLetter;
  }
  stringArray.sort(byLastLetter);
}

function sumArray(numberArray) {
  var sum = 0;
  function addArray(currentValue, index, array) {
    sum += currentValue;
    return sum;
  }
  sum = numberArray.forEach(addArray);

  return sum;
}

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    return (sumArray(a)) - (sumArray(b));
  });
}

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
