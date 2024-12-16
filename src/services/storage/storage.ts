export class Storage {
    private storageTypes = ['localStorage', 'sessionStorage', 'indexedDB'] as const;

    constructor(private db: string = 'DB', private store: string = 'general') { }

    public async setItem(key: string, value: any, storageType: Storage['storageTypes'][number] = 'localStorage') {
        this.checkType(storageType);
        switch (storageType) {
            case 'localStorage':
            case 'sessionStorage':
                window[storageType].setItem(key, JSON.stringify(value));
                break;
            case 'indexedDB':
                const [store, tx] = await this.getStore();
                store.put(value, key);
                await tx;
                break;
            default:
                throw new Error(`Failed to set item: ${key}`);
        }
    }

    public async getItem(key: string, storageType: Storage['storageTypes'][number] = 'localStorage') {
        this.checkType(storageType);
        let result: any;
        switch (storageType) {
            case 'localStorage':
            case 'sessionStorage':
                result = window[storageType].getItem(key);
                return result ?? JSON.parse(result);
            case 'indexedDB':
                const [store] = await this.getStore();
                const request: IDBRequest = store.get(key);
                result = await new Promise((res) => {
                    request.onsuccess = () => res(request.result);
                    request.onerror = () => res(null);
                });
                return result;
            default:
                throw new Error(`Failed to get item: ${key}`);
        }
    }

    public async removeItem(key: string, storageType: Storage['storageTypes'][number] = 'localStorage') {
        this.checkType(storageType);
        switch (storageType) {
            case 'localStorage':
            case 'sessionStorage':
                window[storageType].removeItem(key);
                break;
            case 'indexedDB':
                const [store, tx] = await this.getStore();
                store.delete(key);
                await tx;
                break;
            default:
                throw new Error(`Failed to remove item: ${key}`);
        }
    }

    private checkType(storageType: Storage['storageTypes'][number]) {
        if (!this.storageTypes.includes(storageType)) throw new Error(`Invalid storage type: ${storageType}`);
    }

    private async getStore(): Promise<[IDBObjectStore, IDBTransaction]> {
        const db: IDBDatabase = await this.openDB(this.db, 1);
        const tx: IDBTransaction = db.transaction(this.store, 'readwrite');
        const store: IDBObjectStore = tx.objectStore(this.store);
        return [store, tx];
    }

    private async openDB(name: string, version?: number): Promise<IDBDatabase> {
        return new Promise((res, rej) => {
            const request = indexedDB.open(name, version);
            request.onsuccess = () => res(request.result);
            request.onerror = () => rej(request.error);
        });
    }
}