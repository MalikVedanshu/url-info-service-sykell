

export const isValidName = (inputName: string) : boolean => {

    if((inputName.trim().length < 2) || (inputName.trim().length > 70)) {
        return false;
    }

    for (let nmChar = 0; nmChar < inputName.length; nmChar++) {

        let charAscii = inputName.charCodeAt(nmChar);


        if (!(
            ((charAscii > 96) && (charAscii < 123)) || 
            ((charAscii > 64) && (charAscii < 91)) || 
            (charAscii === 32) ||
            ((charAscii > 191) && (charAscii < 215)) ||
            ((charAscii > 215) && (charAscii < 247)) ||
            ((charAscii > 247) && (charAscii < 255))

        )) {
            return false;
        }

    }

    return true;
}


export const isValidEmail = (email: string) : boolean => {

    const inpMailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return inpMailRegx.test(email);

}


export const isStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
};

export const isPasswordMatch = (
    password: string,
    confirmPassword:string
):boolean => {
    
    return password === confirmPassword;

}


