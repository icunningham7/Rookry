const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // TODO: Figure out matching validation
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}], // Array of _id of values ref Thought model
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Array of _id of values ref User model
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});

// TODO: Add virtual friendCount

const User = model('User', userSchema);

module.exports = User;