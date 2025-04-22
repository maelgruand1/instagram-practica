export default class User {
    private id: number;
    private name: string;
    private password: string;

    constructor(id: number, name: string, password: string) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPassword(): string {
        return this.password;
    }

    // Setters
    public setId(userID: number): void {
        this.id = userID;
    }

    public setName(username: string): void {
        this.name = username;
    }

    public setPassword(userPass: string): void {
        this.password = userPass;
    }
}
