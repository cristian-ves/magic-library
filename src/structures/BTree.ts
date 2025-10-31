// O(log n) for insert, search, and delete due to tree height
// O(n) for traversing all books in order of genres
// Chosen because it maintains sorted order, allows efficient range queries

interface BTreeNode<T> {
    keys: string[];
    values: T[][];
    children: BTreeNode<T>[];
    isLeaf: boolean;
}

export class BTree<T> {
    private root: BTreeNode<T>;
    private order: number;

    constructor(order: number = 4) {
        this.order = order;
        this.root = { keys: [], values: [], children: [], isLeaf: true };
    }

    insert(key: string, value: T) {
        const root = this.root;
        if (root.keys.length === this.order - 1) {
            const newRoot: BTreeNode<T> = {
                keys: [],
                values: [],
                children: [root],
                isLeaf: false,
            };
            this.splitChild(newRoot, 0, root);
            this.root = newRoot;
        }
        this.insertNonFull(this.root, key, value);
    }

    private insertNonFull(node: BTreeNode<T>, key: string, value: T) {
        let i = node.keys.length - 1;
        if (node.isLeaf) {
            while (i >= 0 && key < node.keys[i]) i--;
            if (node.keys[i + 1] === key) node.values[i + 1].push(value);
            else {
                node.keys.splice(i + 1, 0, key);
                node.values.splice(i + 1, 0, [value]);
            }
        } else {
            while (i >= 0 && key < node.keys[i]) i--;
            i++;
            if (!node.children[i]) node.children[i] = this.createEmptyNode();
            if (node.children[i].keys.length === this.order - 1) {
                this.splitChild(node, i, node.children[i]);
                if (key > node.keys[i]) i++;
            }
            this.insertNonFull(node.children[i], key, value);
        }
    }

    private splitChild(
        parent: BTreeNode<T>,
        index: number,
        node: BTreeNode<T>
    ) {
        const t = Math.ceil(this.order / 2);
        const newNode: BTreeNode<T> = {
            keys: node.keys.splice(t),
            values: node.values.splice(t),
            children: node.isLeaf ? [] : node.children.splice(t),
            isLeaf: node.isLeaf,
        };

        const midKey = node.keys.pop()!;
        const midValues = node.values.pop()!;

        parent.keys.splice(index, 0, midKey);
        parent.values.splice(index, 0, midValues);
        parent.children.splice(index + 1, 0, newNode);
    }

    private createEmptyNode(): BTreeNode<T> {
        return { keys: [], values: [], children: [], isLeaf: true };
    }

    search(key: string): T[] | null {
        return this._search(this.root, key);
    }

    private _search(node: BTreeNode<T>, key: string): T[] | null {
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) i++;
        if (i < node.keys.length && key === node.keys[i]) return node.values[i];
        if (node.isLeaf) return null;
        return this._search(node.children[i], key);
    }

    traverse(): T[] {
        const result: T[] = [];
        this._traverse(this.root, result);
        return result;
    }

    private _traverse(node: BTreeNode<T>, result: T[]) {
        for (let i = 0; i < node.keys.length; i++) {
            if (!node.isLeaf) this._traverse(node.children[i], result);
            result.push(...node.values[i]);
        }
        if (!node.isLeaf)
            this._traverse(node.children[node.keys.length], result);
    }

    delete(key: string, book?: T): boolean {
        return this._delete(this.root, key, book);
    }

    private _delete(node: BTreeNode<T>, key: string, book?: T): boolean {
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) i++;
        if (i < node.keys.length && key === node.keys[i]) {
            if (node.isLeaf) {
                if (book) {
                    const idx = node.values[i].indexOf(book);
                    if (idx !== -1) node.values[i].splice(idx, 1);
                    if (node.values[i].length > 0) return true;
                }
                node.keys.splice(i, 1);
                node.values.splice(i, 1);
                return true;
            } else {
                let predNode = node.children[i];
                while (!predNode.isLeaf)
                    predNode = predNode.children[predNode.children.length - 1];
                node.keys[i] = predNode.keys[predNode.keys.length - 1];
                node.values[i] = predNode.values[predNode.values.length - 1];
                return this._delete(node.children[i], node.keys[i]);
            }
        } else if (!node.isLeaf) {
            if (!node.children[i]) return false;
            return this._delete(node.children[i], key, book);
        } else return false;
    }
}
