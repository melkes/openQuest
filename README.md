
# openQuest
![](/assets/images/currency.jpg "currency image")
---
#### By Ambi Hidalgo, Dani Steely, Cameron Abel, Mike Wilkes & Tyler Quinn
###### ambio.pk@gmail.com
danisteelyart@gmail.com
tyler.quinn032@gmail.com
mw.wilkes@gmail.com
cameronabel@gmail.com

###### Background image by Jeremy Perkins https://unsplash.com/@jeremyperkins
###### Earth .gif by NASA

---

####  openQuest
Is an AI-driven text-adventure game developed during students' first Team Week at Epicodus. Utilizing openAI's API beta, openQuest proceduerally generates a text-adventure game through chained API calls to the davinci-3-model; creating a unique experience everytime. Key feature information in prompts are then used to make a second call to openAi's Dalle 2 model to generate an image for every scene. 
## Technologies Used
* openAi's API beta
* Davinci-3-Model
* Dalle 2 Stable Diffusion Model
* node
* npm
* Javascript
* CSS
* HTML

## Setup/Installation Requirements
Note: you will need your own API key from openAI to be able to play this game. 
A free API key for for  can be found [here](https://beta.openai.com/docs/api-reference/authentication).
* Clone this repository (https://github.com/ambibma/https://github.com/ambibma/teamWeek-1)
* using terminal to navigate to teamWeek-1 repository file
* Once in the project directory
  ```bash
    $ npm install
    $ npm run build
    ```
* Once in the repo file you will need to add folder in main directory called: ".env"
    ```bash
    $ touch .env
    ```
* Add your API Key to the .env file using the following syntax
    ```javaScript
    OPENAI_API_KEY={API KEY GOES HERE}
    ```
* In index.js there is a variable stored in a configuration constructor of the openAi object on line 7 of the code. If done correctly you should be able to use the program after doing
    ```bash
    $ npm run start
    ```

## Known Bugs

* Choices are sometimes not correctly parsed into the buttons of the game
send bug concerns to ambio.pk@gmail.com

## License


Copyright (c) Ambi Hidalgo 2022