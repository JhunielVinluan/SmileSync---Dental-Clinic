import { SurgicalModel } from "@/models/surgical";
import {
  BaseParameter,
  CreateSurgicalParameter,
  UpdateSurgicalParameter,
} from "../interface/services";

export const getSurgical = async () => {
  return await SurgicalModel.find({});
};

export const getOneSurgical = async ({ id }: BaseParameter) => {
  return await SurgicalModel.findById(id);
};

export const createSurgical = async ({
  name,
  description,
  status,
}: CreateSurgicalParameter) => {
  const data = {
    name,
    description,
    status,
  };
  return await SurgicalModel.create(data);
};

export const updateOneSurgical = async ({
  id,
  name,
  description,
  status,
}: UpdateSurgicalParameter) => {
  const data = {
    name,
    description,
    status,
  };
  return await SurgicalModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteOneSurgical = async ({ id }: BaseParameter) => {
  return await SurgicalModel.findByIdAndDelete(id);
};
