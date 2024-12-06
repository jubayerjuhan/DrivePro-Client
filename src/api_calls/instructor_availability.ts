import React from "react";
import { client } from "../client";

type Availability = {
  day: string;
  slots: Array<{ startTime: string; endTime: string }>;
};

interface AvailabilitySuccessResponse {
  data: {
    availability: Availability[];
  };
}

// setting the type of set availability = useState params
type SetInstructorAvailabilities = React.Dispatch<React.SetStateAction<Availability[]>>;

export const fetchInstructorAvailabilities = async (
  instructorId: string,
  setinstructorAvailabilities: SetInstructorAvailabilities
) => {
  try {
    const { data }: AvailabilitySuccessResponse = await client.get(`instructor/${instructorId}/get-availability`);

    setinstructorAvailabilities(data.availability);
  } catch (error) {
    setinstructorAvailabilities([]);
  }
};

// set instructor availability

export const saveInstructorAvailability = async (instructorId: string, slots: any, removedSlots: any[]) => {
  try {
    const { data } = await client.post(`instructor/${instructorId}/set-availability`, { slots, removedSlots });
    return true;
  } catch (error) {
    return false;
  }
};
