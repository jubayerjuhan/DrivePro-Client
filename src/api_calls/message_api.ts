import { client } from "../client";

export const getMessages = async (id: string) => {
  try {
    const { data } = await client.get(`convo/get-messages/${id}`);
    return data;
  } catch (error: any) {}
};

export const sendMessageToServer = async (text: string, from: string, type: string, fileName: string, to: string) => {
  try {
    const { data } = await client.post(`convo/add-message`, {
      text,
      from,
      messageType: type,
      fileName,
      to,
    });
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
export const getConversationMessages = async (id: string) => {
  try {
    const { data } = await client.get(`convo/get-messages/${id}`);
    return data;
  } catch (error: any) {}
};

export const getConversations = async () => {
  try {
    const { data } = await client.get("convo/get-conversations");
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const addConversation = async (currentConvo: string) => {
  try {
    const { data } = await client.post("convo/add-conversation", {
      currentConvo,
    });
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
