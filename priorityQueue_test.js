const PriorityQueue = require('./priorityQueue');


let arr = [];

for(let i = 0; i < 200; i++) {
	arr.push(Math.floor(-500 + Math.random() * 1000));
}

// can min heap integers

let pqueue = new PriorityQueue((a,b) => a-b);

let sortedArr = [...arr].sort((a,b) => a-b);

// const res = [];

let passing = true;
let place = 0;

arr.forEach(e => pqueue.add(e));

while(!pqueue.isEmpty()) {

	if(pqueue.poll() != sortedArr[place]) passing = false;
	place ++;
}

console.log(`PriorityQueue can min heap integers: ${passing}`);

// can max heap integers

pqueue = new PriorityQueue((a,b) => b-a);

sortedArr = [...arr].sort((a,b) => b-a);

passing = true;
place = 0;

arr.forEach(e => pqueue.add(e));

while(!pqueue.isEmpty()) {
	if(pqueue.poll() != sortedArr[place]) passing = false;
	place ++;
}

console.log(`PriorityQueue can max heap integers: ${passing}`);


// can custom compare integers

let customComparator = (a,b) => {
	if(a % 2 === 0 && b % 2 === 0) return a - b;
	else if(a % 2 === 0) return 1;
	else if(b % 2 === 0) return -1;

	return a-b;
}

pqueue = new PriorityQueue(customComparator);

sortedArr = [...arr].sort(customComparator);

passing = true;
place = 0;

arr.forEach(e => pqueue.add(e));

while(!pqueue.isEmpty()) {
	if(pqueue.poll() != sortedArr[place]) {
		passing = false;
		// break;
	}
	place ++;
}

console.log(`PriorityQueue can custom compare integers: ${passing}`);

// can min heap non-integer numbers

arr = [];

for(let i = 0; i < 200; i++) {
	arr.push((-500 + Math.random() * 1000));
}

pqueue = new PriorityQueue();

sortedArr = [...arr].sort((a,b) => a-b);

passing = true;
place = 0;

arr.forEach(e => pqueue.add(e));

while(!pqueue.isEmpty()) {
	if(pqueue.poll() != sortedArr[place]) {
		passing = false;
	}
	place ++;
}

console.log(`PriorityQueue can min heap non-integers: ${passing}`);

// can max heap non-integer numbers

arr = [];

for(let i = 0; i < 200; i++) {
	arr.push((-500 + Math.random() * 1000));
}

pqueue = new PriorityQueue((b,a) => b-a);

sortedArr = [...arr].sort((b,a) => b-a);

passing = true;
place = 0;

arr.forEach(e => pqueue.add(e));

while(!pqueue.isEmpty()) {
	if(pqueue.poll() != sortedArr[place]) {
		passing = false;
	}
	place ++;
}

console.log(`PriorityQueue can min heap non-integers: ${passing}`);

// can min heap objects

arr = [];

for(let i = 0; i < 200; i++) {
	arr.push({score: Math.floor(-500 + Math.random() * 1000)});
}

pqueue = new PriorityQueue((a,b) => a.score-b.score);

sortedArr = [...arr].sort((a,b) => a.score-b.score);

passing = true;
place = 0;

arr.forEach(e => pqueue.add(e));

while(!pqueue.isEmpty()) {
	if(pqueue.poll().score != sortedArr[place].score) {
		passing = false;
	}
	place ++;
}

console.log(`PriorityQueue can min heap objects: ${passing}`);
// can max heap objects

arr = [];

for(let i = 0; i < 200; i++) {
	arr.push({score: Math.floor(-500 + Math.random() * 1000)});
}

pqueue = new PriorityQueue((a,b) => a.score-b.score);

sortedArr = [...arr].sort((a,b) => a.score-b.score);

passing = true;
place = 0;

arr.forEach(e => pqueue.add(e));

while(!pqueue.isEmpty()) {
	if(pqueue.poll().score != sortedArr[place].score) {
		passing = false;
	}
	place ++;
}

console.log(`PriorityQueue can max heap objects: ${passing}`);

// remove method works for integers

// remove method works for other primitives

// remove method works for objects

// remove method works for other reference types