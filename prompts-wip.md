# Prompts for testing out game design

1. "Escape the Haunted Mansion"
You're a brave adventurer trapped in an old, haunted mansion, trying to escape before it's too late.

1) Look for hidden passages and secret keys to unlock the front door. 
2) Investigate strange noises and ghostly apparitions to uncover the mansion's dark secrets. 
3) Survive deadly traps and malevolent spirits to make your way to the attic, where the final escape awaits.

2. Superhero Story: 
You suddenly develop superpowers overnight. You must decide whether to use your newfound abilities to help fight crime, use them to gain fame and fortune, or to keep them a secret and live a normal life. 

1)Use your powers to fight crime and become a hero in your city
2)Use your powers to become famous and make a fortune, even if it means exploiting your abilities for personal gain.
3)Keep your powers a secret and try to live a normal life, trying to avoid any attention or responsibility that comes with being a superhero.

3. Detective Mystery: 
You are a detective investigating a murder. You must decide whether to follow the clues to the killer, attempt to pin the crime on an innocent suspect, or try to uncover a larger conspiracy behind the crime.

1)Follow the trail of evidence to find the real killer, even if it leads to unexpected places.
2)Use your detective skills to manipulate the evidence and pin the crime on a convenient suspect, even if they are innocent.
3)Dive deeper into the investigation to uncover any possible connections or motives behind the murder that may lead to a larger conspiracy.

4. "Uncover the Ancient Mystery"
You're an archaeologist, on the hunt for ancient artifacts and uncovering long-forgotten secrets.

1) Explore ancient ruins and decipher hieroglyphs to unlock the secrets of the past. 
2) Search for hidden tombs and lost treasures. 
3) Face deadly traps and uncover the truth behind the ancient civilization.

# Initial prompts to tell GPT3 what we want, w/user generated theme

1. Create an prompt for a text adventure/interactive fiction style game. After the prompt, provide 2-3 choices for the player. The player will send back one of the prompts as their choice. This will result in another prompt with 2-3 choices, sending the player through a series of scenes that result in an ending appropriate to the theme (eg, find the treasure, die, escape etc). If there already is a prompt, assume the game has started and imagine what the next prompt would be. The theme of this game is: `survival`, and the player's character name is: `Fozzie`.

  * This seems to work, then after the second prompt is generated, my response gives an error: 
  > The model predicted a completion that begins with a stop sequence, resulting in no output. Consider adjusting your prompt or stop sequences.

2. I grew frustrated and asked chatGPT what to write for this. Its advice:
> To generate prompts, player choices, and story using GPT-3, you'll
> want to give it a prompt that includes the following information:
> 
> 1.  The theme of the game (e.g. "survival", "mystery", etc)
> 2.  The character name
> 3.  Specific context and instructions for the current situation in the game, e.g.
> 
> -   A description of the current location
> -   The task the player must accomplish
> -   Any special items or abilities the player has
> -   Any information the player has learned so far
> -   The possible actions the player can take
> 
> Example:
> 
> "You are [character name], stranded on a deserted island. Your goal is
> to survive by finding food and shelter. You have a compass, a knife
> and a map. You can either search for food, explore the island, or
> build a shelter. What would you like to do?"
> 
> When providing prompts to GPT-3, it's important to be as specific as
> possible about the current situation and the actions the player can
> take. This will help the model to generate more accurate and relevant
> responses.

Working on a prompt that takes this advice and tells it to generate specific context and instructions given the theme and name.

3. Greg is a choose-your-own-adventure generator in a fantasy setting. He gives the user a scene description of between 100 and 200 words that contains one distinct feature or character. At the end of the scene description, he names and describes that feature on its own line in exactly 5 words, prefixed with the word "Feature>". Greg then offers three choices, each on their own line, for the user to select to move onto the next scene. After 3 scenes, he concludes the adventure. Do not include a scene title.;

3. You are a choose-your-own-adventure generator in an `apocalyptic` setting. You give me, the user, a scene description of no more than 200 words. Then you offer three choices for me to select to move onto the next scene. After 5 scenes, you conclude the adventure and offer a conclusion of no more than 200 words.