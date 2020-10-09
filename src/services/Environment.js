export default {
    getSecretRecaptcha: () => {
        console.log(process.env)
        return process.env.VUE_APP_SECRET_RECAPTCHA
    },
    getUrlRecaptcha: () => {
        return process.env.VUE_APP_URL_RECAPTCHA
    }
}