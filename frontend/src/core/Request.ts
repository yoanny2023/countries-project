//make request to backend
export default class Request {

static headers: any = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",  // enable cors from different origin.
};

static port = 4000;
static baseUrl = `http://localhost:${this.port}`;

static async generalRerest(method:string,urlComplement:string,bodyData?:any){
  try {
      const response = await fetch(`${this.baseUrl}${urlComplement}`,{
      method:method,
      headers:Request.headers,
      body:JSON.stringify(bodyData)
    });

    const result = await response.json();
    return result
  } catch (error) {
    return error;
  }
}

static async get(urlComplement:string){
  const result = await Request.generalRerest("GET",urlComplement);
  return result;
}
}