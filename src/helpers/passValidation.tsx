export const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
export const passRequirements =
    'Password requirements:\n' +
    'At least 1 Uppercase\n' +
    'At least 1 Lowercase\n' +
    'At least 1 Number\n' +
    'At least 1 Symbol !@#$%^&*_=+-\n' +
    'Min 8 chars and Max 12 chars';
