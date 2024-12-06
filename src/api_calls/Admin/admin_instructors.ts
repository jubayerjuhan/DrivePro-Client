import { admin } from "../../client";
import { Instructor, Suburb } from "../../typings/instructorTypings";

export const getAllInstructorsAdmin = async () => {
  try {
    const { data } = await admin.get("/all-instructors");
    console.log(data);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
export const getAllExpiredInstructors = async () => {
  try {
    const { data } = await admin.get("/expired-instructors");
    console.log(data);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const adminEditInstructor = async (
  id: string,
  edits: any,
  editedSuburbs: any,
  item: Instructor
) => {
  let suburbs: any[] = [];
  if (edits.carNumber)
    edits = {
      ...edits,
      car: {
        ...item.car,
        numberPlate: edits.carNumber,
      },
    };

  editedSuburbs?.suburbs.forEach((suburb: Suburb) => {
    console.log(suburb, "sub...");
    const customisedSuburb = { name: suburb.suburb, postCode: suburb.postcode };
    suburbs.push(customisedSuburb);
  });

  if (editedSuburbs.suburbs.length > 0)
    edits = {
      ...edits,
      serviceSuburbs: {
        suburbs,
      },
    };

  try {
    const { data } = await admin.put(`instructor/${id}`, edits);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const addInstructorAdmin = async (instructor: any) => {
  try {
    const { data } = await admin.post(`add-instructor`, instructor);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
export const deleteInstructorAdmin = async (instructor: any) => {
  try {
    const { data } = await admin.delete(`instructor/${instructor}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
