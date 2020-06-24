import { POST_EVENT_HANDLER_ENDPOINT, POST_EVENT_HANDLER_ENDPOINT_TOKEN } from "../../consts"
import { IEventEnriched } from "../interfaces/event.interface"
import { now } from "moment"
import { time } from "console"
import get from "axios"

export interface IPostEventHandlerTrigger {
  trigger(event: IEventEnriched): void;
}

export class postEventHandlerTrigger  {
  
    url: string =  POST_EVENT_HANDLER_ENDPOINT
    token: string = POST_EVENT_HANDLER_ENDPOINT_TOKEN
  
    private buildRequestPayload = (event: IEventEnriched) => {
      const {userID, taskID, testcaseID, status, id, output} = event
      return {
        params : {
          token: this.token,
          eventID: id,
          userID,
          taskID,
          testcaseID,
          statusCode: status,
          output
        }
      }
    }
  
    trigger = (event: IEventEnriched) => {
      const requestPayload = this.buildRequestPayload(event)
      get(this.url, requestPayload)
        .then((res)=> {
          console.log(`get request was sent to ${this.url} with payload: ${JSON.stringify(requestPayload)}. status: ${res.status}`)
        })
        .catch((e)=> {
          console.log(`get request could not be sent to ${this.url} - ${e}`)
        })
    }
  }