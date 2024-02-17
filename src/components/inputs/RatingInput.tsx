import {useState} from "react";
import NumericInput from "@/components/inputs/NumericInput";
import {validateRatingInput} from "@/validators/input-validators";

type Props = {
    label: string;
    disabled: boolean;
    value: number | null;
    setValue: (value: number) => void;
}

export default function RatingInput(props: Props) {
    const [value, setValue] = useState<number | null>(props.value);

    const handleChange = function(value: number) {
        setValue(value);
        props.setValue(value);
    }

    return (
        <NumericInput label={props.label} disabled={props.disabled} value={value} setValue={handleChange}
                      validate={validateRatingInput}
        />
    );
}
