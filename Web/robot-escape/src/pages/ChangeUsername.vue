<template>
    <div class="container">
        <ChangeUsernameForm/>
    </div>
    

</template>

<script>
import ChangeUsernameForm from '@/components/ChangeUsernameForm.vue';
export default {
    components: {   
        ChangeUsernameForm
    },
data() {
    return {
    };
},
methods: {}
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
     /* Adjust the height as needed */
}
</style>