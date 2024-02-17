import {ReactNode} from "react";
import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";

export function truncateString(input: string, maxLength: number = 50): string {
    if (input.length <= maxLength) {
        return input;
    }

    let truncated = input.substring(0, maxLength + 1).trim();
    let lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex === -1 || lastSpaceIndex < maxLength * 0.8) { // Adjust 0.8 (80%) threshold as needed
        truncated = truncated.substring(0, maxLength);
    } else {
        truncated = truncated.substring(0, lastSpaceIndex);
    }

    return `${truncated}...`;
}

export function nodeToString(node: ReactNode): string {
    const div = document.createElement("div");
    const root = createRoot(div);
    flushSync(() => root.render(node));
    return div.innerText; // or innerHTML or textContent
};
