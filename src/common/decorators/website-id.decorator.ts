import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Website = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const website = request.website;

  return website;
});
