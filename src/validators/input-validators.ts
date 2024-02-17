export function validateInput(value: any): string {
    if (value === "" || value === null || value === undefined) {
        return "Value cannot be empty";
    }

    return "";
}

export function validateNumericInput(value: any): string {
    const errors = validateInput(value);
    if (errors) {
        return errors;
    }

    if (isNaN(value)) {
        return "Value must be a number";
    }

    return "";
}

export function validateRatingInput(value: any): string {
    const errors = validateNumericInput(value);
    if (errors) {
        return errors;
    }

    if (value <= 0 || value > 10) {
        return "Rating must be between 0 and 10";
    }

    return "";
}

export function validateCountInput(value: any): string {
    const errors = validateNumericInput(value);
    if (errors) {
        return errors;
    }

    if (value <= 0) {
        return "Rating must be greater than 0";
    }

    if (!Number.isInteger(parseFloat(value))) {
        return "Value must be a whole number";
    }

    return "";
}