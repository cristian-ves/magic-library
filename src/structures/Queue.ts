// O(1) for enqueue and dequeue (amortized)
// O(n) for traversing or searching all elements
// Chosen because it provides simple FIFO (First-In-First-Out) behavior,
// ideal for managing ordered processing of elements efficiently.

class QueueNode<T> {
    value: T;
    next: QueueNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export class Queue<T> {
    private head: QueueNode<T> | null = null;
    private tail: QueueNode<T> | null = null;
    private _size = 0;

    enqueue(item: T): void {
        const node = new QueueNode(item);
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this._size++;
    }

    dequeue(): T | undefined {
        if (!this.head) return undefined;
        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this._size--;
        return value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }

    isEmpty(): boolean {
        return this._size === 0;
    }

    size(): number {
        return this._size;
    }

    *iterator(): IterableIterator<T> {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }

    clear(): void {
        this.head = this.tail = null;
        this._size = 0;
    }
}
