// services/schedule.ts
import { ScheduleModel } from "@/models/schedule";

// Create a new schedule
export const createSchedule = async (data: any) => {
    return await ScheduleModel.create(data);
};

// Get all schedules
export const getSchedules = async () => {
    return await ScheduleModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'doctorId',
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
                doctorId: 1,
                startTime: 1,
                duration: 1,
                day: 1,
                createdAt: 1,
                updatedAt: 1,
                userFullName: 1,
                userImage: 1
            }
        }
    ]);
};

// Get a single schedule by ID
export const getScheduleById = async (id: string) => {
    return await ScheduleModel.findById(id);
};

// Update a schedule by ID
export const updateScheduleById = async (id: string, data: any) => {
    return await ScheduleModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a schedule by ID
export const deleteScheduleById = async (id: string) => {
    return await ScheduleModel.findByIdAndDelete(id);
};
