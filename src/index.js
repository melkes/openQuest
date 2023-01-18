import '../src/css/style.css'
const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getAPIData() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: localStorage.runningPrompt,
    max_tokens:350,
    temperature: 0,
  });
  return response;
}

function startGame(){
  const theme = document.getElementById('themeInput').value || 'fantasy';
  initializePrompt(theme);
  let startBox = document.getElementById("startBox");
  startBox.classList.add("hidden");
  let gameBox = document.getElementById("gameBox");
  gameBox.classList.remove("hidden");
  getAPIData().then(function (resp) {console.log(resp)})
}

function initializePrompt(theme) {
  localStorage.runningPrompt = `Greg is a choose-your-own-adventure generator in a ${theme} setting. He gives the user a scene description of between 100 and 200 words that contains one distinct feature or character. At the end of the scene description, he names and describes that feature in exactly 5 words, prefixed with the word "Feature>". Greg then offers three choices for the user to select to move onto the next scene. After 3 scenes, he concludes the adventure.`;
}

document.getElementById("startButton").addEventListener('click', startGame);
