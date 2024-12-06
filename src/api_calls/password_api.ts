import { client } from "../client";

export const sendForgetPasswordReq = async (
  email: string,
  instructor: boolean
) => {
  try {
    const { data } = await client.post(
      `/forgot-password${instructor ? "/instructor" : ""}`,
      {
        email,
      }
    );

    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || "Unknown Error",
    };
  }
};

export const sendPasswordResetReq = async (
  token: string,
  newPassword: string,
  instructor: boolean
) => {
  console.log(token);
  try {
    const { data } = await client.post(
      `/reset-password${instructor ? "/instructor" : ""}`,
      {
        token,
        newPassword,
      }
    );

    return {
      success: data.success,
      message: "Password Reset Was Successfull",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || "Unknown Error",
    };
  }
};
