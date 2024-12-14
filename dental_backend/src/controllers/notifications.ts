import { Request, Response } from "express";
import {
    createNotification,
    getNotifications,
    getNotificationById,
    updateNotificationById,
    deleteNotificationById,
    deleteData,
} from "@/services/notifications";

// Create a new notification
export const createNotificationController = async (req: Request, res: Response) => {
    try {
        const { userId, title, description } = req.body;

        if (!userId || !title || !description) {
            return res.status(400).json({
                message: "Missing required fields: userId, title, or description",
            });
        }

        const newNotification = await createNotification({ userId, title, description });
        return res.status(201).json(newNotification);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Get all notifications
export const getNotificationsController = async (_req: Request, res: Response) => {
    try {
        const notifications = await getNotifications();
        return res.status(200).json(notifications);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Get a single notification by ID
export const getNotificationController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await getNotificationById(id);

        if (!notification) {
            return res.status(404).json({ message: `Notification not found with ID ${id}` });
        }

        return res.status(200).json(notification);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Update a notification by ID
export const updateNotificationController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId, title, description } = req.body;

        if (!userId || !title || !description) {
            return res.status(400).json({
                message: "Missing required fields: userId, title, or description",
            });
        }

        const updatedNotification = await updateNotificationById(id, { userId, title, description });
        if (!updatedNotification) {
            return res.status(404).json({ message: `Notification not found with ID ${id}` });
        }

        return res.status(200).json(updatedNotification);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Delete a notification by ID
export const deleteNotificationController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedNotification = await deleteNotificationById(id);

        if (!deletedNotification) {
            return res.status(404).json({ message: `Notification not found with ID ${id}` });
        }

        return res.status(200).json({ message: `Notification with ID ${id} deleted successfully` });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

export const deleteAllDataController = async (req: Request, res: Response) => {
    try {
        const deletedNotification = await deleteData();
        if (!deletedNotification) {
            return res.status(404).json({ message: `Failed to delete all data` });
        }
        return res.status(200).json({ message: `All data deleted successfully` });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};
