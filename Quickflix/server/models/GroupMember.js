import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const GroupMemberSchema = new Schema({
    groupId: { type: ObjectId, required: true, ref: 'Group' },
    accountId: { type: ObjectId, required: true, ref: 'Account' }
}, {
    timestamps: true, toJSON: { virtuals: true }
})

GroupMemberSchema.virtual('group', {
    localField: 'groupId',
    foreignField: '_id',
    ref: 'Group',
    justOne: true
})

GroupMemberSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})