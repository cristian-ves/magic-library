// O(log n) for insert, search, and delete due to AVL balancing
// O(n) for in-order traversal to produce the sorted list
// Chosen to store books by title efficiently while keeping them sorted

interface AVLNode<T> {
    key: string;
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
        return node ? this.height(node.left) - this.height(node.right) : 0;
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

    insert(key: string, value: T): void {
        this.root = this._insert(this.root, key, value);
    }

    private _insert(
        node: AVLNode<T> | null,
        key: string,
        value: T
    ): AVLNode<T> {
        if (!node) return { key, value, left: null, right: null, height: 1 };

        if (key < node.key) node.left = this._insert(node.left, key, value);
        else if (key > node.key)
            node.right = this._insert(node.right, key, value);
        else node.value = value; // overwrite if key exists

        node.height =
            1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.getBalance(node);

        // Left Left
        if (balance > 1 && key < node.left!.key) return this.rotateRight(node);
        // Right Right
        if (balance < -1 && key > node.right!.key) return this.rotateLeft(node);
        // Left Right
        if (balance > 1 && key > node.left!.key) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        // Right Left
        if (balance < -1 && key < node.right!.key) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    search(key: string): T | null {
        let node = this.root;
        while (node) {
            if (key === node.key) return node.value;
            node = key < node.key ? node.left : node.right;
        }
        return null;
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

    delete(key: string): void {
        this.root = this._delete(this.root, key);
    }

    private _delete(node: AVLNode<T> | null, key: string): AVLNode<T> | null {
        if (!node) return null;

        if (key < node.key) node.left = this._delete(node.left, key);
        else if (key > node.key) node.right = this._delete(node.right, key);
        else {
            // Node with only one child or no child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Node with two children: Get inorder successor (smallest in right subtree)
            let temp = node.right;
            while (temp.left) temp = temp.left;

            node.key = temp.key;
            node.value = temp.value;
            node.right = this._delete(node.right, temp.key);
        }

        node.height =
            1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.getBalance(node);

        // Balance the tree
        // Left Left
        if (balance > 1 && this.getBalance(node.left) >= 0)
            return this.rotateRight(node);
        // Left Right
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        // Right Right
        if (balance < -1 && this.getBalance(node.right) <= 0)
            return this.rotateLeft(node);
        // Right Left
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }
}
