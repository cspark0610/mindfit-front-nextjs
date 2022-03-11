import { CoacheeDataType } from 'types/models/Coachee'

export const schema = (
  content: any,
  statusBody: ({}: CoacheeDataType) => void,
  coachBody: ({}: CoacheeDataType) => void
) => [
  { field: 'user.name', header: content.nameColumnLabel },
  { field: 'user.email', header: content.emailColumnLabel },
  { field: 'position', header: content.positionColumnLabel },
  {
    field: 'registrationStatus',
    header: content.statusColumnLabel,
    body: statusBody,
  },
  { field: 'user.coach', header: content.coachColumnLabel, body: coachBody },
  { field: 'user.createdAt', header: content.signupColumnLabel },
]
