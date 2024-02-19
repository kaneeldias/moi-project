import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    color?: string;
}

export default function Heading(props: Props) {
    const color = props.color || "text-gray-700";

    return (
        <div className={`text-2xl font-bold ${color}`}>
            {props.children}
        </div>
    );
}
