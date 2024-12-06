import { client } from "../client";

export const getRandomNumber = async () => {
  try {
    const { data } = await client.get(
      "https://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1"
    );
    return data[0];
  } catch (error) {
    return null;
  }
};
