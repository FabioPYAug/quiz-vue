<template>
  <div class="app">
    <h1>Quiz da Taylor Swift</h1>
    <div v-if="currentQuestion">
      <div class="quiz">
        <h2>{{ currentQuestion.question }}</h2>
        <div v-for="(answer, index) in currentQuestion.answers" :key="index">
          <button
            :class="{
              btn: true,
              correct: answer.correct && answer.text === selectedAnswer,
              incorrect: !answer.correct && answer.text === selectedAnswer && selectedAnswer !== null,
              disabled: isDisabled
            }"
            :disabled="isDisabled"
            @click="selectAnswer(answer)"
          >
            {{ answer.text }}
          </button>
        </div>
      </div>
      <button
        id="next-btn"
        :disabled="!isNextButtonVisible"
        @click="handleNextButton"
      >
        Próxima
      </button>
    </div>
    <div v-else>
      <h2>Quiz Completo!</h2>
      <p>Seu resultado: {{ score }} de {{ questions.length }}</p>
      <button id="retry-btn" @click="startQuiz">Tentar Novamente</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          question: "Em que ano ela nasceu?",
          answers: [
            { text: "1987", correct: false },
            { text: "1988", correct: false },
            { text: "1989", correct: true },
            { text: "1990", correct: false }
          ]
        },
        {
          question: "Qual o nome do gato mais antigo dela?",
          answers: [
            { text: "Benjamin", correct: false },
            { text: "Meredith", correct: true },
            { text: "Olivia", correct: false },
            { text: "Burt", correct: false }
          ]
        },
        {
          question: "Qual o número da sorte dela?",
          answers: [
            { text: "22", correct: false },
            { text: "54", correct: false },
            { text: "87", correct: false },
            { text: "13", correct: true }
          ]
        },
        {
          question: "Com quem ela namora?",
          answers: [
            { text: "Travis Kelce", correct: true },
            { text: "Joe Alwyn", correct: false },
            { text: "Calvin Harris", correct: false },
            { text: "Harry Styles", correct: false }
          ]
        },
        {
          question: "Qual seu último álbum lançado?",
          answers: [
            { text: "Fearless", correct: false },
            { text: "Lover", correct: false },
            { text: "Midnights", correct: true },
            { text: "reputation", correct: false }
          ]
        }
      ],
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isDisabled: false
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    isNextButtonVisible() {
      return this.selectedAnswer !== null;
    }
  },
  methods: {
    startQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.selectedAnswer = null;
      this.isDisabled = false;
    },
    selectAnswer(answer) {
      if (this.isDisabled) return; // Não permite selecionar se já foi desativado
      this.selectedAnswer = answer.text;
      this.isDisabled = true;
      if (answer.correct) {
        this.score++;
      }
    },
    handleNextButton() {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.isDisabled = false; // Habilita para a próxima pergunta
      if (this.currentQuestionIndex >= this.questions.length) {
        this.isNextButtonVisible = false;
      }
    }
  },
  mounted() {
    this.startQuiz();
  }
};
</script>

<style scoped>
@font-face {
    font-family: Ralphie;
    src: url('@/assets/font/Ralphie.otf');
}

* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
}

body {
    background-image: url('https://imgur.com/a/Ufne1fg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.app {
    background: radial-gradient(circle, rgb(164, 114, 226) 9%, 
    hsla(267, 62%, 71%, 1) 50%, hsla(267,npm run build -- --clean 57%, 78%, 1) 99%);
    --webkit-box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.35);
    -moz-box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.35);
    box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.35);
    border-radius: 10px 20px;
    padding: 30px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
}

.app h1 {
    font-family: Ralphie;
    font-size: 30px;
    color: #000000;
    font-weight: 600;
    padding-bottom: 30px;
    margin-right: 30px;
}

.quiz {
    padding: 20px 0;
    border-left: 1px solid #333;
    padding-left: 9%;
}

.quiz h2 {
    font-size: 18px;
    color: #333;
    font-weight: 600;
}

.btn {
    background: #fff;
    color: #222;
    font-weight: 500;
    width: 100%;
    border: 1px solid #222;
    padding: 10px;
    margin: 10px 0;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.btn:hover:not([disabled]) {
    background: #222;
    color: #fff;
}

.btn:disabled {
    cursor: no-drop;
}

#next-btn {
    background: #4d4d4d;
    color: #fff;
    font-weight: 500;
    width: 150px;
    border: 0;
    padding: 10px;
    margin: 20px auto 0;
    border-radius: 4px;
    cursor: pointer;
    display: block;
}

#retry-btn {
    background: #4d4d4d;
    color: #fff;
    font-weight: 500;
    width: 150px;
    border: 0;
    padding: 10px;
    margin: 20px auto 0;
    border-radius: 4px;
    cursor: pointer;
    display: block;
}

.correct {
    background: #9aeabc;
}

.incorrect {
    background: #ff9393;
}
</style>
