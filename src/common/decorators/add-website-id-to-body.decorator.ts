import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AddWebsiteIdToBody = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const websiteId = request.user.websiteId;

  if (!request.body) {
    request.body = {};
  }

  request.body.websiteId = websiteId;

  return request.body;
});
