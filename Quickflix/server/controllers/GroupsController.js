import { Auth0Provider } from "@bcwdev/auth0provider";
import { contentService } from "../services/ContentsService";
import { groupMembersService } from "../services/GroupMembersService";
import { groupsService } from "../services/GroupsService";
import BaseController from "../utils/BaseController";



export class GroupsController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .get('/:id', this.getGroupById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:groupId/content', this.getContentByGroupId)
      .post('', this.create)
      .delete('/:id', this.deleteGroup)
      .put('/:id', this.editGroup)
      .get('/:groupId/groupMembers', this.getGroupMembersByGroupId)
  }
  async getGroupMembersByGroupId(req, res, next) {
    try {
      const groupMembers = await groupMembersService.getGroupMembersByGroupId(req.params.groupId)
      return res.send(groupMembers)
    } catch (error) {
      next(error)
    }
  }
  // NOTE We may or may not need this later on
  async getContentByGroupId(req, res, next) {
    try {
      const content = await contentService.getContentByGroupId(req.params.groupId)
      return res.send(content)
    } catch (error) {
      next(error)
    }
  }
  async editGroup(req, res, next) {
    try {
      const groupData = req.body
      const group = await groupsService.editGroup(groupData, req.params.id, req.userInfo.id)
      res.send(group)
    } catch (error) {
      next(error)
    }
  }
  async deleteGroup(req, res, next) {
    try {
      const group = await groupsService.deleteGroup(req.params.id, req.userInfo.id)
      return res.send(group)
    } catch (error) {
      next(error)
    }
  }
  async getGroupById(req, res, next) {
    try {
      const group = await groupsService.getGroupById(req.params.id)
      return res.send(group)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const group = await groupsService.create(req.body)
      return res.send(group)
    } catch (error) {
      next(error)
    }
  }


}


