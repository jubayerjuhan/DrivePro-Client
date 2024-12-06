import { client } from "../client";

export const searchInstructor = async (
  postCode: any,
  transmission: any,
  language: any
) => {
  try {
    const { data } = await client.get(
      `/search-instructor/${postCode}/${transmission}${
        language ? "?language=" + language : ""
      }`
    );
    return data.instructors;
  } catch (error) {
    console.log(error);
  }
};
