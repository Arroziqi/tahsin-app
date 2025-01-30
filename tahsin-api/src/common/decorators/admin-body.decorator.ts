import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AdminBody = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;

    return {
      ...body,
      admin_id: request.user.data.id,
    };
  },
);
