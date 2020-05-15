export const formatErrorMessage = (error) => {

    let errorDic = {
        'EMAIL_NOT_FOUND': 'Invalid Username or Password',
        'INVALID_PASSWORD': 'Invalid Username or Password',
        'WEAK_PASSWORD : Password should be at least 6 characters': 'Password should be at least 6 characters',
        'EMAIL_EXISTS': 'Email already exists'

    }

    return errorDic[error];

}