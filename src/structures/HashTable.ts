// O(1) average-case for insert, search, and delete, thanks to hashing distributing keys evenly (17*)
// O(n) worst-case if all keys collide, but unlikely with a good hash function
// Chosen because ISBNs are unique strings and chaining handles collisions efficiently

interface HashEntry {
    key: string;
    value: any;
}

export class HashTable {
    private table: HashEntry[][];
    private size: number;

    constructor(size: number = 100) {
        this.size = size;
        this.table = Array.from({ length: size }, () => []); //initializes subarr for collision
    }

    // personalized hash, creates groups of 2, sums all of them, multiply them and then get's the mod of table size
    private hash(key: string): number {
        const digits = key.replace(/-/g, "");

        let sum = 0;
        for (let i = 0; i < digits.length; i += 2) {
            const group = digits.substring(i, i + 2);
            sum += parseInt(group, 10);
        }

        const hashValue = (sum * 17) % this.size;
        return hashValue;
    }

    set(key: string, value: any): void {
        const index = this.hash(key);
        const chain = this.table[index];

        // colisission
        for (let entry of chain) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }

        chain.push({ key, value });
    }

    get(key: string): any | null {
        const index = this.hash(key);
        const chain = this.table[index];

        for (let entry of chain) {
            if (entry.key === key) return entry.value;
        }

        return null;
    }

    remove(key: string): boolean {
        const index = this.hash(key);
        const chain = this.table[index];

        for (let i = 0; i < chain.length; i++) {
            if (chain[i].key === key) {
                chain.splice(i, 1);
                return true;
            }
        }

        return false;
    }
}
