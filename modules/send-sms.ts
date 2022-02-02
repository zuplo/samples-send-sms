import { ZuploRequest, ZuploContext } from "@zuplo/runtime";
import { ACCOUNT_SID, TWILIO_AUTH_KEY } from "./constants";


type Body = {
  message: string,
  to: string
}


export default async function (request: ZuploRequest, context: ZuploContext) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`;

  const reqBody = await request.json();

  const body = 
  {
    Body: reqBody.message,
    From: "+14252726418",
    To: reqBody.to,
  }

  const bodyParams = new URLSearchParams(body);

  context.log.info(bodyParams.toString());

  return fetch(url, 
  {
    method:"POST",
    body: bodyParams.toString(),
    headers: {
      "content-type" : "application/x-www-form-urlencoded",
      "Authorization" : "Basic " + btoa(`${ACCOUNT_SID}:${TWILIO_AUTH_KEY}`)
    }
  });
}
    
