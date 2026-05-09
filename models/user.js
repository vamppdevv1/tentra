//!requiring
const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const {Schema} = mongoose
//!user schema
const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    }
})
//!passport setting
userSchema.plugin(passportLocalMongoose.default)
//!exporting
module.exports = mongoose.model("User", userSchema)