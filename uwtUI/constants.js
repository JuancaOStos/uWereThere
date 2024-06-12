// ALERT! This URL constant it must be modified everytime ngrok service is launched
const URL = 'http://192.168.1.26:3000'
const USER_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
const MAILTRAP_USERNAME = "64e203cd7b20d6"
const MAILTRAP_PASSWORD = "9d49257b958711"
const APP_PASSWORD = "pxhx azii sbbn guld"
const REGEX = {
    EMAIL: /^[^\s@]{5,40}@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^[a-zA-Z0-9]{8,20}$/,
    NICKNAME: /^[a-zA-Z0-9]{2,25}$/,
    TITLE: /^[a-zA-ZÀ-ÿ0-9 ]{3,40}$/,
    DESCRIPTION: /^[a-zA-ZÀ-ÿ0-9 ]{10,200}$/,
    COMMENT: /^[a-zA-ZÀ-ÿ0-9 ]{1,200}$/
}

const TOAST_STYLES = {
    text1Style: {
        fontWeight: 'bold',
        fontSize: 17
    },
    text2Style: {
        fontSize: 14
    }
}

const TOAST_MESSAGES = {
    SIGN_UP: {
        INVALID_EMAIL: {
            type: 'error',
            text1: 'Invalid email',
            text2: 'Please, introduce a valid email',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        EXISTING_EMAIL: {
            type: 'error',
            text1: 'Existing email',
            text2: 'This email already exists',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_PASSWORD: {
            type: 'error',
            test1: 'Invalid password',
            text2: 'Please, introduce a valid password',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_EMAIL_PASSWORD: {
            type: 'error',
            text1: 'Invalid email and password',
            text2: 'Please, introduce a valid email and password',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_REPEAT_PASSWORD: {
            type: 'error',
            text1: 'Password doesn\'t match',
            text2: 'The fields password and repeat password doesn\'t match',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: {
                fontSize: 11
            }
        },
        INVALID_NICKNAME: {
            type: 'error',
            text1: 'Invalid nickname',
            text2: 'Please, introduce a valid nickname',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        EXISTING_NICKNAME: {
            type: 'error',
            text1: 'Existing nickname',
            text2: 'This nickname already exists',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        SIGN_UP_SUCCESS: {
            type: 'success',
            text1: 'Sign up with success!',
            text2: 'Now, verify your account',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        VERIFICATION_CODE_SENT: {
            type: 'info',
            text1: 'Verification code sent',
            text2: 'Check you email and input the code sent',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        ACCOUNT_VERIFIED: {
            type: 'success',
            text1: 'Account verified!',
            text2: 'We are waiting for you!',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    LOG_IN: {
        INVALID_CREDENTIALS: {
            type: 'error',
            text1: 'Invalid credentials',
            text2: 'The credentials introduced are incorrect',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        EMAIL_NOT_FOUND: {
            type: 'error',
            text1: 'Email not found',
            text2: 'The email introduced doesn\'t exists',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        FORGOT_PASSWORD: {
            type: 'info',
            text1: 'New password established',
            text2: 'Check the new password in your email sent',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    LOCATION_DETAILS: {
        LOCATION_RATED: {
            type: 'info',
            text1: 'Perfect!',
            text2: 'This explorer thanks you!',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_COMMENT: {
            type: 'error',
            text1: 'Invalid comment',
            text2: 'Please, introduce a valid comment',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    USER_PROFILE: {
        FOLLOWED: {
            type: 'info',
            text1: 'Followed!',
            text2: 'You followed this user',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        AVATAR_CHANGED: {
            type: 'info',
            text1: 'Avatar changed',
            text2: 'What a beautifull pic!',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    NEW_LOCATION: {
        INVALID_TITLE: {
            type: 'error',
            text1: 'Invalid title',
            text2: 'Please, introduce a valid title',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_DESCRIPTION: {
            type: 'error',
            text1: 'Invalid description',
            text2: 'Please, introduce a valid description',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_TITLE_DESCRIPTION: {
            type: 'error',
            text1: 'Invalid title and description',
            text2: 'Please, introduce a valid title and description',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        NEW_LOCATION_SUCCESS: {
            type: 'success',
            text1: 'New location!',
            text2: 'Thanks for sharing!',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    SETTINGS: {
        INVALID_PASSWORD: {
            type: 'error',
            text1: 'Invalid password',
            text2: 'Please, introduce a valid password',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_REPEAT_PASSWORD: {
            type: 'error',
            text1: 'Password doesn\'t match',
            text2: 'The fields password and repeat password doesn\'t match',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: {
                fontSize: 11
            }
        },
        NEW_PASSWORD: {
            type: 'success',
            text1: 'New password',
            text2: 'New password established',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_NICKNAME: {
            type: 'error',
            text1: 'Invalid nickname',
            text2: 'Please, introduce a valid nickname',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        NEW_NICKNAME: {
            type: 'success',
            text1: 'New nickname',
            text2: 'It suits you great!',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    INTERNAL_ERROR: {
        type: 'error',
        text1: 'Server error',
        text2: 'There are problems with server',
        text1Style: TOAST_STYLES.text1Style,
        text2Style: TOAST_STYLES.text2Style
    },
    CONNECTION_ERROR: {
        type: 'error',
        text1: 'Connection error',
        text2: 'There are problems with the connection',
        text1Style: TOAST_STYLES.text1Style,
        text2Style: TOAST_STYLES.text2Style
    },
    UNEXPECTED_ERROR: {
        type: 'error',
        text1: 'Unexpected error',
        text2: 'There is an unexpected error',
        text1Style: TOAST_STYLES.text1Style,
        text2Style: TOAST_STYLES.text2Style
    }
    
}

module.exports = { URL, USER_LOGO, MAILTRAP_USERNAME, MAILTRAP_PASSWORD, APP_PASSWORD, REGEX, TOAST_MESSAGES }