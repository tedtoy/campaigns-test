FYI This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


I opted to implement my solution in React, using an express server (with no database) as an API endpoint for the project data. Various libraries are included as necessary, such as reactstrap (bootstrap), react-icons (mainly font-awesome) and various utilities. The interface has responsive features that should enable a reasonable experience on mobile devices.


## Install
### `npm install`

## Run
### `npm start`
npm start will run the webpack server included with create-react-app, start the node.js express server, and initialize the sass watchers. It should also launch a browser pointing at 'http://localhost:3000/' from where the campaign dashboard should be viewable.


I am using localhost:3000 for the webpack server and localhost:8080 for the express server. Make sure those ports are open before running!

It should look like this:

![alt text](https://github.com/tedtoy/campaigns-test/blob/master/campaign-screenshot.png)
