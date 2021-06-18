export const setFieldError = (field:any, error: string) => {
    field.setCustomValidity(error);
    field.reportValidity();
}
