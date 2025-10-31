// O(1) for enqueue and dequeue (amortized)
// O(n) for traversing or searching all elements
// Chosen because it provides simple FIFO (First-In-First-Out) behavior,
// ideal for managing ordered processing of elements efficiently.

export class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    getAll(): T[] {
        return [...this.items];
    }

    clear(): void {
        this.items = [];
    }
}
