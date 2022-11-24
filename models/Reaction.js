const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            transform: getCreatedAtDate,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
        _id: false
    }
);

function getCreatedAtDate() {
    return `${new Date(this.createdAt).getMonth() + 1}/${new Date(this.createdAt).getDate()}/${new Date(this.createdAt).getFullYear()}`;
};


module.exports = reactionSchema;