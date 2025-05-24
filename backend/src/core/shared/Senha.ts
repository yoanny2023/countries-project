import bcrypt from "bcrypt"

export default class Senha{

  static async encrypt(password:string): Promise<string>{
    const saltRound = 10;
    const encryptPassword = await bcrypt.hash(password,saltRound);
    return encryptPassword;
  }

  static async comparePassword(password:string,hashedPassword:string):Promise<boolean>{
   const equalPassword  = await bcrypt.compare(password,hashedPassword);
   return equalPassword;
  }
}