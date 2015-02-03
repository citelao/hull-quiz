Quizz Ship
==========

Simple quizz ship made with Aura components.

## Manifest URL

    https://hull-ships.github.io/quiz/manifest.json

## Options

- **`logo image`**
- **`background image`**
- **`background image opacity`**
- **`background image blur`**
- **`background_color`**
- **`text_color`**
- **`button_background_color`**
- **`button_text_color`**

## Developing

- Ensure that [Node.js](http://nodejs.org), [Bower](http://bower.io/) and [Grunt](http://gruntjs.com) are installed.
- Run `npm install && bower install` to ensure the required dependencies are installed.
- Run `grunt --dev` and visit [http://0.0.0.0:8033](http://0.0.0.0:8033).

Your manifest file and assets must be publicly available to install your ship.
When developing locally the easiest way is to share your 'dist' folder on Dropbox or to use [ngrok](https://ngrok.com).


## Deploying

## To Github Pages

To deploy to github pages, just run `grunt deploy`.

## Anywhere else

Run `grunt build` and upload the `dist` folder to your web server.

