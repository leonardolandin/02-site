<template>
    <div class="containerBackground">
        <div class="containerLogin">
            <div class="toggleLogin">
            </div>
            <div class="formPanel login">
                <div class="headerLogin">
                    <h1>Recuperar Senha</h1>
                </div>
                <div class="loginContent">
                    <form>
                        <div class="formGroup">
                            <label for="username">E-mail</label>
                            <input type="text" id="username" name="email" placeholder="Digite seu e-mail" v-model="email" required="required" v-bind:class="{ invalidField: this.errorInput }">
                        </div>
                        <div class="formGroup">
                            <button type="button" :disabled="!email" @click="sendEmail(email)">Enviar</button>
                        </div>
                        <div class="container-error">
                            <span class="errorInput">{{error}}</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Environment from '@/services/Environment'
import User from '@/services/User'

export default {
    data() {
        return {
            secret: Environment.getSecretRecaptcha(),
            errorInput: false,
            error: '',
            email: null,
            token: localStorage.getItem('userToken') || null
        }
    },
    mounted() {
        this.loadScriptAsync(Environment.getUrlRecaptcha() + this.secret);

        User.getUserLogged(this.token).then(response => {
          if(response.data) {
              this.$router.push('/')
          }
        }).catch(() => {
            return false;
        })
    },
    methods: {
        loadScriptAsync: function(url) {
            return new Promise(function(resolve) {
                let tag = document.createElement('script');
                tag.src = url;
                tag.async = true;
                tag.onload = () => {
                    resolve();
                };
                let firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            });
        },
        sendEmail: function(email) {
            User.sendEmailRemember(email).then(response => {
                console.log(response);
            }).catch(error => {
                this.errorInput = true;
                this.error = error.response.data.message;
            })
        }
    }
}
</script>

<style scoped>
    .containerBackground {
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background: linear-gradient(45deg, rgba(1, 100, 152, 0.92) 0%,rgba(14, 113, 197, 0.68) 100%);
    }
    .containerLogin {
        z-index: 15;
        position: relative;
        background: #FFFFFF;
        width: 600px;
        border-radius: 4px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        overflow: hidden;
    }

    .toggleLogin {
        z-index: 10;
        position: absolute;
        top: 60px;
        right: 60px;
        background: #FFFFFF;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-transform: translate(0, -25%) scale(0);
        transform: translate(0, -25%) scale(0);
        opacity: 0;
        cursor: pointer;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
    }

    .toggleLogin::before, .toggleLogin::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 30px;
        height: 4px;
        background: #4285F4;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .formPanel {
        padding: 60px calc(5% + 60px) 60px 60px;
        box-sizing: border-box;
    }

    .formPanel.login::before {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        content: '';
        display: block;
        opacity: 0;
        visibility: hidden;
        -webkit-transition: 0.3s ease;
        transition: 0.3s ease;
    }

    .formPanel.sign::before {
        content: '';
        display: block;
        position: absolute;
        top: 60px;
        left: 1.5%;
        background: rgba(255, 255, 255, 0.2);
        height: 30px;
        width: 2px;
        -webkit-transition: 0.3s ease;
        transition: 0.3s ease;
    }

    .headerLogin {
        margin: 0 0 40px;
    }

    .headerLogin > h1 {
        padding: 4px 0;
        color: #4285F4;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .formGroup {
        display: -webkit-box;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        justify-content: space-between;
        margin: 0 0 20px;
    }

    .formGroup > label {
        display: block;
        margin: 0 0 10px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        font-weight: 500;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: .2em;
    }

    .formGroup > input {
        outline: none;
        display: block;
        background: rgba(0, 0, 0, 0.05);
        width: 100%;
        border: 0;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 12px 20px;
        color: rgba(0, 0, 0, 0.6);
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        -webkit-transition: 0.3s ease;
        transition: 0.3s ease;
    }

    .loginContent > form > .formGroup > button {
        outline: none;
        background: #4285F4;
        width: 100%;
        border: 0;
        border-radius: 4px;
        padding: 12px 20px;
        color: #FFFFFF;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        text-transform: uppercase;
        cursor: pointer;
    }

    .invalidField {
        border: 2px solid red !important;
    }

    .errorInput {
        color: red;
        margin-top: 15px;
    }

    @media only screen and (max-width: 414px) {
            .containerLogin {
                width: 350px;
            }
    }

    .container-error {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>