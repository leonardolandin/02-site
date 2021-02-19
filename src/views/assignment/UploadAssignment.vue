<template>
    <div class="bodyUploadAssignment">
        <div class="container-header">
            <Header :user="this.user" :userLoggedHeader="this.userLogged" @logoff="logoff"/>
        </div>
        <div class="containerUpload">
            <div v-show="!this.next">
                <div class="viewImageUploaded">
                    <img v-show="this.image.path" :src="this.image.path">
                    <input @change="uploadImage" type="file" id="file" ref="file" accept="image/*">
                </div>
                <div>
                    <button @click="selectImage" class="buttonUploadImage" v-if="!this.image.path">Selecionar imagem</button>
                    <button @click="selectImage" class="buttonUploadImage" v-if="this.image.path">Alterar imagem</button>
                    <button class="buttonUploadImage next" :disabled="!this.image.path" @click="nextForm">AVANÇAR</button>
                </div>
            </div>
            <div class="formAssignment" v-show="this.next">
                <form>
                    <div class="headerAssignment">
                        <h1>Detalhes da atividade</h1>
                    </div>
                    <div class="formGroup">
                        <label for="nameAssignment">Nome da atividade: </label>
                        <input type="text" maxlength="128" id="nameAssignment" v-model="assignment.name" v-bind:class="{ invalidField: this.errorInput }">
                    </div>
                    <div class="formGroup">
                        <label for="descriptionAssignment">Descrição da atividade: </label>
                        <input type="text" maxlength="252" id="descriptionAssignment" v-model="assignment.description" v-bind:class="{ invalidField: this.errorInput }">
                    </div>
                    <div class="formGroup">
                        <label for="nameAssignment">Escolaridade: </label>
                        <select class="schoolOptions" v-model="assignment.typeAssignment" name="typeAssignment">
                            <option value="0">--- Selecione ---</option>
                            <option v-for="option in optionsSchool" :value="option" :key="option.value">
                                {{option.name}}
                            </option>
                        </select>
                    </div>
                    <div class="formGroup">
                        <label class="insideAutor">Você é o autor dessa imagem?
                            <input type="checkbox" id="checkboxAutor" v-model="assignment.isAutor">
                        </label>
                    </div>
                    <div class="formGroup center">
                       <span class="error">{{this.error}}</span>
                    </div>
                    <div class="formGroup center">
                        <button class="buttonUploadImage" type="button" v-if="!this.loading" @click="sendAssignment(assignment)">ENVIAR</button>
                        <button class="buttonUploadImage" type="button" :disabled="this.loading" v-if="this.loading"><img src="@/assets/assignment/loading.gif"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import Header from '@/components/Header';
import UserAPI from '@/services/User';
import AssignmentAPI from '@/services/Assignment';

export default {
    components: { Header },
    data() {
        return {
            user: { type: Object },
            userLogged: false,
            token: localStorage.getItem('userToken') || null,
            image: { path: null, name: null },
            next: false,
            errorInput: false,
            assignment: { typeAssignment: "0" },
            error: '',
            loading: false,
            optionsSchool: [{
                name: "Ensino Infantil", value: "1"
            },
            { 
                name: "Ensino Fundamental", value: "2" 
            },
            { 
                name: "Ensino Médio", value: "3" 
            },
            { 
                name: "Ensino Superior", value: "4" 
            }]
        }
    },
    mounted() {
        UserAPI.getUserLogged(this.token).then(response => {
            if(response.data) {
                this.user = response.data;
                this.userLogged = true;
            }
        }).catch(() => {
            this.userLogged = false;
        })
    },
    methods: {
        logoff: function() {
            this.userLogged = false;
            localStorage.removeItem('userToken');
        },
        selectImage: function() {
            let elementUpload = this.$refs.file;

            elementUpload.click();
        },
        uploadImage: function(e) {
            if(e.target.files.length) {
                this.viewImage(e.target.files[0]);
            } else {
                return false;
            }
        },
        viewImage: function(file) {
            let fileReader = new FileReader();

            fileReader.onload = (e) => {
                this.image.path = e.target.result;
                this.image.name = file.name;
            };

            fileReader.readAsDataURL(file);
        },
        nextForm: function() {
            this.next = true;
        },
        sendAssignment: function(assignment) {
            let vm = this;

            vm.loading = true;

            let assignmentObj = {
                nameAssignment: assignment.name,
                descriptionAssignment: assignment.description,
                typeAssignment: assignment.typeAssignment == "0" ? assignment.typeAssignment : assignment.typeAssignment.value,
                isAutor: assignment.isAutor ? true : false,
                imageUpload: vm.image
            }
            
            AssignmentAPI.sendAssignment(assignmentObj, vm.user.token).then(response => {
                if(response.data) {
                    setTimeout(() => {
                        vm.$router.push('/');
                    }, 3000)
                }
            }).catch(error => {
                vm.error = error.response.data.message || "Ocorreu um erro inesperado";
                vm.errorInput = true;
                vm.loading = false;
            })
        }
    }
}
</script>

<style scoped>
    .container-header {
        height: 110px;
    }

    .bodyUploadAssignment {
        height: 100%;
        width: 100%;
    }

    .containerUpload {
        overflow: auto;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-direction: column;
    }

    .containerUpload > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: opacity 1s;
        margin-bottom: 100px;
    }

    .buttonUploadImage {
        outline: none;
        background: #4285F4;
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
        margin-right: 40px;
    }

    .buttonUploadImage > img {
        width: 20px;
    }

    .viewImageUploaded > input[type=file] {
        display: none;
    }

    .viewImageUploaded {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .viewImageUploaded > img {
        max-width: 500px;
        border: 5px solid;
        margin-right: 35px;
    }

    .next {
        margin: 50px 0px 0px 0px;
    }

    button:disabled,
    button[disabled] {
        background-color: #cccccc;
        color: #666666;
    }

    .formAssignment {
        box-sizing: border-box;
        border: 2px solid #efeeee;
        padding: 40px;
        border-radius: 5px;
    }

    .formGroup {
        display: -webkit-box;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        justify-content: space-between;
        margin: 0 0 20px;
    }

    .center {
        justify-content: center;
    }

    .error {
        color: red;
    }

    .invalidField {
        border: 2px solid red !important;
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

    .headerAssignment {
        margin: 0 0 40px;
    }

    .headerAssignment > h1 {
        padding: 4px 0;
        color: #4285F4;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .schoolOptions {
        display: block;
        font-size: 16px;
        font-family: sans-serif;
        font-weight: 700;
        color: #444;
        line-height: 1.3;
        padding: .6em 1.4em .5em .8em;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        margin: 0;
        border: 1px solid #aaa;
        box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
        border-radius: .5em;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
            linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
    }

    .schoolOptions::-ms-expand {
        display: none;
    }

    .schoolOptions:hover {
        border-color: #888;
    }

    .schoolOptions:focus {
        border-color: #aaa;
        box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #222; 
        outline: none;
    }

    .schoolOptions option {
        font-weight:normal;
    }

    *[dir="rtl"] .schoolOptions, :root:lang(ar) .schoolOptions, :root:lang(iw) .schoolOptions {
        background-position: left .7em top 50%, 0 0;
        padding: .6em .8em .5em 1.4em;
    }

    .schoolOptions:disabled, .schoolOptions[aria-disabled=true] {
    color: graytext;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
        linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    }

    .schoolOptions:disabled:hover, .schoolOptions[aria-disabled=true] {
        border-color: #aaa;
    }

</style>