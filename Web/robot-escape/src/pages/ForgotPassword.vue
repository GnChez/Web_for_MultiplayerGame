<template>
    <div class="container">
        <ForgotPasswordForm/>
    </div>
    

</template>

<script>
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue';
export default {
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
    height: 100vh; /* Adjust the height as needed */
}
</style>