import { POST_EVENT_HANDLER_ENDPOINT } from "../../consts"
import { IEventEnriched } from "../interfaces/event.interface"
import { now } from "moment"
import { time } from "console"
import get from "axios"

export interface IPostEventHandlerTrigger {
  trigger(event: IEventEnriched): void;
}

export class postEventHandlerTrigger  {
  
    url: string =  POST_EVENT_HANDLER_ENDPOINT
    token: string
  
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
      get(this.url, requestPayload).then(()=> {
        console.log(`get request was sent to ${this.url} with payload: ${JSON.stringify(requestPayload)}.`)
      })
    }
  }