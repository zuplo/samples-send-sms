import { RequestContext } from "@zuplo/runtime";
import { ACCOUNT_SID, AUTH_TOKEN} from "./env";
  

type Body = {
  message: string,
  to: string
}


export default async function (context: RequestContext) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`;

  const reqBody = context.body as Body;

  const body = 
  {
    Body: reqBody.message,
    From: "+14252726418",
    To: reqBody.to,
  }

  const bodyParams = new URLSearchParams(body);

  context.logger.info(bodyParams.toString());

  return fetch(url, 
  {
    method:"POST",
    body: bodyParams.toString(),
    headers: {
      "content-type" : "application/x-www-form-urlencoded",
      "Authorization" : "Basic " + Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64') 
    }
  });
}
    