// controllers/treatment.ts
import { Request, Response } from "express";
import {
    createTreatment,
    getTreatmentById,
    updateTreatmentById,
    deleteTreatmentById,
    getTreatment,
} from "@/services/treatment";

// Create a new treatment
export const createTreatmentController = async (req: Request, res: Response) => {
    try {
        const { userId, teethNo, description, treatment, appointmentId, fees, remarks } = req.body;

        // Validate required fields
        if (!userId || !teethNo || !description || !treatment || !appointmentId || !fees || !remarks) {
            return res.status(400).json({
                message: "Missing required fields: userId, teethNo, description, fees, and/or remarks",
            });
        }

        // Proceed with treatment creation
        const newTreatment = await createTreatment({ treatment, appointmentId, userId, teethNo, description, fees, remarks });
        return res.status(201).json(newTreatment);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};


// Get a single treatment by ID
export const getOneTreatmentController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const treatment = await getTreatmentById(id);
        // if (!treatment) {
        //     return res.status(404).json({ message: `Treatment not found with ID ${id}` });
        // }
        return res.status(200).json(treatment);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

export const getTreatmentController = async (req: Request, res: Response) => {
    try {
        const treatment = await getTreatment();
        if (!treatment) {
            return res.status(404).json({ message: `Treatment not found` });
        }
        return res.status(200).json(treatment);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Update a treatment by ID
export const updateTreatmentController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId, teethNo, description, fees, remarks } = req.body;

        // Validate required fields
        if (!userId || !teethNo || !description || !fees || !remarks) {
            return res.status(400).json({
                message: "Missing required fields: userId, teethNo, description, fees, and/or remarks",
            });
        }

        // Proceed with updating the treatment
        const updatedTreatment = await updateTreatmentById(id, { userId, teethNo, description, fees, remarks });
        if (!updatedTreatment) {
            return res.status(404).json({ message: `Treatment not found with ID ${id}` });
        }

        return res.status(200).json(updatedTreatment);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};


// Delete a treatment by ID
export const deleteTreatmentController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTreatment = await deleteTreatmentById(id);
        if (!deletedTreatment) {
            return res.status(404).json({ message: `Treatment not found with ID ${id}` });
        }
        return res.status(200).json({ message: `Treatment with ID ${id} deleted successfully` });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};
