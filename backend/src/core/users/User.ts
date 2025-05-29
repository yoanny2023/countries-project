import ID from "../shared/Id";

export default class User{
  id:string;
  name:string;
  email:string;
  password:string;

  constructor(name:string,email:string,password:string){
    this.id = ID.newId();
    this.name = name;
    this.email = email;
    this.password = password
  }
}