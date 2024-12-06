import { admin } from "../../client";

export const addCar = async (car: any) => {
  try {
    const { data } = await admin.post("/add-car", car);
    return data.success;
  } catch (error) {
    return false;
  }
};
export const getAllCars = async () => {
  try {
    const { data } = await admin.get("/all-cars");
    return data;
  } catch (error: any) {
    return { success: false, message: error.response.data.message };
  }
};
