import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {
  getTeamsCollection,
  getSingleTeamFromCollection,
  addNewTeamToCollection,
  logInTeam,
  addVotedToSingleTeam,
} from './controllers/teamController.js';

import {
  getAllVotes,
  addVoteToSingleTeam,
} from './controllers/voteController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Conecting MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((res) => {
    console.log('MongoDB connected..');
    // Starting server
    app.listen(PORT, () => console.log(`Server is runing on port ${PORT}...`));
  })
  .catch((err) => console.log(err));

// Routes
// - GET
// -- Get all from Team collection
app.get('/teams', getTeamsCollection);
// -- Get single team data
app.get('/teams/:id', getSingleTeamFromCollection);
// -- Get all votes
app.get('/votes', getAllVotes);
// - POST
// -- Add new team to Team collection
app.post('/teams/signup', addNewTeamToCollection);
// -- Login team
app.post('/teams/login', logInTeam);
// - PUT
// -- adding vote status to a single team
app.put('/teams/:id', addVotedToSingleTeam);
// -- adding vote to vote collection
app.put('/votes/:id', addVoteToSingleTeam);
