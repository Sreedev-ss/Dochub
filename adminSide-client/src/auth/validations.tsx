export const validateName = (name: string) => {
    if (name == "") {
        return { valid: false, error: 'This field is required' }
    }
    else if (name.length <= 2) {
        return { valid: false, error: 'Name must be minimum 2 characters' }
    }
    else if (!name.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
        return { valid: false, error: 'Enter valid details' }
    }

    return { valid: true, error: "" }
}

export const validateEmail = (email: string) => {
    if (email == "") {
        return { valid: false, error: "This field is required" }
    }
    else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return { valid: false, error: "Enter a valid email" }
    }
    return { valid: true, error: "" }
}

export const validatePassword = (password: string) => {
    if (password == "") {
        return { valid: false, error: 'This field is required' }
    }
    else if (password.length < 8) {
        return { valid: false, error: "Must be minimum 8 characters" }

    }
    else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
        return { valid: false, error: "Password should contain atleast one letter and one number" }

    }
    return { valid: true, error: "" }
}

export const validateCPassword = (password: string, cPassword: string) => {
    if (cPassword == "") {
        return { valid: false, error: 'This field is required' }
    }
    else if (password !== cPassword) {
        return { valid: false, error: "Confirm password must be same as password" }
    }
    return { valid: true, error: "" }
}