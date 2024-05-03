<template>
    <ul v-for="conjunto in preguntas.FAQ">
        <li>
            {{ conjunto.pregunta }}
            <ul>
                <li>
                    {{ conjunto.respuesta }}
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            preguntas: {
                "nombre_juego": "Robot Escape",
                FAQ: [
                    {
                        "pregunta": "¿Qué tipo de juego es Robot Escape?",
                        "respuesta": "Robot Escape es un juego de acción y aventuras en mundo abierto donde los jugadores pueden explorar un vasto mundo, completar misiones, personalizar su personaje y enfrentarse a desafiantes enemigos."
                    },
                    {
                        "pregunta": "¿En qué plataformas está disponible Robot Escape?",
                        "respuesta": "Robot Escape está disponible actualmente en PC, PlayStation, Xbox y Nintendo Switch."
                    },
                    {
                        "pregunta": "¿Cuál es el objetivo principal del juego?",
                        "respuesta": "El objetivo principal de Robot Escape es completar la historia principal mientras exploras el mundo, enfrentas enemigos y adquieres habilidades y equipamiento para mejorar a tu personaje."
                    },
                    {
                        "pregunta": "¿Hay multijugador en Robot Escape?",
                        "respuesta": "No, Robot Escape es un juego para un jugador."
                    },
                    {
                        "pregunta": "¿Cuánto tiempo dura la historia principal?",
                        "respuesta": "La duración de la historia principal puede variar según el estilo de juego del jugador, pero en promedio, tomará alrededor de [X] horas completarla."
                    },
                    {
                        "pregunta": "¿Hay contenido adicional después de terminar la historia principal?",
                        "respuesta": "Sí, Robot Escape ofrece contenido adicional en forma de misiones secundarias, desafíos y eventos que los jugadores pueden completar después de terminar la historia principal."
                    },
                    {
                        "pregunta": "¿Puedo personalizar a mi personaje en Robot Escape?",
                        "respuesta": "Sí, puedes personalizar a tu personaje con diferentes atuendos, armas, y habilidades a medida que avanzas en el juego."
                    },
                    {
                        "pregunta": "¿Hay algún requisito de edad para jugar Robot Escape?",
                        "respuesta": "La clasificación por edades puede variar según la región, pero en general, Robot Escape está recomendado para jugadores mayores de [X] años debido a su contenido de violencia ficticia y temáticas adultas."
                    },
                    {
                        "pregunta": "¿Hay microtransacciones en Robot Escape?",
                        "respuesta": "Sí, Robot Escape ofrece la opción de comprar contenido adicional, como skins, expansiones y paquetes de objetos a través de microtransacciones, pero el juego no depende de ellas para progresar."
                    },
                    {
                        "pregunta": "¿Cuál es la política de soporte al cliente para Robot Escape?",
                        "respuesta": "Si experimentas algún problema técnico o necesitas ayuda con el juego, puedes ponerte en contacto con nuestro equipo de soporte al cliente a través de [correo electrónico / sitio web / foros] y estaremos encantados de ayudarte."
                    }
                ]
            }

        };
    },
    methods: {}
};
</script>

<style scoped></style>