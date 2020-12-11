<template>
    <div>
        <div :class="show ? 'menu' : 'menu hidden'">
            <div class="closeMenuMobile">
                <i @click="closeMenuMobile()">&times;</i>
            </div>
            <div>
                
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
export default {
    props: ['show'],
    data() {
        return {
            isShow: this.show
        }
    },
    methods: {
        closeMenuMobile: function() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
    .menu {
        background: #fff none repeat scroll 0 0;
        width: 320px;
        position: absolute;
        box-shadow: 1px 2px 3px #ddd;
        left: -1px;
        transition: left .5s ease 0s;
        margin-right: 1px;
        z-index: 31;
        min-height: 102vh;
        overflow-y: scroll;
        height: 100vh;
    }

    .hidden {
        left: -320px !important;
    }

    .closeMenuMobile {
        font-size: 75px;
        display: flex;
        justify-content: flex-end;
    }

    .closeMenuMobile > i {
        margin-right: 40px;
    }
</style>