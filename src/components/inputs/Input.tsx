import {useState} from "react";
import {validateInput} from "@/validators/input-validators";

type Props = {
    label: string;
    disabled: boolean;
    value: number | string | null;
    setValue: (value: any) => void;
    validate?: (value: any) => string;
    dataType?: string;
    width?: string;
}

export default function Input(props: Props) {
    const dataType = props.dataType ? props.dataType : "text";
    const width = props.width ? props.width : "w-full";

    const [value, setValue] = useState(props.value);
    const [error, setError] = useState<string>("");

    const handleChange = function(event: React.ChangeEvent<HTMLInputElement>) {
        setError("");
        const value = event.target.value;

        setValue(value);
        props.setValue(value);

        const error = validate(value);
        if (error != "") {
            setError(error);
        }
    }

    const validate = props.validate ? props.validate : validateInput;

    return (
        <div>
            <div className={`text-xs font-bold`}>{props.label}</div>
            <input type={dataType} disabled={props.disabled} name={props.label}
                   value={value ? value : ""} onChange={handleChange}
                   className={`${width} p-2 border-2 transition-all duration-300 ${error != "" ? "border-red-300 hover:border-red-200 focus:border-red-300" : ""} ${props.disabled ? "" : "hover:border-blue-200 focus:border-blue-500"} outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}/>

            {error && <div className={"text-xs text-red-500 absolute"}>{error}</div>}
        </div>
    );
}
