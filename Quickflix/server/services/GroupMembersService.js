import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"
import { groupsService } from "./GroupsService"




class GroupMembersService {

    async getGroupMembersByGroupId(groupId) {
        const groupMembers = await dbContext.GroupMembers.find({ groupId })
        return groupMembers
    }
    async removeMember(memberId, userId) {
        const member = await dbContext.GroupMembers.findById(memberId)
        if (!member) {
            throw new BadRequest('No such member')
        }
        const group = await groupsService.getGroupById(member.groupId)
        if (group.creatorId != userId) {
            if (member.accountId != userId) {
                throw new BadRequest('no')
            }
        }
        await member.remove()
        return 'Member Removed'
    }
    async becomeMember(newMember) {
        const group = await groupsService.getGroupById(newMember.groupId)
        const groupMember = await dbContext.GroupMembers.create(newMember)
        await groupMember.populate('group')
        await groupMember.populate('profile', 'name picture')
        await group.save()
        return groupMember
    }
}

export const groupMembersService = new GroupMembersService()