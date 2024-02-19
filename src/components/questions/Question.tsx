import {ReactNode} from "react";

type Props = {
    children: ReactNode;
    input: ReactNode;
}

export default function Question(props: Props) {
    return (
        <div className={`mt-5`}>
            <div className={`text-sm`}>
                {props.children}

                <div className={`mt-2`}>
                    {props.input}
                </div>
            </div>
        </div>
    );
}
