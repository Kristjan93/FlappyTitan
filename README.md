# Fun game implemented using only HTML, CSS and JavaScript.
> Might have gone a bit overboard with the sound effects but there is a mute button if that's your style.

This game was inspired by the popular anime series Attack on Titan and the Flappy Bird game.
The project has the following attributes:

* All functionality requirements given in the project description were met and more.
* A simple game loop which calculates delta and can be started and stopped.
* A flying Captain Levi looking for titans inside the walls of Shiganshina.
* All positions and sizes defined using a 10px em. This means that the game could be scaled up and down by changing the base font-size. This is one way to make the graphics responsive.
* Adaptable full screen game canvas.
* jQuery mobile was used to integrate smartphone usage for our game. Tested and works on iOS devices (Chrome browser)
* All moving graphics were rendered in 3d taking advantage of full hardware acceleration).

## Check it out (Warning music is high)
[Flappy Titan Game !](https://flappy-titan-game.herokuapp.com/)

## Setup
Make sure you have bower and grunt installed.
```
npm install -g bower grunt
```
Clone the repository and run the following.
```
cd FlappyTitan/
npm install
bower install
grunt server
```

## Develoers note:
Our game was developed and optimized with and for the Google Chrome browser as well as the iPhone 6plus Chrome browser app.
All though the game is playable on every screen size it's most enjoyable when the screen isn't all too big e.g. 15 inch retina big.




