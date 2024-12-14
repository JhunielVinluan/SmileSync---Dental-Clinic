// controllers/prescription.ts
import { Request, Response } from "express";
import {
    createPrescription,
    getPrescriptionById,
    updatePrescriptionById,
    deletePrescriptionById,
    getPrescription,
} from "@/services/prescription";

// Create a new prescription
export const createPrescriptionController = async (req: Request, res: Response) => {
    try {
        const { userId, dateVisit, notes, appointmentId, medicine } = req.body;

        // Validate required fields
        if (!userId || !dateVisit || !notes || !medicine || !appointmentId) {
            return res.status(400).json({
                message: "Missing required fields: userId, date, notes, and/or medicine",
            });
        }

        const newPrescription = await createPrescription({ appointmentId, userId, dateVisit, notes, medicine });
        return res.status(201).json(newPrescription);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Get a single prescription by ID
export const getOnePrescriptionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const prescription = await getPrescriptionById(id);
        // if (!prescription) {
        //     return res.status(200).json({ message: `Prescription not found with ID ${id}` });
        // }
        return res.status(200).json(prescription);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

export const getPrescriptionController = async (req: Request, res: Response) => {
    try {
        const prescription = await getPrescription();
        if (!prescription) {
            return res.status(404).json({ message: `Prescription not found ` });
        }
        return res.status(200).json(prescription);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};


// Update a prescription by ID
export const updatePrescriptionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId, dateVisit, notes, medicine } = req.body;

        // Validate required fields
        if (!userId || !dateVisit || !notes || !medicine) {
            return res.status(400).json({
                message: "Missing required fields: userId, date, notes, and/or medicine",
            });
        }

        const updatedPrescription = await updatePrescriptionById(id, { userId, dateVisit, notes, medicine });
        if (!updatedPrescription) {
            return res.status(404).json({ message: `Prescription not found with ID ${id}` });
        }
        return res.status(200).json(updatedPrescription);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};

// Delete a prescription by ID
export const deletePrescriptionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedPrescription = await deletePrescriptionById(id);
        if (!deletedPrescription) {
            return res.status(404).json({ message: `Prescription not found with ID ${id}` });
        }
        return res.status(200).json({ message: `Prescription with ID ${id} deleted successfully` });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json({ message: err.message });
        }
        console.error(err);
    }
};
