# Notifier

The notifier app is a prototype that consists of 3 Components

## The Notifier Client
This SPA listens to a socket connection and receives updates when new games,
events and messages are broadcasted by the administrator.

### DEMO : https://notifierapp.herokuapp.com

## The Admin App
The administration application can broadcast to all those who are using the Notifier Client.

### DEMO : https://notifierapp.herokuapp.com/admin

## Server API
This is responsible for creating webSocket connections and keeping track of all active users at a given time.

## Running locally

### npm start-dev
This will run an Express server and serve the Notifier and Admin apps.

### npm test
This will execute the test suites with jets.