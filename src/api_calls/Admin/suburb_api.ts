import { admin } from "../../client";

export const editSuburb = async (id: string, price: number) => {
  try {
    const { data } = await admin.put(`/edit-suburb/${id}`, { price });
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
