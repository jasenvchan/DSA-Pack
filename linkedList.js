class LinkedList {
	constructor() {
		this.size = 0;
		this.head = null;
		this.tail = null;
	}


	// appends to the end of the list in O(1)
	push(val) {
		const toAdd = new ListNode(val);

		if(!this.head) {
			this.head = toAdd;
			this.tail = toAdd;
		}
		else {
			this.tail.next = toAdd;
			toAdd.prev = this.tail;
			this.tail = this.tail.next;
		}

		this.size++;
	}

	// prepends to the start of the list in O(1)
	unshift(val) {
		const toAdd = new ListNode(val);

		if(!this.head) {
			this.head = toAdd;
			this.tail = toAdd;
		}
		else {
			this.head.prev = toAdd;
			toAdd.next = this.head;
			this.head = toAdd;
		}

		this.size++;
	}

	// inserts at a given position (0-indexed) in O(n)
	// return new size of list
	insert(val, position) {
		let curr = this.head;
		let place = 0;

		if(position >= this.size) {
			this.push(val);
			return this.size;
		}
		else if(position <= 0) {
			this.unshift(val);
			return this.size;
		}

		while(place < position) {
			curr = curr.next;
			place++;
		}

		let toAdd = new ListNode(val);

		toAdd.next = curr;
		toAdd.prev = curr.prev;
		curr.prev.next = toAdd;
		curr.prev = toAdd;

		this.size++;
		return this.size;
	}

	// removes from the end of array in O(1)
	// returns the value of the popped node
	pop() {
		let ret = null;

		if(this.isEmpty()) return;
		if(this.size === 1) {
			ret = this.head;
			this.tail = null;
			this.head = null;
		}
		else {
			ret = this.tail;
			this.tail = this.tail.prev;
			this.tail.next.prev = null;
			this.tail.next = null;
		}

		this.size --;
		return ret;
	}

	// removes node with given value in O(n)
	// returns the position the element was at or -1, if not found
	remove(val) {
		let curr = this.head;
		let place = 0;

		while(curr) {
			if(curr.val === val) {
				if(curr === this.tail) {
					this.pop();
					return place;
				}
				else if(curr === this.head) {
					this.head = this.head.next;
					this.head.prev.next = null;
					this.head.prev = null;
				}
				else {
					curr.prev.next = curr.next;
					curr.next.prev = curr.prev;
				}

				this.size --;
				return place;
			}

			place++;
		}

		return -1;
	}

	// returns a boolean indicating whether or not the list is empty in O(1)
	isEmpty() {
		return this.size === 0;
	}

	// returns whether or not the list contains a given value in O(n)
	includes(val) {
		let tempHead = this.head;

		while(tempHead) {
			if(tempHead.val === val) return true;
			tempHead = tempHead.next;
		}

		return false;
	}
}

class ListNode {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.prev = null;
	}
}

module.exports = LinkedList;