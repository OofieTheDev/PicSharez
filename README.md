# PicSharez
<!--![PicSharez Logo](/src/images/tsuki-red.png)-->

## :thinking: How To Run the App
In the main folder, run
> npm start

This will startup the React frontend at [http://localhost:3000](http://localhost:3000).

Next, cd into the react-backend-1 folder and run
> nodemon app.js

This will startup an Express server on Port `3001`.

From thereon, the application should work as expected.

## :eyes: Introduction
I embarked on this project to practice the following:

- Connecting React to a backend
- Authentication
- React Router V6
- My React skills in general


This was also my **first** time connecting React to a backend, so don't judge. It's also my **first** time writing a README.md, I *hope* it turns out good, or at least decent.

## :computer: Overview
The Frontend of this project is 100% made with React.js, along with standard CSS. No CSS libraries are used, and the React frontend runs on Port `3000`. React Router V6 is also used to handle routing, as well as provide the little red underlines in the NavBar depending on which route the user is at.

The Backend of this project uses Node.js along with Express.js, whereas authentication is handled by a Passport.js Local Strategy, allowing users to sign up/login in the standard way (i.e. using a Username/Email & Password). OAuth is not implemented at the moment. For storing the information of the users, MongoDB is used (locally), and the email/username is stored in plaintext while the password is hashed using bcrypt, with a cost factor of `12`. The Express server runs by default on Port `3001`.

The authentication is session-based and the information of the session cookies, along with the relevant details (e.g. expiry date), is also stored in MongoDB.

## :chart_with_upwards_trend: Things I Learnt
This project took me about 4 days to complete. 

During this period, I managed to practice the skills I mentioned in the introduction. I  also learnt about CORS (cross-origin resource sharing), which was necessary as my React frontend and the Express backend were running on different ports. Implementing the like/dislike system also gave me an opportunity to use the React Hook useReducer in one of my projects for the first time, as previously I only relied on useState. Another React hook that I had plenty of opportunities to practice due to this project was useEffect, as I had to use it for numerous calls to my backend to fetch the necessary info.

## :white_check_mark: Conclusion
This project was a pretty good way for me to solidify my React knowledge. It covered `event handling`, `controlled inputs/forms`, many React Hooks such as `useEffect`, `useState`, `useReducer` et Cetera, as well as `conditional rendering` and `props`. It also opened my eyes as to how React could be used in conjunction with a backend to build a full-stack Web application.

Lastly, I would like to thank [@Zid-er](https://github.com/Zid-er) for inspiring me to build this in the first place, lol.
