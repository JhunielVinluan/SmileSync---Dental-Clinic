// controllers/schedule.ts
import { Request, Response } from "express";
import {
    createSchedule,
    getSchedules,
    getScheduleById,
    updateScheduleById,
    deleteScheduleById,
} from "@/services/schedule";

// Create a new schedule
export const createScheduleController = async (req: Request, res: Response) => {
    try {
        const { doctorId, day, startTime, duration } = req.body;

        // Validate required fields
        if (!doctorId || !day || !startTime || !duration) {
            return res.status(400).json({
                message: "Missing required fields: doctorId, day, startTime, and/or duration",
            });
        }

        const newSchedule = await createSchedule({ doctorId, day, startTime, duration });
        return res.status(201).json(newSchedule);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Get all schedules
export const getScheduleController = async (req: Request, res: Response) => {
    try {
        const schedules = await getSchedules();
        return res.status(200).json(schedules);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Get a single schedule by ID
export const getOneScheduleController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const schedule = await getScheduleById(id);
        if (!schedule) {
            return res.status(404).json({ message: `Schedule not found with ID ${id}` });
        }
        return res.status(200).json(schedule);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Update a schedule by ID
export const updateScheduleController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { doctorId, day, startTime, duration } = req.body;

        // Validate required fields
        if (!doctorId || !day || !startTime || !duration) {
            return res.status(400).json({
                message: "Missing required fields: doctorId, day, startTime, and/or duration",
            });
        }

        const updatedSchedule = await updateScheduleById(id, { doctorId, day, startTime, duration });
        if (!updatedSchedule) {
            return res.status(404).json({ message: `Schedule not found with ID ${id}` });
        }
        return res.status(200).json(updatedSchedule);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Delete a schedule by ID
export const deleteScheduleController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedSchedule = await deleteScheduleById(id);
        if (!deletedSchedule) {
            return res.status(404).json({ message: `Schedule not found with ID ${id}` });
        }
        return res.status(200).json({ message: `Schedule with ID ${id} deleted successfully` });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};
