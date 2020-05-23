# SoPra FS20 - Group 03 - Client

## Introduction
This is the front-end part of the Board Game [Just One](https://justone-the-game.com/). It was built during the course 'SoPra'
at the University of Zurich.

## Technology stack
* React JS - User interface
* Redux - State management
* npm - Package management 
* Heroku - Deployment
* SonarQube - Code Quality Control

##  Main Components

###  Registration/Login
The Registration and Login pages are the entry point for every user that opens the game. Users can create a new account
or login with existing credentials. This takes them to the lobby page.

### Lobby
The [Lobby](/src/components/lobby/Lobby.js) is where users can create and join games. It also lets users access their
profile page and view the game history. After creating a game users wait for other players to join their game until they can start it.
If they join a game they have to wait for the creator to start the game. This takes them to the gameplay component.

### Gameplay
The gameplay component is where the actual gameplay happens.

## Prerequisites and Installation

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
