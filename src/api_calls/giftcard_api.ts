import { toast } from "material-react-toastify";
import { client } from "../client";

export const createGiftCard = async (
  amount: any,
  from: any,
  to: any,
  navigate: any
) => {
  const giftcard = { amount, from, to };
  try {
    const { data } = await client.post("/create-giftcard", giftcard);
    if (data.success)
      return navigate("/giftcard-success", { state: { giftcard } });
    // (window.location.href = );
  } catch (error: any) {
    toast.error(error.response.data.message);
    return {
      message: error.response.data.message,
    };
  }
};
export const validateGiftCard = async (code: string) => {
  try {
    const { data } = await client.get(`/validate-giftcard/${code}`);
    if (data.success) return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
export const deleteGiftCard = async (id: string) => {
  try {
    const { data } = await client.delete(`/delete-giftcard/${id}`);
    if (data.success) return true;
  } catch (error: any) {
    return false;
  }
};
