import Team from '../models/teamModel.js';
import Vote from '../models/votesModel.js';

// GET ALL DATA FROM TEAM COLLECTION
const getTeamsCollection = (req, res) => {
  Team.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

// GET SINGLE TEAM DATA FROM TEAM COLLECTION BY TEAM ID
const getSingleTeamFromCollection = (req, res) => {
  let teamId = req.params.id;
  Team.findById(teamId)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

// ADD NEW TEAM TO TEAM COLLECTION
const addNewTeamToCollection = (req, res) => {
  const newTeam = new Team(req.body);
  let team = req.body;
  newTeam.voted = false;
  Team.find().then((result) => {
    const teamExists = result.some((teamInDB) => teamInDB.email === team.email);
    if (teamExists) {
      res.json({
        registrationStatus: 'failed',
        message: 'Team with given email already exists',
      });
    } else {
      newTeam
        .save()
        .then((data) => {
          let { _id } = data;
          res.json({
            registrationStatus: 'success',
            teamId: _id,
          });
          const newVote = new Vote({ team_Id: _id, votes: 0 });
          newVote.save().catch((err) => console.log(err));
        })
        .then(() => {})
        .catch((err) => console.log(err));
    }
  });
};

// VERIFY LOGIN FOR TEAM(USER)
const logInTeam = (req, res) => {
  let team = req.body;

  Team.find().then((result) => {
    let teamFound = result.find(
      (teamFromDB) =>
        teamFromDB.email === team.email && teamFromDB.password === team.password
    );

    if (teamFound) {
      let { _id } = teamFound;

      res.json({
        loginStatus: 'success',
        teamId: _id,
      });
    } else {
      res.status(401).json({
        loginStatus: 'failed',
        message: 'Given email or password is incorrect',
      });
    }
  });
};

// adding voted status to a single team
const addVotedToSingleTeam = (req, res) => {
  // console.log(req.params.id);
  let teamId = req.params.id;
  Team.findByIdAndUpdate(teamId, { voted: true })
    .then((data) => res.json({ message: 'Vote registered successfuly' }))
    .catch((err) => console.log(err));
};

export {
  getTeamsCollection,
  addNewTeamToCollection,
  logInTeam,
  getSingleTeamFromCollection,
  addVotedToSingleTeam,
};
