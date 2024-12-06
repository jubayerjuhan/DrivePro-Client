import { client } from "../client";
import { User } from "../typings/reduxTypings";

export const getInstructorBookings = async (id: string) => {
  try {
    const { data } = await client.get(`instructor-bookings?instructor=${id}`);
    return data.bookings;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editInstructor = async (user: User) => {
  try {
    const { data } = await client.put("/edit-instructor", user);
    return data.instructor;
  } catch (error) {
    return false;
  }
};

// update avater
export const instructorUpdateAvater = async (avater: any) => {
  try {
    const { data } = await client.put("/instructor/update-avater", avater);
    return data.instructor;
  } catch (error) {
    return false;
  }
};

// get single instructor

export const getSingleInstructor = async (id: string) => {
  try {
    const { data } = await client.get(`/instructor/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

// add review
export const addReview = async (review: object) => {
  try {
    const { data } = await client.post(`/instructor/review`, review);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

// change instructor availability

export const changeAvailability = async (available: boolean, id: string) => {
  try {
    const { data } = await client.post(`/instructor/change-availability/${id}`, {
      available,
    });
    return data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data.message,
    };
  }
};
