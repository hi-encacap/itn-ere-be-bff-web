import { IREUser } from '@encacap-group/common/dist/re';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BaseIdParamDto } from 'src/base/base.dto';
import { AddWebsiteIdToBody } from 'src/common/decorators/add-website-id-to-body.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PostCreateBodyDto } from '../dtos/post-create-body.dto';
import { PostListQueryDto } from '../dtos/post-list-query.dto';
import { PostUpdateBodyDto } from '../dtos/post-update-body.dto';
import { PostService } from '../services/post.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/posts')
export class AdminPostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@AddWebsiteIdToBody() @Body() body: PostCreateBodyDto, @User() user: IREUser) {
    return this.postService.create(body, user);
  }

  @Get()
  getAll(@Query() query: PostListQueryDto, @User() user: IREUser) {
    return this.postService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Get(':id')
  get(@Param('id') id: number, @User() user: IREUser) {
    return this.postService.get({ id, websiteId: user.websiteId });
  }

  @Post(':id/un-publish')
  unPublish(@Param('id') id: number, @User() user: IREUser) {
    return this.postService.unPublish({
      id,
      websiteId: user.websiteId,
    });
  }

  @Post(':id/publish')
  publish(@Param('id') id: number, @User() user: IREUser) {
    return this.postService.publish({
      id,
      websiteId: user.websiteId,
    });
  }

  @Post(':id/up-top')
  upTop(@Param() { id }: BaseIdParamDto) {
    return this.postService.upTopById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: PostUpdateBodyDto, @User() user: IREUser) {
    return this.postService.updateById(id, {
      ...body,
      websiteId: user.websiteId,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number, @User() user: IREUser) {
    return this.postService.delete({
      id,
      websiteId: user.websiteId,
    });
  }
}
