/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Categorias seguindo Fitzgerald Key (mesma prancha NeuroEdu)
        cat: {
          social: "#F8C9D7",   // rosa - saudações/sociais
          people: "#FFF59B",   // amarelo - pessoas/pronomes
          action: "#C8E6C9",   // verde - verbos/ações
          desc: "#BBDEFB",     // azul - descritivos/sentimentos
          noun: "#FFCC80",     // laranja - substantivos
          q: "#D1B3FF",        // roxo - perguntas
          util: "#FFFFFF",     // branco - utilitárias/conceitos (sim, não, antes, etc.)
        },
      },
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', "system-ui", "Arial", "sans-serif"],
      },
      boxShadow: {
        tile: "0 2px 6px rgba(0,0,0,0.08), inset 0 -3px 0 rgba(0,0,0,0.06)",
        "tile-active": "0 1px 2px rgba(0,0,0,0.10), inset 0 2px 4px rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
