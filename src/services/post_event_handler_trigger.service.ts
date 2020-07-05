import { POST_EVENT_HANDLER_ENDPOINT, POST_EVENT_HANDLER_ENDPOINT_TOKEN } from "../../consts"
import { IEventEnriched } from "../interfaces/event.interface"
import get from "axios"
import { IPostEventHandlerTrigger } from "../interfaces/post_event_handler_trigger.service.interface";

/**
 * A service for communicating the compile and runtime results from the .asm file that was submitted. 
 */
export class PostEventHandlerTrigger implements IPostEventHandlerTrigger {
  
    url: string
    token: string
  
    /**
     * Initializing the class
     * url - the endpoint url for communicating the results
     * token - private token for authentication
     */ 
    constructor () {
      this.url = POST_EVENT_HANDLER_ENDPOINT
      this.token = POST_EVENT_HANDLER_ENDPOINT_TOKEN
    }
  
    /**
     * Private builder for the payload params to be sent out
     */
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
  
    /**
     * The only public method, sends out the events by the given paramerts
     */
    public trigger = (event: IEventEnriched) => {
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