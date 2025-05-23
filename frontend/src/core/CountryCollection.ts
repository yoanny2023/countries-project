import Request from "./Request";

export default class CountryCollection {
  async getAll(){
    const result = await Request.get("/countries");
    return result;
  }
}