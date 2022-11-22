import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AddWebsiteIdToParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const websiteId = request.user.websiteId;

  if (!request.params) {
    request.params = {};
  }

  request.params.websiteId = websiteId;

  return request.params;
});
