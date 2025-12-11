import { useState, useCallback } from "react";

export type StepStatus = "active" | "completed" | "upcoming";

export interface ProgressStep {
    id: number;
    title: string;
    status: StepStatus;
}

const initialSteps: ProgressStep[] = [
    { id: 1, title: "Name", status: "active" },
    { id: 2, title: "Contact", status: "upcoming" },
    { id: 3, title: "Reference Image", status: "upcoming" },
    { id: 4, title: "Note (Optional)", status: "upcoming" },
];

export const useStepProgress = () => {
    const [progressSteps, setProgressSteps] = useState<ProgressStep[]>(initialSteps);

    const updateStepStatus = useCallback((formValues: {
        buyerName?: string;
        contact?: string;
        referenceImages?: any[];
        note?: string;
    }) => {
        setProgressSteps(prev => {
            const newSteps = [...prev];
            const { buyerName, contact, referenceImages, note } = formValues;

            if (buyerName?.trim()) {
                newSteps[0] = { ...newSteps[0], status: "completed" };
                if (newSteps[1].status !== "completed") {
                    newSteps[1] = { ...newSteps[1], status: "active" };
                }
            } else {
                newSteps[0] = { ...newSteps[0], status: "active" };
                newSteps[1] = { ...newSteps[1], status: "upcoming" };
                newSteps[2] = { ...newSteps[2], status: "upcoming" };
                newSteps[3] = { ...newSteps[3], status: "upcoming" };
                return newSteps;
            }

            if (contact?.trim()) {
                newSteps[1] = { ...newSteps[1], status: "completed" };
                if (newSteps[2].status !== "completed") {
                    newSteps[2] = { ...newSteps[2], status: "active" };
                }
            } else {
                newSteps[1] = { ...newSteps[1], status: "active" };
                newSteps[2] = { ...newSteps[2], status: "upcoming" };
                newSteps[3] = { ...newSteps[3], status: "upcoming" };
                return newSteps;
            }

            if (referenceImages && referenceImages.length > 0) {
                newSteps[2] = { ...newSteps[2], status: "completed" };
                if (newSteps[3].status !== "completed") {
                    newSteps[3] = { ...newSteps[3], status: "active" };
                }
            } else {
                newSteps[2] = { ...newSteps[2], status: "active" };
                newSteps[3] = { ...newSteps[3], status: "upcoming" };
                return newSteps;
            }

            if (note?.trim()) {
                newSteps[3] = { ...newSteps[3], status: "completed" };
            } else {
                newSteps[3] = { ...newSteps[3], status: "active" };
            }

            return newSteps;
        });
    }, []);

    const markAllCompleted = useCallback(() => {
        setProgressSteps(prev =>
            prev.map(step => ({ ...step, status: "completed" }))
        );
    }, []);

    const resetProgress = useCallback(() => {
        setProgressSteps(initialSteps);
    }, []);

    return {
        progressSteps,
        updateStepStatus,
        markAllCompleted,
        resetProgress,
    };
};