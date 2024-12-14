// services/treatment.ts
import { TreatmentModel } from "@/models/treatment";
import mongoose from "mongoose";

// Create a new treatment
export const createTreatment = async (data: any) => {
    return await TreatmentModel.create(data);
};

// Get a single treatment by ID
export const getTreatmentById = async (id: string) => {
    return await TreatmentModel.aggregate([
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
                userImage: "$UserInfo.userImage.secure_url"
            }
        },
        {
            $project: {
                _id: 1,
                userId: 1,
                treatment: 1,
                teethNo: 1,
                description: 1,
                appointmentId: 1,
                fees: 1,
                remarks: 1,
                createdAt: 1,
                updatedAt: 1,
                userFullName: 1,
                userImage: 1
            }
        }
    ]);
};


export const getTreatment = async () => {
    return await TreatmentModel.aggregate([
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
                userImage: "$UserInfo.userImage.secure_url"
            }
        },
        {
            $project: {
                _id: 1,
                userId: 1,
                teethNo: 1,
                appointmentId: 1,
                description: 1,
                treatment: 1,
                fees: 1,
                remarks: 1,
                createdAt: 1,
                updatedAt: 1,
                userFullName: 1,
                userImage: 1
            }
        }
    ]);
};


// Update a treatment by ID
export const updateTreatmentById = async (id: string, data: any) => {
    return await TreatmentModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a treatment by ID
export const deleteTreatmentById = async (id: string) => {
    return await TreatmentModel.findByIdAndDelete(id);
};
