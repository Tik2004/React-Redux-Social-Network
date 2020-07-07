export const requiredField = value => {
    if (!value) {return "Field is required"}
    return undefined
}
export const maxLengthcreator = MaxLength => value => {
    if (value.length >= MaxLength) {return `Max Length is ${MaxLength} symbols`}
    return undefined
}
export const minLengthcreator = MinLength => value => {
    if (value.length < MinLength) {return `Minimal length is ${MinLength} symbols`}
}
