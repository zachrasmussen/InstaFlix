import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"


class GroupsService {
  async getYourGroups(accountId) {
    const groups = await dbContext.Groups.find({ accountId: accountId }).populate('group')
    return groups
  }
  async editGroup(groupData, id, userId) {
    const group = await this.getGroupById(id)
    if (group.creatorId != userId) {
      throw new Forbidden('Not Your Group')
    }
    group.name = groupData.name || group.name
    await group.save()
    return group
  }
  async deleteGroup(groupId, userId) {
    const group = await dbContext.Groups.findById(groupId)
    if (!group) {
      throw new BadRequest('No Group')
    }
    if (group.creatorId != userId)
      throw new Forbidden('Not Your Group!')
    await group.remove()
    return 'group was deleted'
  }
  async create(newGroup) {
    const group = await dbContext.Groups.create(newGroup)
    await group.populate('creator', 'name picture')
    return group
  }
  async getGroupById(id) {
    const group = await dbContext.Groups.findById(id).populate('creator', 'name picture')
    if (!group) {
      throw new BadRequest('no group by that id')
    }
    return group
  }
}

export const groupsService = new GroupsService()