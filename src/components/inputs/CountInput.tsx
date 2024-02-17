import {useState} from "react";
import NumericInput from "@/components/inputs/NumericInput";
import {validateCountInput} from "@/validators/input-validators";

type Props = {
    label: string;
    disabled?: boolean;
    value: number | null;
    setValue: (value: number) => void;
}

export default function CountInput(props: Props) {
    const disabled = props.disabled ? props.disabled : false;

    const [value, setValue] = useState<number | null>(props.value);

    const handleChange = function(value: number) {
        setValue(value);
        props.setValue(value);
    }

    return (
        <NumericInput label={props.label} disabled={disabled} value={value} setValue={handleChange}
                      validate={validateCountInput}
        />
    );
}
