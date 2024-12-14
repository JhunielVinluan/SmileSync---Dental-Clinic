import { AppointmentModel } from "@/models/appointment";
import { NotificationModel } from "@/models/notifications";
import { PatientModel } from "@/models/patient";
import { PrescriptionModel } from "@/models/prescription";
import { SurgicalModel } from "@/models/surgical";
import { TreatmentModel } from "@/models/treatment";
import { Types } from "mongoose";

interface NotificationData {
    userId: Types.ObjectId;
    title: string;
    description: string;
}

// Create a new notification
export const createNotification = async (data: NotificationData) => {
    return await NotificationModel.create(data);
};

// Get all notifications
export const getNotifications = async () => {
    return await NotificationModel.find();
};

// Get a single notification by ID
export const getNotificationById = async (id: string) => {
    return await NotificationModel.findById(id);
};

// Update a notification by ID
export const updateNotificationById = async (id: string, data: Partial<NotificationData>) => {
    return await NotificationModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a notification by ID
export const deleteNotificationById = async (id: string) => {
    return await NotificationModel.findByIdAndDelete(id);
};

export const deleteData = async () => {
    await NotificationModel.deleteMany({});
    await PrescriptionModel.deleteMany({});
    await PatientModel.deleteMany({});
    await SurgicalModel.deleteMany({});
    await AppointmentModel.deleteMany({});
    return await TreatmentModel.deleteMany({});
};
