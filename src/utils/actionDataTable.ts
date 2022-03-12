import { CoachDataType } from "types/models/Coach";
import { CoacheeDataType } from "types/models/Coachee";

export const schema = (
  content: any,
  statusBody: (ev:CoacheeDataType, content:any) => void,
  coachBody: (ev:CoacheeDataType) => void
) => [
  { field: 'user.name', header: content.nameColumnLabel },
  { field: 'user.email', header: content.emailColumnLabel },
  { field: 'position', header: content.positionColumnLabel },
  { field: 'registrationStatus', header: content.statusColumnLabel, body: statusBody },
  { field: 'user.coach', header: content.coachColumnLabel, body: coachBody },
  { field: 'user.createdAt', header: content.signupColumnLabel },
]
