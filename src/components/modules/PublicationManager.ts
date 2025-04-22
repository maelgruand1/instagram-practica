export interface Publication {
    id: number;
    username: string;
    title: string;
    image: string;
    dateSent: string; // ← ISO string pour la sérialisation (optionnellement Date si tu préfères travailler avec des objets)
}

export default class PublicationManager {
    private publications: Publication[] = [];
    private nextId: number = 1;

    create(username: string, title: string, image: string, dateSent: string): Publication {
        const newPub: Publication = {
            id: this.nextId++,
            username,
            title,
            image,
            dateSent, // ← corrigé ici aussi
        };
        this.publications.push(newPub);
        return newPub;
    }

    getAll(): Publication[] {
        return this.publications;
    }

    delete(id: number): void {
        this.publications = this.publications.filter(pub => pub.id !== id);
    }
}
