// ALERT! This URL constant it must be modified everytime ngrok service is launched
const URL = 'http://192.168.1.26:3000'
const USER_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
const MAILTRAP_USERNAME = "64e203cd7b20d6"
const MAILTRAP_PASSWORD = "9d49257b958711"
const APP_PASSWORD = "pxhx azii sbbn guld"
const REGEX = {
    EMAIL: /^[^\s@]{5,40}@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^[a-zA-Z0-9]{8,20}$/,
    NICKNAME: /^[a-zA-ZÀ-ÿ0-9]{2,25}$/,
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

const tmp = {
    SIGN_UP: {
        INVALID_EMAIL: {
            type: 'error',
            text1: 'toast.sign_up.invalid_email',
            text2: 'toast.sign_up.please_introduce_a_valid_email',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
    },
    UNEXPECTED_ERROR: {
        type: 'error',
        text1: 'unexpected_error',
        text2: 'there_is_an_unexpected_error',
        text1Style: TOAST_STYLES.text1Style,
        text2Style: TOAST_STYLES.text2Style
    }
}

const TOAST_MESSAGES = {
    SIGN_UP: {
        INVALID_EMAIL: {
            type: 'error',
            text1: 'toast.sign_up.invalid_email.invalid_email',
            text2: 'toast.sign_up.invalid_email.please_introduce_a_valid_email',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        EXISTING_EMAIL: {
            type: 'error',
            text1: 'toast.sign_up.existing_email.existing_email',
            text2: 'toast.sign_up.existing_email.this_email_already_exists',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_PASSWORD: {
            type: 'error',
            text1: 'toast.sign_up.invalid_password.invalid_password',
            text2: 'toast.sign_up.invalid_password.please_introduce_a_valid_password',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_EMAIL_PASSWORD: {
            type: 'error',
            text1: 'toast.sign_up.invalid_email_password.invalid_email_and_password',
            text2: 'toast.sign_up.invalid_email_password.please_introduce_a_valid_email_and_password',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_REPEAT_PASSWORD: {
            type: 'error',
            text1: 'toast.sign_up.invalid_repeat_password.password_doesnt_match',
            text2: 'toast.sign_up.invalid_repeat_password.the_fields_password_and_repeat_password_doesnt_match',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_NICKNAME: {
            type: 'error',
            text1: 'toast.sign_up.invalid_nickname.invalid_nickname',
            text2: 'toast.sign_up.invalid_nickname.please_introduce_a_valid_nickname',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        EXISTING_NICKNAME: {
            type: 'error',
            text1: 'toast.sign_up.existing_nickname.existing_nickname',
            text2: 'toast.sign_up.existing_nickname.this_nickname_already_exists',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        SIGN_UP_SUCCESS: {
            type: 'success',
            text1: 'toast.sign_up.sign_up_success.sign_up_success',
            text2: 'toast.sign_up.sign_up_success.now_verify_your_account',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        VERIFICATION_CODE_SENT: {
            type: 'info',
            text1: 'toast.sign_up.verification_code_sent.verification_code_sent',
            text2: 'toast.sign_up.verification_code_sent.check_you_email_and_input_the_code_sent',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        ACCOUNT_VERIFIED: {
            type: 'success',
            text1: 'toast.sign_up.account_verified.account_verified',
            text2: 'toast.sign_up.account_verified.we_are_waiting_for_you',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    LOG_IN: {
        INVALID_CREDENTIALS: {
            type: 'error',
            text1: 'toast.log_in.invalid_credentials.invalid_credentials',
            text2: 'toast.log_in.invalid_credentials.the_credentials_introduced_are_incorrect',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        EMAIL_NOT_FOUND: {
            type: 'error',
            text1: 'toast.log_in.email_not_found.email_not_found',
            text2: 'toast.log_in.email_not_found.the_email_introduced_doesnt_exists',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        FORGOT_PASSWORD: {
            type: 'info',
            text1: 'toast.log_in.forgot_password.new_password_established',
            text2: 'toast.log_in.forgot_password.check_the_new_password_in_your_email_sent',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    LOCATION_DETAILS: {
        LOCATION_RATED: {
            type: 'info',
            text1: 'toast.location_details.location_rated.perfect',
            text2: 'toast.location_details.location_rated.this_explorer_thanks_you',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_COMMENT: {
            type: 'error',
            text1: 'toast.location_details.invalid_comment.invalid_comment',
            text2: 'toast.location_details.invalid_comment.please_introduce_a_valid_comment',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    USER_PROFILE: {
        FOLLOWED: {
            type: 'info',
            text1: 'toast.user_profile.followed.followed',
            text2: 'toast.user_profile.followed.you_followed_this_user',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        AVATAR_CHANGED: {
            type: 'info',
            text1: 'toast.user_profile.avatar_changed.avatar_changed',
            text2: 'toast.user_profile.avatar_changed.what_a_beautiful_pic',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    NEW_LOCATION: {
        INVALID_TITLE: {
            type: 'error',
            text1: 'toast.new_location.invalid_title.invalid_title',
            text2: 'toast.new_location.invalid_title.please_introduce_a_valid_title',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_DESCRIPTION: {
            type: 'error',
            text1: 'toast.new_location.invalid_description.invalid_description',
            text2: 'toast.new_location.invalid_description.please_introduce_a_valid_description',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_TITLE_DESCRIPTION: {
            type: 'error',
            text1: 'toast.new_location.invalid_title_description.invalid_title_and_description',
            text2: 'toast.new_location.invalid_title_description.please_introduce_a_valid_title_and_description',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        NEW_LOCATION_SUCCESS: {
            type: 'success',
            text1: 'toast.new_location.new_location_success.new_location',
            text2: 'toast.new_location.new_location_success.thanks_for_sharing',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    SETTINGS: {
        PASSWORD_DOESNT_MATCH: {
            type: 'error',
            text1: 'toast.settings.password_doesnt_match.incorrect_password',
            text2: 'toast.settings.password_doesnt_match.the_password_introduced_is_incorrect',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_PASSWORD: {
            type: 'error',
            text1: 'toast.settings.invalid_password.invalid_password',
            text2: 'toast.settings.invalid_password.please_introduce_a_valid_password',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_REPEAT_PASSWORD: {
            type: 'error',
            text1: 'toast.settings.invalid_repeat_password.invalid_repeat_password',
            text2: 'toast.settings.invalid_repeat_password.the_fields_password_and_repeat_password_doesnt_match',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: {
                fontSize: 11
            }
        },
        NEW_PASSWORD: {
            type: 'success',
            text1: 'toast.settings.new_password.new_password',
            text2: 'toast.settings.new_password.new_password_established',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        INVALID_NICKNAME: {
            type: 'error',
            text1: 'toast.settings.invalid_nickname.invalid_nickname',
            text2: 'toast.settings.invalid_nickname.please_introduce_a_valid_nickname',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        },
        NEW_NICKNAME: {
            type: 'success',
            text1: 'toast.settings.new_nickname.new_nickname',
            text2: 'toast.settings.new_nickname.it_suits_you_great',
            text1Style: TOAST_STYLES.text1Style,
            text2Style: TOAST_STYLES.text2Style
        }
    },
    INTERNAL_ERROR: {
        type: 'error',
        text1: 'toast.internal_error.internal_error',
        text2: 'toast.internal_error.internal_error.there_are_problems_with_server',
        text1Style: TOAST_STYLES.text1Style,
        text2Style: TOAST_STYLES.text2Style
    },
    CONNECTION_ERROR: {
        type: 'error',
        text1: 'toast.connection_error.connection_error.connection_error',
        text2: 'toast.connection_error.connection_error.there_are_problems_with_the_connection',
        text1Style: TOAST_STYLES.text1Style,
        text2Style: TOAST_STYLES.text2Style
    },
    UNEXPECTED_ERROR: {
        type: 'error',
        text1: 'toast.unexpected_error.unexpected_error.unexpected_error',
        text2: 'toast.unexpected_error.unexpected_error.there_is_an_unexpected_error',
        text1Style: TOAST_STYLES.text1Style,
        text2Style: TOAST_STYLES.text2Style
    }
}

module.exports = { URL, USER_LOGO, MAILTRAP_USERNAME, MAILTRAP_PASSWORD, APP_PASSWORD, REGEX, TOAST_MESSAGES }