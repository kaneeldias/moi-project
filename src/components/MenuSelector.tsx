type Props = {
    setActivePage: (page: string) => void;
    currentActivePage: string;
    name: string;
}

export function MenuSelector(props: Props) {
    return (
        <div
            className={`w-96 p-3 font-bold ${props.currentActivePage == props.name ? "bg-blue-700 text-white border-blue-500" : "bg-gray-300"} border-2 hover:bg-blue-700 hover:text-white transition-all rounded-md cursor-pointer`}
            onClick={() => props.setActivePage(props.name)}>{props.name}</div>
    );
}