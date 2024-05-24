<template>
    <h1></h1>
    <div class="about-us-container secondfont">
        <section v-for="section in about_us.sections" :key="section.header" class="section-block">
            <h2 class="black-colors">{{ section.header }}</h2>
            <p >{{ section.content }}</p>
            <ul v-if="section.subcontent" class="subcontent-list">
                <li v-for="item in section.subcontent" :key="item">{{ item }}</li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            about_us: {
                sections: [
                    {
                        header: "About Us",
                        content: "Welcome to Quadrinomial, a creative hub where passion for gaming and innovative design converge to craft exceptional gaming experiences. Based in the vibrant city of Barcelona, our team is composed of four dedicated students: Óscar, Mario, Joan, and Samuel. Together, we bring a blend of diverse skills and a unified vision to the world of game development."
                    },
                    {
                        header: "Our Journey",
                        content: "Quadrinomial was born out of a shared dream to create games that not only entertain but also challenge the norms of traditional gaming. Each of us brings a unique set of skills and perspectives, driven by a common goal to develop games that resonate with players across the globe. As students, we balance our academic responsibilities with our passion for game development, pushing the boundaries of what we can achieve."
                    },
                    {
                        header: "Our Games",
                        content: "To date, we have developed two titles that showcase our commitment to quality and innovation:",
                        subcontent: [
                            "Son-Bis: A mobile game that offers a unique blend of shooting and 2D elements, designed to provide a quick but challenging escape for players of all ages. With its intuitive gameplay and captivating soundtrack, Son-Bis has found a special place in the hearts of mobile gamers.",
                            "Robot Escape: Our latest venture into the realm of PC and consoles. This 3D puzzle-adventure game invites players to explore a vast and dynamic number of rooms, embarking on a journey filled with intense challenges and puzzles. Robot Escape exemplifies our ambition to create immersive challenges that players can lose themselves in."
                        ]
                    },
                    {
                        header: "Our Vision",
                        content: "At Quadrinomial, we aspire to continue our growth and innovation within the gaming industry. We are driven by our passion for creating games that not only entertain but also inspire and engage the community. As we continue our journey, we remain committed to delivering high-quality gaming experiences that push the limits of imagination and technology."
                    },
                    {
                        header: "Connect with Us",
                        content: "We cherish the community that plays our games and welcome feedback and ideas. Whether you are a fellow developer, a gaming enthusiast, or just curious about our work, we encourage you to connect with us. Let’s build the future of gaming together!"
                    }
                ]
            }
        };
    },
    methods: {}
};
</script>

<style scoped>
.about-us-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.section-block {
    margin-bottom: 20px;
}

.section-block h2 {
    color: #2c3e50; /* A deep blue shade */
    margin-bottom: 10px;
}

.section-block p, .section-block ul {
    text-align: justify;
    line-height: 1.6;
}

.subcontent-list {
    list-style-type: disc;
    margin-left: 20px;
}
</style>