# Race Management System

This is a web-based system that can be used by the teacher to capture and display the
information of the race day at school.

This system is developed in full stack, frontend is using React,TS, backend is using Nodejs, expressjs. Both frontend and backend are tested with Jest and achived 100% test coverage.

## Project

### Frontend

- add new race
- view all races
- record final placements

### Backend

- /api/races GET Fetch all races
- /api/race POST Added new race
- /api/race/:id PUT ecord final placements

## Scripts

In this project, you can run

```js
// start server
cd backend
npm install
npm start

npm run test -- --watchAll=false  --coverage

// start app
cd frontend
npm install
npm start

npm run test -- --watchAll=false  --coverage
```
