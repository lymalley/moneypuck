import { useCallback, useState } from "react";
import useTableHandler from "./useTableHandler";

const closePrintModal = () => {
    const documentPrintWindow = document.getElementById("printModal");

    if (documentPrintWindow) {
        document.body.removeChild(documentPrintWindow);
    }
};

const getPrintModal = () => {
    const printModal = document.createElement("iframe");
    printModal.width = `${document.documentElement.clientWidth}px`;
    printModal.height = `${document.documentElement.clientHeight}px`;
    printModal.style.position = "absolute";
    printModal.style.top = `-${document.documentElement.clientHeight + 100}px`;
    printModal.style.left = `-${document.documentElement.clientWidth + 100}px`;
    printModal.style.background = "red";
    printModal.id = "printModal";
    printModal.srcdoc = "<!DOCTYPE html>";

    return printModal;
};

const startPrint = (printModal, options) => {
    const { documentTitle, onAfterPrint } = options;

    // Some browsers such as Safari don't always behave well without this timeout
    setTimeout(() => {
        if (printModal.contentWindow) {
            printModal.contentWindow.focus();
            if (printModal.contentWindow.print) {
                const tempContentDocumentTitle = printModal.contentDocument?.title ?? "";
                const tempOwnerDocumentTitle = printModal.ownerDocument.title;

                if (documentTitle) {
                    // Print filename in Chrome
                    printModal.ownerDocument.title = documentTitle;

                    // Print filename in Firefox, Safari
                    if (printModal.contentDocument) {
                        printModal.contentDocument.title = documentTitle;
                    }
                }

                printModal.contentWindow.print();

                // Restore the page's original title information
                if (documentTitle) {
                    printModal.ownerDocument.title = tempOwnerDocumentTitle;

                    if (printModal.contentDocument) {
                        printModal.contentDocument.title = tempContentDocumentTitle;
                    }
                }
            }

            window.addEventListener(
                "focus",
                () => {
                    onAfterPrint?.();
                    closePrintModal();
                },
                { once: true }, // Clean up the listener after is it invoked
            );
            // }
        }
    }, 500);
};

const DEFAULT_PAGE_STYLE = `
    @page {
        /* Remove browser default header (title) and footer (url) */
        margin: 0;
    }
    @media print {
        body {
            /* Tell browsers to print background colors */
            color-adjust: exact; /* Firefox. This is an older version of "print-color-adjust" */
            print-color-adjust: exact; /* Firefox/Safari */
            -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
        }
    }
`;

export function usePrint(printRef){
    const [printing, setPrinting] = useState(false)
    const { state } = useTableHandler();
    const { title } = state;

    const handlePrint = useCallback(() => {
        closePrintModal();
        const el = printRef?.current;

        if (!el) {
            console.error("There is nothing to print");
            return;
        }

        const clonedEl = el.cloneNode(true);

        const printModal = getPrintModal();

        setPrinting(true);
        printModal.onload = () => {
            printModal.onload = null;

            const modalDoc = printModal.contentDocument ?? printModal.contentWindow?.document;

            if (modalDoc) {
                modalDoc.body.appendChild(clonedEl);

                const styleEl = modalDoc.createElement("style");

                styleEl.appendChild(modalDoc.createTextNode(DEFAULT_PAGE_STYLE));
                modalDoc.head.appendChild(styleEl);

                const styleAndLinkNodes = document.querySelectorAll(
                    "style, link[rel~='stylesheet'], link[as='style']",
                );
                Array.from(styleAndLinkNodes).map((node, i) => {
                    if (node.tagName.toLowerCase() === "style") {
                        const headEl = modalDoc.createElement(node.tagName);
                        const sheet = node.sheet;
                        if (sheet) {
                            let css = "";
                            const { cssRules } = sheet;
                            Array.from(cssRules).map((rule) => {
                                if (typeof rule.cssText === "string") {
                                    css += `${rule.cssText}\r\n`;
                                }
                            });

                            headEl.setAttribute("id", `el-print-${i}`);
                            headEl.appendChild(modalDoc.createTextNode(css));
                            modalDoc.head.appendChild(headEl);
                        }
                    }
                });
            }

            startPrint(printModal, {
                documentTitle: title,
                onAfterPrint: () => setPrinting(false),
            });
        };
        document.body.appendChild(printModal);
    }, [printRef]);

    return handlePrint;
}

export default usePrint;
