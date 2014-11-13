Quiz Ship
=========

Simple quizz ship made with Hull component.

## Manifest URL

```
https://hull-ships.github.io/quiz/manifest.json
```

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

- Ensure that [Node.js](http://nodejs.org), [Bower](http://bower.io/) and [Gulp](http://gulpjs.com/) are installed.
- Run `npm install` to ensure the required dependencies are installed.
- Run `gulp --dev`.

Your manifest file and assets must be publicly available to install your ship.
When developing locally the easiest way is to share your 'dist' folder on Dropbox or to use [ngrok](https://ngrok.com).

## Deploying

## To Github Pages

To deploy to github pages, just run `gulp deploy`.

## Anywhere else

Run `gulp build` and upload the `dist` folder to your web server.

