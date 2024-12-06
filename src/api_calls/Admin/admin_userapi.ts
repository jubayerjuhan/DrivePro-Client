import { admin } from "../../client";

export const getSingleUserAdmin = async (id: any) => {
  try {
    const { data } = await admin.get(`user/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
export const getSingleInstructorAdmin = async (id: any) => {
  try {
    const { data } = await admin.get(`instructor/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
export const getSingleBookingAdmin = async (id: any) => {
  try {
    const { data } = await admin.get(`booking/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const adminEditUser = async (id: string, edits: any) => {
  try {
    const { data } = await admin.put(`user/${id}`, edits);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
export const deleteUserAdmin = async (id: any) => {
  try {
    const { data } = await admin.delete(`user/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
