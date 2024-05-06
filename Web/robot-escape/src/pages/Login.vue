<template>
    <div class="container">
        <LoginForm/>
    </div>
        
    
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
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