import {ReactNode} from "react";
import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";

export function nodeToString(node: ReactNode): string {
    const div = document.createElement("div");
    const root = createRoot(div);
    flushSync(() => root.render(node));
    return div.innerText; // or innerHTML or textContent
}
