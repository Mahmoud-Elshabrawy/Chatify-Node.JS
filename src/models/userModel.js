const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email required"],
            unique: [true, "email must be unique"],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "password required"],
            minlength: [6, "Too short password"],
            trim: true,
        },
    },
    {
        timestamps: true
    }
)



UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12)
})


const User = mongoose.model('User', UserSchema)
module.exports = User