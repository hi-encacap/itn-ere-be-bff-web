import { IREUser } from '@encacap-group/common/dist/re';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BaseIdParamDto } from 'src/base/base.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PostDraftCreateBodyDto } from '../dtos/post-draft-create-body.dto';
import { PostListQueryDto } from '../dtos/post-list-query.dto';
import { PostDraftService } from '../services/post-draft.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/post-drafts')
export class AdminPostDraftController {
  constructor(private readonly postDraftService: PostDraftService) {}

  @Get()
  getAll(@Query() query: PostListQueryDto, @User() user: IREUser) {
    return this.postDraftService.getAll({
      ...query,
      websiteId: user.websiteId,
    });
  }

  @Post()
  create(@Body() body: PostDraftCreateBodyDto, @User() user: IREUser) {
    return this.postDraftService.create(body, user);
  }

  @Get(':id')
  getOne(@Param() param: BaseIdParamDto, @User() user: IREUser) {
    return this.postDraftService.get({
      id: param.id,
      websiteId: user.websiteId,
    });
  }

  @Put(':id')
  update(@Param() param: BaseIdParamDto, @Body() body: PostDraftCreateBodyDto, @User() user: IREUser) {
    return this.postDraftService.updateById(
      {
        id: param.id,
        websiteId: user.websiteId,
      },
      body,
    );
  }

  @Delete(':id')
  delete(@Param() param: BaseIdParamDto, @User() user: IREUser) {
    return this.postDraftService.delete({
      id: param.id,
      websiteId: user.websiteId,
    });
  }
}
