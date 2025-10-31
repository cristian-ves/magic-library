// O(1) for push and pop operations (amortized)
// O(n) for traversing or searching all elements
// Chosen because it provides LIFO (Last-In-First-Out) behavior,
// ideal for tracking operations, managing undo/redo, or backtracking algorithms.

export class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
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
