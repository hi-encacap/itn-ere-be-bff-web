import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AddUserIdToParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userId = request.user.id;

  request.params.userId = userId;

  return request.params;
});
