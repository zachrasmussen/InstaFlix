import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const GroupSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 100 },
  creatorId: { type: ObjectId, ref: 'Account' }
},
  { timestamps: true, toJSON: { virtuals: true } }

)

GroupSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})