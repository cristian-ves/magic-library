interface BPlusTreeNode<T> {
    keys: string[];
    children?: BPlusTreeNode<T>[];
    isLeaf: boolean;
    values?: T[][];
    next?: BPlusTreeNode<T>;
}

export class BPlusTree<T> {
    private root: BPlusTreeNode<T>;
    private order: number;

    constructor(order: number = 4) {
        this.order = order;
        this.root = { keys: [], children: [], isLeaf: true, values: [] };
    }

    private findLeaf(node: BPlusTreeNode<T>, key: string): BPlusTreeNode<T> {
        if (node.isLeaf) return node;
        for (let i = 0; i < node.keys.length; i++) {
            if (key < node.keys[i])
                return this.findLeaf(node.children![i], key);
        }
        return this.findLeaf(node.children![node.children!.length - 1], key);
    }

    insert(key: string, book: T): void {
        const rootSplit = this._insert(this.root, key, book);
        if (rootSplit) {
            this.root = {
                keys: [rootSplit.key],
                children: [this.root, rootSplit.newNode],
                isLeaf: false,
            };
        }
    }

    private _insert(
        node: BPlusTreeNode<T>,
        key: string,
        value: T
    ): { key: string; newNode: BPlusTreeNode<T> } | null {
        if (node.isLeaf) {
            let i = 0;
            while (i < node.keys.length && node.keys[i] < key) i++;
            if (node.keys[i] === key) node.values![i].push(value);
            else {
                node.keys.splice(i, 0, key);
                node.values!.splice(i, 0, [value]);
            }
            if (node.keys.length > this.order - 1) return this.splitLeaf(node);
            return null;
        } else {
            let i = 0;
            while (i < node.keys.length && key >= node.keys[i]) i++;
            const child = node.children![i];
            const split = this._insert(child, key, value);
            if (split) {
                node.keys.splice(i, 0, split.key);
                node.children!.splice(i + 1, 0, split.newNode);
                if (node.keys.length > this.order - 1)
                    return this.splitInternal(node);
            }
            return null;
        }
    }

    private splitLeaf(leaf: BPlusTreeNode<T>) {
        const mid = Math.ceil(leaf.keys.length / 2);
        const newLeaf: BPlusTreeNode<T> = {
            keys: leaf.keys.splice(mid),
            values: leaf.values!.splice(mid),
            isLeaf: true,
            children: [],
        };
        newLeaf.next = leaf.next;
        leaf.next = newLeaf;
        return { key: newLeaf.keys[0], newNode: newLeaf };
    }

    private splitInternal(node: BPlusTreeNode<T>) {
        const mid = Math.floor(node.keys.length / 2);
        const promotedKey = node.keys[mid];
        const newInternal: BPlusTreeNode<T> = {
            keys: node.keys.splice(mid + 1),
            children: node.children!.splice(mid + 1),
            isLeaf: false,
        };
        node.keys.splice(mid, 1);
        return { key: promotedKey, newNode: newInternal };
    }

    search(key: string): T[] | null {
        const leaf = this.findLeaf(this.root, key);
        const i = leaf.keys.indexOf(key);
        return i !== -1 ? leaf.values![i] : null;
    }

    traverse(): T[] {
        let node: BPlusTreeNode<T> = this.root;
        while (!node.isLeaf) node = node.children![0];
        const result: T[] = [];
        while (node) {
            for (const books of node.values!) result.push(...books);
            node = node.next!;
        }
        return result;
    }

    delete(key: string, book?: T): boolean {
        const leaf = this.findLeaf(this.root, key);
        const i = leaf.keys.indexOf(key);
        if (i === -1) return false;
        if (book) {
            const idx = leaf.values![i].indexOf(book);
            if (idx !== -1) leaf.values![i].splice(idx, 1);
            if (leaf.values![i].length > 0) return true;
        }
        leaf.keys.splice(i, 1);
        leaf.values!.splice(i, 1);
        return true;
    }
}
