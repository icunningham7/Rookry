const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username:
        {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            },
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

thoughtSchema.virtual('getCreatedAtDate').get(() => {
    return `${new Date(this.createdAt).getMonth() + 1}/${new Date(this.createdAt).getDate()}/${new Date(this.createdAt).getFullYear()}`;
});

const Thought = model('Thought', thoughtSchema);

// TODO: Add virtual reactoinCount


module.exports = Thought;