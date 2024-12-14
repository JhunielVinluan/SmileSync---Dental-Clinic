// services/prescription.ts
import { PrescriptionModel } from "@/models/prescription";
import mongoose from "mongoose";

// Create a new prescription
export const createPrescription = async (data: any) => {
  return await PrescriptionModel.create(data);
};

// Get a single prescription by ID
export const getPrescriptionById = async (id: string) => {
  return await PrescriptionModel.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'UserInfo',
      },
    },
    {
      $unwind: {
        path: "$UserInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        userFullName: {
          $trim: { // Ensures clean spacing even if middleName is missing
            input: {
              $concat: [
                "$UserInfo.firstName", " ",
                { $ifNull: ["$UserInfo.middleName", ""] }, " ",
                "$UserInfo.lastName"
              ]
            }
          }
        },
        userAge: "$UserInfo.age",
        userImage: "$UserInfo.userImage.secure_url",
        userGender: "$UserInfo.gender",
        userAddress: "$UserInfo.address",
      }
    },
    {
      $project: {
        _id: 1,
        notes: 1,
        medicine: 1,
        createdAt: 1,
        dateVisit: 1,
        updatedAt: 1,
        appointmentId: 1,
        userFullName: 1,
        userAge: 1,
        userGender: 1,
        userAddress: 1,
        userImage: 1
      }
    }
  ]);
};

export const getPrescription = async () => {
  return await PrescriptionModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'UserInfo',
      },
    },
    {
      $unwind: {
        path: "$UserInfo",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        userFullName: {
          $trim: { // Ensures clean spacing even if middleName is missing
            input: {
              $concat: [
                "$UserInfo.firstName", " ",
                { $ifNull: ["$UserInfo.middleName", ""] }, " ",
                "$UserInfo.lastName"
              ]
            }
          }
        },
        userAge: "$UserInfo.age",
        userImage: "$UserInfo.userImage.secure_url",
        userGender: "$UserInfo.gender",
        userAddress: "$UserInfo.address"
      }
    },
    {
      $project: {
        _id: 1,
        doctorId: 1,
        dateVisit: 1,
        notes: 1,
        medicine: 1,
        createdAt: 1,
        updatedAt: 1,
        appointmentId: 1,
        userFullName: 1,
        userAge: 1,
        userGender: 1,
        userAddress: 1,
        userImage: 1
      }
    }
  ]);
};

// Update a prescription by ID
export const updatePrescriptionById = async (id: string, data: any) => {
  return await PrescriptionModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a prescription by ID
export const deletePrescriptionById = async (id: string) => {
  return await PrescriptionModel.findByIdAndDelete(id);
};
