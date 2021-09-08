import Vote from '../models/votesModel.js';

// GET ALL VOTES
const getAllVotes = (req, res) => {
  Vote.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
const addVoteToSingleTeam = (req, res) => {
  Vote.findOne({ team_Id: req.params.id })
    .then((data) => {
      data.votes += req.body.value;
      const newVote = new Vote(data);
      Vote.findOneAndUpdate({ team_Id: req.params.id }, newVote).then((data) =>
        res.json({ message: 'Voted succesfully' })
      );
    })
    .catch((err) => console.log(err));
};

export { getAllVotes, addVoteToSingleTeam };
