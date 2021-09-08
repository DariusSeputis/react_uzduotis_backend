import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  voted: {
    type: Boolean,
    required: true,
  },
});

const Team = mongoose.model('team', teamSchema);
export default Team;
