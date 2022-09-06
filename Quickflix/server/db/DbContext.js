import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ContentSchema } from '../models/Content';
import { GroupSchema } from "../models/group";
import { GroupMemberSchema } from '../models/GroupMember';
import { ValueSchema } from '../models/Value'
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Groups = mongoose.model('Group', GroupSchema);

  Content = mongoose.model('Content', ContentSchema);

  GroupMembers = mongoose.model('GroupMember', GroupMemberSchema);
}

export const dbContext = new DbContext()
