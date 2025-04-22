// modules/Storage.ts
export interface Publication {
    id: number;
    username: string;
    title: string;
    image: string;
    dateSent: string; // ISO string (Date.toISOString())
}

const DB_NAME = 'PublicationsDB';
const STORE_NAME = 'publications';
const DB_VERSION = 1;

export default class Storage {
    private db: IDBDatabase | null = null;

    constructor() {
        // init() n'est plus appelée automatiquement
    }

    public async init(): Promise<void> {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        return new Promise<void>((resolve, reject) => {
            request.onerror = (e) => {
                console.error("IndexedDB error:", e);
                reject(e);
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (e) => {
                const db = (e.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                }
            };
        });
    }

    public async addPublication(username: string, title: string, image: string): Promise<void> {
        if (!this.db) return;

        const tx = this.db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);

        const newPublication: Omit<Publication, "id"> = {
            username,
            title,
            image,
            dateSent: new Date().toISOString(), // ⬅️ Date d'envoi ajoutée automatiquement
        };

        store.add(newPublication);
    }

    public async getAllPublications(): Promise<Publication[]> {
        return new Promise((resolve, reject) => {
            if (!this.db) return resolve([]);

            const tx = this.db.transaction(STORE_NAME, "readonly");
            const store = tx.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result as Publication[]);
            request.onerror = () => reject(request.error);
        });
    }

    public async deletePublication(id: number): Promise<void> {
        if (!this.db) return;

        const tx = this.db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.delete(id);
    }
}
