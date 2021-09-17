import mongoose from 'mongoose'

export {
  Media
}

const mediaSchema = new mongoose.Schema({
  type: String,
  title: {type: String, required: true},
  backdrop_path: String,
  poster_path: String,
  release_date: Date,
  api_id: Number,
  collected_by: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
}, {
  timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);