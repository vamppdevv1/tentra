//!requiring
const mongoose = require("mongoose")
//!review schema
const reviewSchema = new mongoose.Schema({
    body: String,
    rating: Number,
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
//!exporting
module.exports = mongoose.model("Review", reviewSchema)