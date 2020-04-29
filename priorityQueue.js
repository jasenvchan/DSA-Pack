/*

Methods needed

add
remove
peek
clear
size

*/

class PriorityQueue {

	constructor(comparator = (a, b) => a-b) {
		this.arr = [];
		this.comparator = comparator;
		this.size = this.arr.length;
		this.map = new Map();
	}

	// returns the number of elements in the pqueue
	size() {
		return this.size;
	}

	// adds an element into the pqueue
	add(e) {
		this.arr.push(e);
		this.size = this.arr.length;

		// add the element to the map and 
		if(!this.map.has(e)) this.map.set(e, new Set());
		
		this.map.get(e).add(this.size - 1);

		this.restoreHeapUp();
	}

	// removes all elements from the pqueue
	clear() {

	}

	// returns the element at the head of the pqueue; does not remove it
	peek() {
		if(this.size === 0) throw new Error("Peek operation invalid: priority queue is empty");
		return this.arr[0];
	}

	// removes element from head of the pqueue and returns it
	poll() {

		/*
			POLL NEEDS TO UPDATE THE MAP
		*/

		if(this.size === 0) throw new Error("Poll operation invalid: priority queue is empty");

		let endIndex = this.size - 1;

		this.swap(0,endIndex);

		const ret = this.arr.pop();
		this.size = this.arr.length;

		this.map.get(ret).delete(endIndex);
		if(this.map.get(ret).size === 0) this.map.delete(ret);

		this.restoreHeapDown();
		return ret;
	}

	// removes element from anywhere in the pqueue and return it
	// if the element doesn't exist in the pqueue return undefined
	// runs in O(logn) where n is the height of the heap
	remove(e) {
		/*
		- Create an internal map to store which value is at which index of arr representing the heap
		- call this.restoreHeapDown() on the index of the element to be removed,

		***** BIG PROBLEM ******
		Duplicates will get overwritten in the map, so after a delete, there will be no reference to another duplicate

		- possible solution: make each value in the map a set containing all locations of duplicates
		- it doesn't matter which duplicate we remove, so long as one of the duplicates is removed
		- when adding to something that already exists, add it to the set
		- swapping also needs to change
			- now needs to remove and add to respective sets
			- watch out for edge case where we're swapping duplicates

		*/

		if(!this.map.has(e) || this.size === 0) return;

		// trying to get single element from the set...this seems to be the only syntax that works
		const prevIndex = this.map.get(e).keys().next().value;

		this.swap(prevIndex, this.size - 1);

		this.map.get(e).delete(this.size - 1);
		if(this.map.get(e).size === 0) this.map.delete(e);

		this.arr.pop();
		this.size = this.arr.length;

		this.restoreHeapDown(prevIndex);

		return e;
	}

	// helper methods; should be private, but oh well

	// takes two indices and swaps their values
	// returns true if successful, false if unsuccessful

	swap(pos1, pos2) {
		if(pos1 < 0 || pos2 < 0 || pos1 >= this.arr.length || pos2 >= this.arr.length) return false;
		const temp = this.arr[pos1];

		// this.map.set(this.arr[pos1], pos2);
		// this.map.set(this.arr[pos2], pos1);

		this.map.get(this.arr[pos1]).delete(pos1);
		this.map.get(this.arr[pos1]).add(pos2);
		this.map.get(this.arr[pos2]).delete(pos2);
		this.map.get(this.arr[pos2]).add(pos1);

		this.arr[pos1] = this.arr[pos2];
		this.arr[pos2] = temp;

		return true;
	}

	// return left child index or -1 if it doesn't have a left child
	leftChildIndex(parentIdx) {
		return 2 * parentIdx + 1 < this.arr.length ? 2 * parentIdx + 1 : -1;
	}

	// return right child index or -1 if it doesn't have a right child
	rightChildIndex(parentIdx) {
		return 2 * parentIdx + 2 < this.arr.length ? 2 * parentIdx + 2 : -1;
	}

	parentIndex(childIdx) {
		return Math.floor((childIdx - 1) / 2);
	}

	restoreHeapUp(curr = this.size - 1) {
		const parentI = this.parentIndex(curr);
		if(curr === 0 || this.comparator(this.arr[curr], this.arr[parentI]) >= 0) return;

		this.swap(curr, parentI);
		this.restoreHeapUp(parentI);
	}

	restoreHeapDown(curr = 0) {
		if(this.size <= 1) return;

		const leftChildI = this.leftChildIndex(curr);

		if(leftChildI === -1) return;

		const rightChildI = this.rightChildIndex(curr);
		let smallerChildI = rightChildI === -1 ? leftChildI : (this.comparator(this.arr[leftChildI], this.arr[rightChildI]) <= 0 ? leftChildI : rightChildI);

		if(this.comparator(this.arr[curr],this.arr[smallerChildI]) <= 0) return;
		else {
			this.swap(curr, smallerChildI);
			this.restoreHeapDown(smallerChildI);
		}
	}
}

const pqueue = new PriorityQueue(((a,b) => b-a));

const arr = [2,5,3,4,2,4,5,7,8,7]; //[1,5,4,2,3,5,4,1,5,7,8,88,41,1,115,61,1556,75,3,213,5,5,32,3,2,1,1,996,2227,674,1267,0];

arr.forEach(e => {
	pqueue.add(e)
	console.log(pqueue.arr)
	
});

console.log(pqueue.arr)
console.log(pqueue.map)

pqueue.remove(2);

console.log(pqueue.arr)
console.log(pqueue.map)

while(pqueue.size > 0) {
	console.log(pqueue.poll());
	// console.log(pqueue.arr);
}