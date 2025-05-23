import {v4 as uuidv4} from "uuid";

export default class ID{
  static newId(){
    return uuidv4();
  }
}