<template>
    <div class="bodyViewAssignment">
        <div class="container-header">
            <Header :user="this.user" :userLoggedHeader="this.userLogged" @logoff="logoff"/>
        </div>
        <div class="containerDisplay">
            <div class="containerAssignment" v-if="this.assignment._id">
                <div>
                    <img class="image" :src="this.assignment.imageUpload.path" :alt="this.assignment.imageUpload.name">
                    <div class="containerImageDownload">
                        <button class="downloadImage" @click="downloadImage">Obter imagem</button>
                    </div>
                </div>
                <div class="assignmentDetails">
                    <div>
                        <label for="">Nome:</label>
                        <p>{{this.assignment.nameAssignment}}</p>
                    </div>
                    <div class="containerInfo">
                        <label for="">Descrição:</label>
                        <p>{{this.assignment.descriptionAssignment}}</p>
                    </div>
                    <div class="containerInfo">
                        <label for="">Publico-Alvo:</label>
                        <p>{{typePublic(this.assignment.typeAssignment)}}</p>
                    </div>
                    <div class="containerInfo">
                        <p>O responsável pela atividade <b>{{isAutor(this.assignment.isAutor)}}</b></p>
                    </div>
                    <div class="containerInfo">
                        <p class="date">Atividade criada em {{formatDate(this.assignment.created)}}</p>
                    </div>
                    <div class="containerInfo" v-if="this.userLogged">
                        <AssignmentActions :assignment="this.assignment" :user="this.user"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AssignmentActions from '@/components/AssignmentActions.vue';
import UserAPI from '@/services/User';
import AssignmentAPI from '@/services/Assignment';

export default {
    components: { Header, AssignmentActions },
    data() {
        return {
            user: { type: Object },
            userLogged: false,
            token: localStorage.getItem('userToken') || null,
            assignment: { type: Object }
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

        AssignmentAPI.getAssignmentById(this.$route.params.id, this.token).then(response => {
            this.assignment = response.data;

            document.title = `${this.assignment.nameAssignment} - 02`;
        })

    },
    methods: {
        logoff: function() {
            this.userLogged = false;
            localStorage.removeItem('userToken');
        },
        downloadImage: function() {
            AssignmentAPI.downloadImage(this.assignment.imageUpload.path).then(response => {
                let url =  window.URL.createObjectURL(new Blob([response.data], { type:'application/*' } ))
                let link = document.createElement('a')

                link.href = url
                link.download = this.assignment.imageUpload.name

                link.click();
            })
        },
        typePublic: function(type) {
            if(type) {
                switch(type) {
                    case 'INFANT':
                        return 'Ensino Infantil';
                    case 'FUNDAMENTAL':
                        return 'Ensino Fundamental';
                    case 'MEDIUM':
                        return 'Ensino Médio';
                    case 'UPPER':
                        return 'Ensino Superior';
                }
            }
        },
        formatDate: function(date) {
            let dateFormat = new Date(date);

            if(dateFormat) {
                return `${this.addZero(dateFormat.getDay())}/${this.addZero(dateFormat.getMonth() + 1)}/${dateFormat.getFullYear()} ás ${dateFormat.getHours()}:${dateFormat.getMinutes()}`
            }
        },
        addZero: function(number) {
            if(number <= 9) {
                return `0${+ number}` 
            } else {
                return number
            }
        },
        isAutor: function(autor) {
            return autor ? 'é o autor da imagem' : 'não é o autor da imagem';
        }
    }
}
</script>

<style scoped>
    .container-header {
        height: 110px;
    }

    .bodyViewAssignment {
        height: 100%;
        width: 100%;
        background-color: #e4e4e4;
    }

    .containerDisplay {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .containerAssignment {
        background-color: white;
        width: 1400px;
        height: 760px;
        border-radius: 15px;
        display: flex;
    }

    .image {
        max-width: 570px;
        padding: 40px;
    }

    .containerImageDownload {
        display: flex;
        justify-content: center;
    }

    .downloadImage {
        outline: none;
        background: #4285F4;
        width: 70%;
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

    .assignmentDetails {
        padding: 50px;
        width: 100%;
    }

    .assignmentDetails > div > label {
        display: block;
        margin: 0 0 10px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        font-weight: 500;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: .2em;
    }

    .assignmentDetails > div {
        width: 100%;
    }

    .containerInfo {
        margin-top: 25px;
    }

    .date {
        color: rgba(0, 0, 0, 0.6);
        font-weight: bold;
    }
</style>>