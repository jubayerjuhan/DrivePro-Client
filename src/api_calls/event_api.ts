import { client } from "../client";

export const addClosedEvent = async (event: object) => {
  // return console.log(event);
  try {
    const { data }: { data: AddCloseEventResponse } = await client.post("/instructor/closed-event", event);
    return data.message;
  } catch (error: any) {
    return "There Was a Error Creating The Event";
  }
};

interface AddCloseEventResponse {
  message: string;
  success: boolean;
}
