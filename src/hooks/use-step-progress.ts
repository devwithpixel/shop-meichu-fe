import { useState, useCallback } from "react";

export type StepStatus = "active" | "completed" | "upcoming";

export interface ProgressStep {
    id: number;
    title: string;
    status: StepStatus;
}

export const useStepProgress = () => {
    const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([
        { id: 1, title: "Personal Details", status: "active" },
        { id: 2, title: "Reference Image", status: "upcoming" },
        { id: 3, title: "Additional Note", status: "upcoming" },
        { id: 4, title: "Confirmation", status: "upcoming" },
    ]);

    const updateStepStatus = useCallback((formValues: {
        buyerName?: string;
        contact?: string;
        referenceImages?: any[];
        note?: string;
    }) => {
        setProgressSteps(prev => {
            const newSteps = [...prev];
            const { buyerName, contact, referenceImages, note } = formValues;

            const currentData = {
                buyerName: prev[0].status === "completed" ? "filled" : "empty",
                contact: prev[0].status === "completed" ? "filled" : "empty",
                hasImages: prev[1].status === "completed",
                hasNote: prev[2].status === "completed",
            };

            const newData = {
                buyerName: buyerName?.trim() && contact?.trim() ? "filled" : "empty",
                contact: buyerName?.trim() && contact?.trim() ? "filled" : "empty",
                hasImages: referenceImages && referenceImages.length > 0,
                hasNote: note?.trim() ? true : false,
            };

            if (
                currentData.buyerName === newData.buyerName &&
                currentData.contact === newData.contact &&
                currentData.hasImages === newData.hasImages &&
                currentData.hasNote === newData.hasNote
            ) {
                return prev;
            }

            // Step 1: Personal Details
            if (buyerName?.trim() && contact?.trim()) {
                newSteps[0] = { ...newSteps[0], status: "completed" };
                newSteps[1] = { ...newSteps[1], status: "active" };
            } else {
                newSteps[0] = { ...newSteps[0], status: "active" };
                newSteps[1] = { ...newSteps[1], status: "upcoming" };
            }

            // Step 2: Reference Image
            if (referenceImages && referenceImages.length > 0) {
                newSteps[1] = { ...newSteps[1], status: "completed" };
                newSteps[2] = { ...newSteps[2], status: "active" };
            } else if (newSteps[0].status === "completed") {
                newSteps[1] = { ...newSteps[1], status: "active" };
                newSteps[2] = { ...newSteps[2], status: "upcoming" };
            } else {
                newSteps[2] = { ...newSteps[2], status: "upcoming" };
            }

            // Step 3: Additional Note (optional)
            if (newSteps[1].status === "completed") {
                newSteps[2] = { ...newSteps[2], status: "active" };
                if (note?.trim()) {
                    newSteps[2] = { ...newSteps[2], status: "completed" };
                }
            }

            // Step 4: Confirmation upcoming
            newSteps[3] = { ...newSteps[3], status: "upcoming" };

            return newSteps;
        });
    }, []);

    const markAllCompleted = useCallback(() => {
        setProgressSteps(prev =>
            prev.map(step => ({ ...step, status: "completed" }))
        );
    }, []);

    const setConfirmationActive = useCallback(() => {
        setProgressSteps(prev => {
            const newSteps = [...prev];
            newSteps[3] = { ...newSteps[3], status: "active" };
            return newSteps;
        });
    }, []);

    const resetConfirmation = useCallback(() => {
        setProgressSteps(prev => {
            const newSteps = [...prev];
            newSteps[3] = { ...newSteps[3], status: "upcoming" };
            return newSteps;
        });
    }, []);

    return {
        progressSteps,
        updateStepStatus,
        markAllCompleted,
        setConfirmationActive,
        resetConfirmation,
    };
};