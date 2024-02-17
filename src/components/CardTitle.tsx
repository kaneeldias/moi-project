type Props = {
    title: string;
    color?: Color;
    topOffset?: TopOffset;
}

type Color = "blue" | "red" | "green" | "yellow" | "gray";
type TopOffset = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const COLORS = {
    "blue": "bg-blue-700",
    "red": "bg-red-700",
    "green": "bg-green-700",
    "yellow": "bg-yellow-700",
    "gray": "bg-gray-700"
}

const TOP_MARGINS = {
    1: "-mt-1",
    2: "-mt-2",
    3: "-mt-3",
    4: "-mt-4",
    5: "-mt-5",
    6: "-mt-6",
    7: "-mt-7",
    8: "-mt-8",
    9: "-mt-9",
    10: "-mt-10",
}


export function CardTitle(props: Props) {
    const color: Color = props.color ? props.color : "blue";
    const topOffset = props.topOffset ? props.topOffset : 1;

    return (
        <div>
            <div className={`text-lg font-bold m-3 mb-4 ${COLORS[color]} text-white rounded-b-md p-2 ${TOP_MARGINS[topOffset]} w-fit px-7`}>
                {props.title}
            </div>
        </div>
    );
}