import { PatientModel } from "@/models/patient";
import {
  BaseParameter,
  CreatePatientParameter,
  UpdatePatientParameter,
} from "../interface/services";

export const getPatient = async () => {
  return await PatientModel.find({});
};

export const getOnePatient = async ({ id }: BaseParameter) => {
  return await PatientModel.findById(id);
};

export const createPatient = async ({
  firstName,
  middleName,
  lastName,
  age,
  gender,
  contactNumber,
  address,
  civilStatus,
  linkUserId,
  birthdate,
  email
}: CreatePatientParameter) => {
  const data = {
    firstName,
    middleName,
    lastName,
    age,
    gender,
    contactNumber,
    address,
    civilStatus,
    linkUserId,
    birthdate,
    email
  };
  return await PatientModel.create(data);
};

export const updateOnePatient = async ({
  id,
  firstName,
  middleName,
  lastName,
  age,
  gender,
  contactNumber,
  address,
  civilStatus,
  birthdate,
  email
}: UpdatePatientParameter) => {
  const data = {
    firstName,
    middleName,
    lastName,
    age,
    gender,
    contactNumber,
    address,
    civilStatus,
    birthdate,
    email
  };
  return await PatientModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteOnePatient = async ({ id }: BaseParameter) => {
  return await PatientModel.findByIdAndDelete(id);
};
