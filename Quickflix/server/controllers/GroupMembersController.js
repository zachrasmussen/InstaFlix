import { Auth0Provider } from "@bcwdev/auth0provider"
import { groupMembersService } from "../services/GroupMembersService"
import BaseController from "../utils/BaseController"



export class GroupMembersController extends BaseController {
    constructor() {
        super('api/groupMembers')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.becomeMember)
            .delete('/:id', this.removeMember)

    }
    async removeMember(req, res, next) {
        try {
            const member = await groupMembersService.removeMember(req.params.id, req.userInfo.id)
            return res.send(member)
        } catch (error) {
            next(error)
        }
    }
    async becomeMember(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const groupMember = await groupMembersService.becomeMember(req.body)
            return res.send(groupMember)
        } catch (error) {
            next(error)
        }
    }
}