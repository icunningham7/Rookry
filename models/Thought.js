const { Schema, model } = require('mongoose');
const { Thought } = require('.');

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
            type: Schema.Types.ObjectId,
            required: true
        },
        reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction'}]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

reactionSchema.virtual('getCreatedAtDate').get(() => {
    return `${new Date(this.createdAt).getMonth() + 1}/${new Date(this.createdAt).getDate()}/${new Date(this.createdAt).getFullYear()}`;
});

module.exports = Thought;