export interface DLNode<T> {
    value: T;
    next: DLNode<T> | null;
    prev: DLNode<T> | null;
}

export class DoublyLinkedList<T> {
    private head: DLNode<T> | null = null;
    private tail: DLNode<T> | null = null;
    public length: number = 0;

    append(value: T): void {
        const newNode: DLNode<T> = { value, next: null, prev: null };

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            if (this.tail) this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    remove(value: T): boolean {
        if (!this.head) return false;

        let current: DLNode<T> | null = this.head;

        while (current) {
            if (current.value === value) {
                if (current.prev) current.prev.next = current.next;
                else this.head = current.next;

                if (current.next) current.next.prev = current.prev;
                else this.tail = current.prev;

                this.length--;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    find(value: T): DLNode<T> | null {
        let current = this.head;

        while (current) {
            if (current.value === value) return current;
            current = current.next;
        }

        return null;
    }

    print(): T[] {
        const values: T[] = [];
        let current = this.head;
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        return values;
    }
}
