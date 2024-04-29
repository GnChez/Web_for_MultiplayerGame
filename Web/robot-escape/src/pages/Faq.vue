<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit="login">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        login(event) {
            event.preventDefault();
            // Perform login logic here
            // You can use this.username and this.password to access the entered values
        }
    }
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
form {
    display: flex;
    flex-direction: column;
}
label {
    margin-bottom: 10px;
}
input {
    padding: 10px;
    margin-bottom: 20px;
}
button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>