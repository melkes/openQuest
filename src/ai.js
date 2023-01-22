// Image generation api call
// size of 256x256, 512x512, or 1024x1024 pixels
// Smaller sizes are faster to generate
// n parameter is the number of photos generated

// response image_url = response.data.data[0].url;

// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.createImage({
//   prompt: "FEATURE PROMPT",
//   n: 1,
//   size: "256x256",
// });



// const { Configuration, OpenAIApi } = require("openai");
// process.env.OPENAI_API_KEY;

// //1st api request
//   //Initial call w/ theme and prompt
// // const { Configuration, OpenAIApi } = require("openai");
// const openai = new OpenAIApi(configuration);
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// export default async function (req, response) {
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: generatePrompt(req),
//     max_tokens:350,
//     temperature: 0.6,
//   });
//   response.status(200).json({result: completion.data.choices[0].text})   

// }

// function generatePrompt(prompt){
//   return `${prompt}`
// }

  // User input from initial prompt => 2ndFunction() {responseChain()}

//2nd function 
  // next with either 1 2 or 3.
  //that takes the first response from the AI
  //Generator? Repeating
  // responses => printResponse()
  // responses => imageGenerator() => printImage()

//3rd function handle image generation ^response from 1st request