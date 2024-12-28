import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserBody = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    return {
      ...body,
      user_id: request.user.data.id,
    };
  },
);
