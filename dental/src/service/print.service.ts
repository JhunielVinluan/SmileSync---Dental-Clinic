import { useRef } from "react";

export const usePrintService = () => {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (printRef.current) {
            // Use a temporary print stylesheet
            const printContent = printRef.current.innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;

            // Reload to restore state
            window.location.reload();
        }
        console.log({ print: true })
    };
    return {

        handlePrint, printRef
    }
}