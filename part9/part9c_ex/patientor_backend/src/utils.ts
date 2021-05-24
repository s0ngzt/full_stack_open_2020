import { Gender, NewPatientEntry } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateofBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing weather: " + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: object.name,
    dateOfBirth: parseDateofBirth(object.dateOfBirth),
    ssn: object.ssn,
    gender: parseGender(object.gender),
    occupation: object.occupation,
  };
};

export default toNewPatientEntry;
