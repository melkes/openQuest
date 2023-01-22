import "../src/css/style.css";
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
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: .7,
    
    

  });

  return response;
}

// `
// PROMPT 1
// You find yourself standing in a clearing surrounded by tall trees and shady bushes. The sun is shining, but there is a chill in the air. In the center of the clearing is a large, ancient stone statue of a dragon. Its eyes seem to be watching you.
// Feature> Ancient Stone Dragon Statue
// Do you:
// A) Approach the statue cautiously
// B) Take a closer look
// C) Turn and run away

// PROMPT2
// You find yourself standing in a clearing surrounded by tall trees and shady bushes. The sun is shining, but there is a chill in the air. In the center of the clearing is a large, ancient stone statue of a dragon. Its eyes seem to be watching you.
// Feature> Ancient Stone Dragon Statue
// Do you:
// A) Approach the statue cautiously
// B) Take a closer look
// C) Turn and run away

// Option 1: You cautiously approach the statue, and as you get closer, you notice that its eyes are glowing. You can feel a strange energy coming from it. Suddenly, the statue begins to move and it speaks to you in a deep and commanding voice.
// Feature> Moving Dragon Statue
// Do you:
// A) Ask it a question
// B) Stand and listen
// C) Flee in terror

// `

//loading function ()
//image loading function()
// grab the response and parse from the initial send. needs to split up the scene





async function createImage(imgPrompt) {
  const response = await openai.createImage({
    prompt: `${localStorage.theme} ${imgPrompt}`,
    n: 1,
    size: "256x256",
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
        img.width = '256';
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

function gameLoop() {
  // imageDoneLoading();
  imageLoading();
  getAPIData()
    .then(function (response) {
      localStorage.runningPrompt += response.data.choices[0].text;
      // only handles single response - need to account for full history in response👍

      console.log(response);
      let scene;
      let feature;
      let remainder;
      let choices;
      if (response.data.choices[0].text.includes('Feature>')) {
        [scene, remainder] = response.data.choices[0].text.split('Feature>');
        [feature, choices] = remainder.split('\n');
        
      } else {
        scene = response.data.choices[0].text.split('\n');
        feature = null;
      }      
      console.log(scene);
      console.log(remainder);
      console.log(feature);
      console.log(choices);
      const [choice1, choice2, choice3] = response.data.choices[0].text.split('\n').slice(-3);  //feature might break

      //picture
      updateScene(scene, feature);
      
      //update options
      updateOptions(choice1, choice2, choice3);
      doneLoading(); 
    })
    .catch(emailAmbi);

  // printResponse(response);
  //print response
  //reads options
  //handler function assigns to 3 buttons
  //on click updates local.storage
  //with new line opt 1 2 3
  //runs getAPIData()
  //re-run parsefuncion(new response);

  // document.getElementById. .. . . .

  // localStorage.runningPrompt
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
  const imageSource = "./assets/images/loading.gif"
  
  const imageTag = document.createElement("img");
  imageTag.setAttribute("id", "loadingImage");
  imageTag.setAttribute("src", imageSource);
  imageTag.width='256'
  const imgDiv = document.getElementById("image");
  imgDiv.append(imageTag);
  // imageTag.src = imageSource;
}
// function imageDoneLoading(){
//   let loadingImage = document.getElementById("loadingImage");
//   loadingImage.removeAttribute('img');
  
// }
function doneLoading(){
  const loadingText = document.getElementById("loading");
  const buttons = document.getElementById("playerInput");
  const loadingDots = document.getElementById("loadingDots");
  loadingDots.classList.add("hidden");
  loadingText.classList.add("hidden");
  buttons.classList.remove("hidden");
}

function startGame(){
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
    localStorage.runningPrompt += `${JSON.parse(localStorage.choices)[button.id]}`;
    
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