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
	}

	// returns the number of elements in the pqueue
	size() {
		return this.size;
	}

	// adds an element into the pqueue
	add(e) {
		this.arr.push(e);
		this.size = this.arr.length;
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
		if(this.size === 0) throw new Error("Poll operation invalid: priority queue is empty");

		this.swap(0,this.size - 1);

		const ret = this.arr.pop();
		this.size = this.arr.length;

		this.restoreHeapDown();
		return ret;
	}

	// removes element from anywhere in the pqueue and return it
	remove() {

	}

	// helper methods; should be private, but oh well

	// takes two indices and swaps their values
	// returns true if successful, false if unsuccessful
	swap(pos1, pos2) {
		if(pos1 < 0 || pos2 < 0 || pos1 >= this.arr.length || pos2 >= this.arr.length) return false;
		const temp = this.arr[pos1];
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

// const pqueue = new PriorityQueue(((a,b) => a-b));

// const arr = [1,5,4,2,3,5,4,1,5,7,8,88,41,1,115,61,1556,75,3,213,5,5,32,3,2,1,1,996,2227,674,1267,0];

// arr.forEach(e => {
// 	pqueue.add(e)
// 	console.log(pqueue.arr)
// });

// while(pqueue.size > 0) {
// 	console.log(pqueue.poll());
// 	// console.log(pqueue.arr);
// }