import { Auth0Provider } from "@bcwdev/auth0provider";
import { contentService } from "../services/ContentsService";
import BaseController from "../utils/BaseController";

export class ContentsController extends BaseController {
  constructor() {
    super('api/content')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('/:id', this.getContentByCreatorId)
      .delete('/:id', this.archive)
      .put('/:id', this.editContent)
  }

  async editContent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      let contentData = req.body
      let content = await contentService.editContentById(req.params.id, contentData)
      return res.send(content)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      let newContent = await contentService.create(req.body)//body on request coming into server
      return res.send(newContent)
    } catch (error) {
      next(error)
    }
  }
  async getContentByCreatorId(req, res, next) {
    try {
      const content = await contentService.getContentById(req.params.id)
      return res.send(content)
    } catch (error) {
      next(error)

    }
  }
  async archive(req, res, next) {//TODO Hard delete
    try {
      const message = await contentService.archive(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}