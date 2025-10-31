// O(log n) for insert, search, and delete due to AVL balancing
// O(n) for in-order traversal to produce the sorted list
// Chosen to store books by title efficiently while keeping them sorted

interface AVLNode<T> {
    value: T;
    left: AVLNode<T> | null;
    right: AVLNode<T> | null;
    height: number;
}

export class AVLTree<T> {
    private root: AVLNode<T> | null = null;

    private height(node: AVLNode<T> | null): number {
        return node ? node.height : 0;
    }

    private getBalance(node: AVLNode<T> | null): number {
        if (!node) return 0;
        return this.height(node.left) - this.height(node.right);
    }

    private rotateRight(y: AVLNode<T>): AVLNode<T> {
        const x = y.left!;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        return x;
    }

    private rotateLeft(x: AVLNode<T>): AVLNode<T> {
        const y = x.right!;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        return y;
    }

    insert(value: T): void {
        this.root = this._insert(this.root, value);
    }

    private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> {
        if (!node) {
            return { value, left: null, right: null, height: 1 };
        }

        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } else {
            return node;
        }

        node.height =
            1 + Math.max(this.height(node.left), this.height(node.right));

        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node.left!.value) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right!.value) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left!.value) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right!.value) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    inOrder(): T[] {
        const result: T[] = [];
        this._inOrder(this.root, result);
        return result;
    }

    private _inOrder(node: AVLNode<T> | null, result: T[]): void {
        if (!node) return;
        this._inOrder(node.left, result);
        result.push(node.value);
        this._inOrder(node.right, result);
    }

    binarySearch(value: T): boolean {
        return this._binarySearch(this.root, value);
    }

    private _binarySearch(node: AVLNode<T> | null, value: T): boolean {
        if (!node) return false;
        if (value === node.value) return true;
        return value < node.value
            ? this._binarySearch(node.left, value)
            : this._binarySearch(node.right, value);
    }
}
