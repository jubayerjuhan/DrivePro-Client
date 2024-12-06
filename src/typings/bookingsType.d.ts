import { Suburb } from "./../components/HeroSection/HeroSection";
import { Instructor } from "./instructorTypings";
import { User } from "./reduxTypings";

export interface BookingTypeBack {
  _id: string;
  user: User;
  type?: string;
  reviewed: boolean;
  instructor: Instructor;
  time: {
    from: string;
    to: string;
  };
  duration: number;
  pickupDetails: {
    address: string;
    suburb: Suburb;
    postcode: number;
    state: string;
  };
  status: string;
  createdAt: Date;
}
