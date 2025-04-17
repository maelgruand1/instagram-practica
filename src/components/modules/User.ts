export default class User{
    private id : number;
    private name : string;
    private password : string;

    constructor(id : number, name : string, password : string){
        this.id = id;
        this.name = name;
        this.password = password;
    }
    
    // Get user
    public get getId() : number {
        return this.id   
    }
    public get getName() : string {
        return this.name;
    }
    public get getPassword() : string {
        return this.password;
    }
    // Set user
    public set setId(userID : number) {
        this.id = userID;
    }
    
    public set setName(username : string) {
        this.name = username;
    }
    
    public set userPassword(userPass : string) {
        this.password = userPass;
    }
    
}


