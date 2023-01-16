
process.env.OPENAI_API_KEY;

//1st api request
  //Initial call w/ theme and prompt
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "PROMPT_WITH_THEME",
  max_tokens:350,
  temperature: 0,
});   

  // User input from initial prompt => 2ndFunction() {responseChain()}

//2nd function 
  // next with either 1 2 or 3.
  //that takes the first response from the AI
  //Generator? Repeating
  // responses => printResponse()
  // responses => imageGenerator() => printImage()

//3rd function handle image generation ^response from 1st request