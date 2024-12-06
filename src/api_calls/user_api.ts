import { client } from "../client";
import { User } from "../typings/reduxTypings";

export const getCurrentUser = async () => {
  try {
    const { data } = await client.get("/me");
    return data.user;
  } catch (error) {
    return false;
  }
};

// edit user
export const editUser = async (user: User) => {
  try {
    const { data } = await client.put("/edit-user", user);
    return data.user;
  } catch (error) {
    return false;
  }
};

// update avater
export const updateAvater = async (avater: any) => {
  try {
    const { data } = await client.put("/update-avater", avater);
    return data.user;
  } catch (error) {
    return false;
  }
};

// get subrubs
export const getSuburbs = async () => {
  try {
    const { data } = await client.get("/suburbs");
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.success,
    };
  }
};
export const getSingleUser = async (id: string) => {
  try {
    const { data } = await client.get(`/user/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.success,
    };
  }
};

// upload file to server
export const uploadFileToCloud = async (file: any) => {
  const formData = new FormData();
  formData.append("avater", file);

  try {
    const { data } = await client.post("/upload-files", formData);
    return data;
  } catch (err: any) {
    return {
      success: false,
      message: "Can't Upload Image",
    };
  }
};
