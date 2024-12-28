export enum SessionNameEnum {
  SESSION_1 = 'SESSION_1',
  MORNING_SESSION = 'MORNING_SESSION',
  AFTERNOON_SESSION = 'AFTERNOON_SESSION',
  EVENING_SESSION = 'EVENING_SESSION',
}

export const toSessionNameEnum = (sessionName: string): SessionNameEnum => {
  return sessionName as SessionNameEnum;
};
