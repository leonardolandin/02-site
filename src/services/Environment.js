export default {
    getSecretRecaptcha: () => {
        return process.env.VUE_APP_SECRET_RECAPTCHA
    },
    getUrlRecaptcha: () => {
        return process.env.VUE_APP_URL_RECAPTCHA
    }
}