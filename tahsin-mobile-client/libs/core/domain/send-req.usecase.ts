export interface SendReqUsecase<Req, Res> {
  execute(req: Req): Promise<Res>;
}
