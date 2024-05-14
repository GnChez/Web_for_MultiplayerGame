<template>
  <div>
    <ul v-for="conjunto in preguntas.FAQ" class="faq-list">
      <li>
        <p class="secondfont-bold">{{ conjunto.question }}</p>
        <ul>
          <li>
            <p class="secondfont">{{ conjunto.answer }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preguntas: {
        game_name: "Robot Escape",
        FAQ: [
          {
            question: "What type of game is Robot Escape?",
            answer:
              "Robot Escape is a multiplayer puzzle game for consoles and PC, divided into multiple stages, where players take on the role of two robots trapped in a giant industrial complex.",
          },
          {
            question: "On which platforms is Robot Escape available?",
            answer:
              "Robot Escape is currently available on PC, PlayStation, Xbox, and Nintendo Switch.",
          },
          {
            question: "What is the main objective of the game?",
            answer:
              "The main objective of Robot Escape is to solve the puzzles of each stage while cooperating with another player to navigate through the industrial complex.",
          },
          {
            question: "Is there multiplayer in Robot Escape?",
            answer:
              "Yes, Robot Escape is a multiplayer game designed for cooperative play.",
          },
          {
            question: "How long does the main storyline last?",
            answer:
            "The duration of the main story can vary depending on the player's play style. On average, it will initially take about [X] hours to complete. However, the development team is continuously updating the game with new additional content, offering new experiences and challenges that can extend this time.",
          },
          {
            question:
              "Is there additional content after completing the main story?",
            answer:
              "Yes, Robot Escape offers additional content in the form of side missions, challenges, and events that players can complete after finishing the main story.",
          },
          {
            question: "Can I customize my character in Robot Escape?",
            answer:
              "No, in Robot Escape players cannot customize their characters, but they can play as one of the two robots in the game.",
          },
          {
            question: "Is there an age requirement to play Robot Escape?",
            answer:
            "There is no age requirement for playing Robot Escape, making it accessible to players of all ages.",
          },
          {
            question: "Are there microtransactions in Robot Escape?",
            answer:
              "No, Robot Escape does not have microtransactions; all content is accessible through gameplay.",
          },
          {
            question: "What is the customer support policy for Robot Escape?",
            answer:
              "If you experience any technical issues or need help with the game, you can contact our customer support team through [email/website/forums], and we will be happy to assist you.",
          },
        ],
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.faq-list {
  margin: 20px 15%;
  list-style-type: none;
  padding: 0;
}

.faq-list li {
  margin-bottom: 10px;
  line-height: 1.6; /* Improves readability */
}

.faq-list li ul {
  margin-top: 5px;
}
</style>
