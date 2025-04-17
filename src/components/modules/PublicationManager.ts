export interface Publication {
    id: number;
    title: string;
    image: string;
}

export default class PublicationManager {
    private publications: Publication[] = [];
    private nextId: number = 1;

    create(title: string, image: string): Publication {
        const newPub: Publication = {
            id: this.nextId++,
            title,
            image,
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
