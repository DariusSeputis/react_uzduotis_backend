import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
  team_Id: {
    type: String,
    require: true,
  },
  votes: {
    type: Number,
    required: true,
  },
});

const Vote = mongoose.model('vote', voteSchema);
export default Vote;
