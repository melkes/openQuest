import "../src/css/style.css";
const { Configuration, OpenAIApi } = require("openai");

const CREDITS = "Greg after this input I will be done playing. Can you give me an end of game summary with credits Game Design Team: Mike and Tyler. Main Parser: Cameron. CEO: Ambi. Everything Else Dani. And give yourself credit too Greg.";
const MAX_TURNS = 8;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getAPIData() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: localStorage.runningPrompt,
    max_tokens:350,
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: .7,
  });
  return response;
}

async function createImage(imgPrompt) {
  const response = await openai.createImage({
    prompt: `${localStorage.theme} ${imgPrompt}`,
    n: 1,
    size: "512x512",
  });
  console.log(response.data.data[0].url);
  console.log(openai);
  return response.data.data[0].url;
}

function updateScene(scene, feature=null){
  if (feature) {
  
    createImage(feature)
      .then(function(url){
        const img = document.getElementById("loadingImage");
        img.setAttribute('src', url)
        // img.src = url;
        img.width = '386';
        document.getElementById('image').append(img);
       
      })
      .catch(function(error) {document.getElementById('image').innerText = error;});
      
    //document.getElementById("dumpImage").innerText = feature;
  }
    
  document.getElementById("aiInput").innerText = scene;
  
}

function updateOptions (choice1, choice2, choice3) {
  document.getElementById('input1').innerText = choice1;
  document.getElementById('input2').innerText = choice2;
  document.getElementById('input3').innerText = choice3;
  let choices = {
    input1: choice1,
    input2: choice2,
    input3: choice3,
  };
  localStorage.choices = JSON.stringify(choices);

}

function emailAmbi() {
  document.getElementById("aiInput").innerText =
    "You broke it! Email ambio.pk@gmail.com to complain.";
}

function parseSingleLine(text) {
  let scene;
  let feature;
  let remainder;
  let choices;
  let [choice1, choice2, choice3] = ['', '', ''];
  if (text.includes('Feature>')) {
    [scene, remainder] = text.split('Feature>');
  }
  if (text.includes(':')) {
    [feature, choices] = remainder.split(':');
  } else {
    [feature, choices] = remainder.split('. ');
  }
  [,choice1, choice2, choice3] = choices.split(/[ABC123][.)] /);
  return [scene, feature, choice1, choice2, choice3];
}


function parseResponseText(text) {
  text = text.trim()
  if (text === "") {
    throw new Error('reponse contained no text');
  }
  if (text.split('\n').length === 1) {
    return parseSingleLine(text);
  }
  let scene;
  let feature;
  let remainder;
  let choices;
  if (text.includes('Feature>')) {
    [scene, remainder] = text.split('Feature>');
    [feature, choices] = remainder.split('\n');
    
  } else {
    scene = text.split('\n')[0];
    feature = null;
  }
  const [choice1, choice2, choice3] = text.split('\n').slice(-3);

  return [scene, feature, choice1, choice2, choice3];
}

function gameLoop() {
  localStorage.counter ++;
  imageLoading();
  getAPIData()
    .then(function (response) {
        if (parseInt(localStorage.counter) > MAX_TURNS) {
          updateScene(response.data.choices[0].text)
          // hidebuttons etc
          return;
        }
        localStorage.runningPrompt += response.data.choices[0].text;
        const [scene, feature, choice1, choice2, choice3] = parseResponseText(response.data.choices[0].text)
        updateScene(scene, feature);
        updateOptions(choice1, choice2, choice3);
        doneLoading();
      })
    .catch(emailAmbi);
}

function loading(){
  const loadingText = document.getElementById("loading");
  const loadingDots = document.getElementById("loadingDots");
  loadingDots.classList.remove("hidden");
  loadingText.classList.remove("hidden");
}
function imageLoading(){
  // const imageLoad = document.getElementById("loadingImage");
  document.getElementById("image").innerText = null;
  const imageSource = "https://i.gifer.com/origin/d3/d3da9b146d9472bbc97bdad44151baa0.gif"  
  const imageTag = document.createElement("img");
  imageTag.setAttribute("id", "loadingImage");
  imageTag.setAttribute("src", imageSource);
  imageTag.width='386'
  const imgDiv = document.getElementById("image");
  imgDiv.append(imageTag);
  // imageTag.src = imageSource;
}

function doneLoading(){
  const loadingText = document.getElementById("loading");
  const buttons = document.getElementById("playerInput");
  const loadingDots = document.getElementById("loadingDots");
  loadingDots.classList.add("hidden");
  loadingText.classList.add("hidden");
  buttons.classList.remove("hidden");
}

function startGame(){
  localStorage.counter = 0;
  loading();
  const theme = document.getElementById('themeInput').value || 'fantasy';
  localStorage.theme = theme;
  localStorage.choices = {};
  initializePrompt(theme);
  let startBox = document.getElementById("startBox");
  startBox.classList.add("hidden");
  let gameBox = document.getElementById("gameBox");
  gameBox.classList.remove("hidden");
  //printResponse();
  //gameLoop()
  //getAPIdata()
  //.then()
  //or parser
  //or display thing
  // and buttons => 

  gameLoop();
  //getAPIData().then(function (resp) {console.log(resp)})
}


//make sure we define choices with 1,2,3 *
function initializePrompt(theme) {
  localStorage.runningPrompt = `Greg is a choose-your-own-adventure generator in a ${theme} setting. He gives the user a scene description of between 100 and 200 words that contains one distinct feature or character. At the end of the scene description, he names and describes that feature on its own line in exactly 5 words, prefixed with the word "Feature>". Greg then offers three choices, each on their own line, for the user to select to move onto the next scene. After 10 scenes, he concludes the adventure. Do not include a scene title.`;
}

document.getElementById("startButton").addEventListener('click', startGame);
Array.from(document.getElementsByClassName('selection')).forEach(function(button){
  button.addEventListener('click',function (event) {

    localStorage.runningPrompt += `\n\nUser selects "${JSON.parse(localStorage.choices)[button.id]}"\n`;
    if (localStorage.counter === MAX_TURNS.toString()) {
      localStorage.runningPrompt += CREDITS;
    }
    gameLoop();
  });
});

document.getElementById("menu").addEventListener("change", function() {
  let selectedOption = this.value;
  if (selectedOption === "option1") {
    document.getElementById("themeInput").value = "Survival"; // For example
    document.getElementById("nameInput").value = "Gwylnagore"; // For example
  } else if (selectedOption === "option2") {
    document.getElementById("themeInput").value = "Post-apocalyptic"; 
    document.getElementById("nameInput").value = "Bogdan"; 
  } else if (selectedOption === "option3") {
    document.getElementById("themeInput").value = "Fantasy"; 
    document.getElementById("nameInput").value = "Nafraulos"; 
  }
});