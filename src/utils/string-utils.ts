import {ReactNode} from "react";
import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";
import {ReactDOMServerEdge} from "next/dist/server/future/route-modules/app-page/vendored/ssr/entrypoints";

export function nodeToString(node: ReactNode): string {
    if (node == null) return ''

    switch (typeof node) {
        case 'string':
        case 'number':
            return node.toString()

        case 'boolean':
            return ''

        case 'object': {
            if (node instanceof Array)
                return node.map(nodeToString).join('')

            if ('props' in node)
                return nodeToString(node.props.children)
        } // eslint-ignore-line no-fallthrough

        default:
            console.warn('Unresolved `node` of type:', typeof node, node)
            return ''
    }
}

export function truncateString(str: string, num: number) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}
