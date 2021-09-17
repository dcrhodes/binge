import mongoose from 'mongoose'

export {
  Review
}

const reviewSchema = new mongoose.Schema({
  content: String,
  rating: {type: Number, min: 1, max: 10},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  media: {type: mongoose.Schema.Types.ObjectId, ref: "Media"}
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);