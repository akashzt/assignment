const mongoose=require('mongoose');
const userSchema =mongoose.Schema({
    userName: {
        type: String,
        required: [true,"please enter email address"],
        unique:true,
    },
    age: { type: Number, required: true },
    hobbies: { type: [String],  required: [true,"please enter hobbies"],},
      createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);