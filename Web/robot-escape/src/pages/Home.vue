<template>
    <div class="container">
        <div class="image">
            <div class="inside-image"></div>
            <button class="image-button secondfont-bold" @click="downloadGame">DOWNLOAD NOW!</button> <!-- Button added here -->
        </div>
    </div>
</template>

<script>
import { downloadGame } from "@/communicationsManager";
export default {
    data() {
        return {};
    },
    methods: {
        downloadGame() {
            downloadGame();
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

.image {
    width: 100%;
    height: 80vh; /* Specify the desired height */
    
    background-image: url("@/assets/images/background_main_image.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    background-attachment: fixed; /* Make the image fixed with scrolling */
    position: relative; /* Needed for absolute positioning of the button */
    background-position-y: 64px;
}

.inside-image {
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/name.png");
    background-repeat: no-repeat;
    background-size: contain; /* Ensures the image fits within the container */
    background-position: center;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
}

.image-button {
    position: absolute;
    bottom: 40px; /* Increased bottom margin for better spacing */
    left: 50%; /* Center the button horizontally */
    transform: translateX(-50%); /* Align center of the button with the center of the container */
    padding: 10px 20px; /* Padding around the text */
    border: 2px solid #F8B500; /* Golden border */
    background-color: transparent; /* Transparent background */
    color: #F8B500; /* Golden text color to match the border */
    font-size: 16px; /* Font size */
    cursor: pointer;
    border-radius: 5px; /* Rounded corners for the button */
    
    outline: none; /* Remove focus outline for cleaner look */
    transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effects */
}

.image-button:hover {
    background-color: #F8B500; /* Golden background on hover */
    color: white; /* White text on hover */
}
</style>