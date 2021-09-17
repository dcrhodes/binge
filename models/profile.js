import mongoose from 'mongoose'

export {
  Profile
}

const profileSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    avatar: String,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
    media: [{type: mongoose.Schema.Types.ObjectId, ref: "Media"}]
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('Profile', profileSchema)
