import { client } from "../client";

export const applyAsInstructor = async (instructor: object) => {
  try {
    const { data } = await client.post("/apply-instructor", instructor);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
