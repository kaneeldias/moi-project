import {useState} from "react";
import Input from "@/components/inputs/Input";
import {validateNumericInput} from "@/validators/input-validators";

type Props = {
    label: string;
    disabled: boolean;
    value: number | null;
    setValue: (value: any) => void;
    validate?: (value: any) => string;
}

export default function NumericInput(props: Props) {
    const [value, setValue] = useState(props.value);

    const handleChange = function(value: string) {
        const floatValue = parseFloat(value);
        setValue(floatValue);
        props.setValue(floatValue);
    }

    return (
        <Input dataType={"number"} disabled={props.disabled} label={props.label} width={"w-24"}
               value={value ? value : ""} setValue={handleChange} validate={props.validate ? props.validate : validateNumericInput}
        />
    );
}
