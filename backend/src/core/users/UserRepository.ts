import Senha from "../shared/Senha";
import User from "./User";
import fs from "fs/promises";
import { existsSync,copyFileSync } from "fs";
import path from "path";

export default class UserRepository{ 
  private usersPath = path.join(__dirname,"users.json");
  private samplePath = path.join(__dirname, "users.sample.json"); // testfile.

  private async loadUsers():Promise<User[]>{
    try {
      if (!existsSync(this.usersPath)) {
        console.warn("users.json not found. Creating from sample...");
        copyFileSync(this.samplePath, this.usersPath);
      }
      const data = await fs.readFile(this.usersPath,"utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async saveUsers(users:User[]):Promise<void>{
    await fs.writeFile(this.usersPath, JSON.stringify(users,null,2))
  }

  async registerUser(name:string,email:string,plainPassword:string):Promise<boolean>{
    const users:User[] = await this.loadUsers();
    
   const alreadyExists = users.find(user => user.email === email);
    if(alreadyExists) return false;

    const hashedPassword = await Senha.encrypt(plainPassword);
    const newUser = new User(name,email,hashedPassword)
    users.push(newUser);
    await this.saveUsers(users);
    return true;
  }

 async userExists(email:string):Promise<boolean>{
   const users = await this.loadUsers();
   return users.some(user => user.email === email);
  }

  async loginIsCorrect(email:string,plainPassword:string):Promise<boolean>{
    const users = await this.loadUsers();
    const user = users.find(user => user.email === email);

    if (!user){
      return false;
    }
   const result = await Senha.comparePassword(plainPassword,user.password);
    console.log("✅ Password match result:", result);
     return result;
  }

  async findUserByEmail(email:string):Promise<User | null>{
    const users = await this.loadUsers();
    const user = users.find(user => user.email === email ) || null;
    return user;
  }
}