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