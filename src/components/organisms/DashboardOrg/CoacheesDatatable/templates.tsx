// main tools
import Image from 'next/image'

// styles
import classes from 'styles/DashboardOrg/coacheesDatatable.module.scss'

// types
import { CoacheeDataType } from 'types/models/Coachee'
import { CoachDataType } from 'types/models/Coach'
import { fileDataType } from 'types/models/Files'

export const coachBodyTemplate = (assignedCoach: CoachDataType | undefined) =>
  assignedCoach ? (
    <div>
      <Image
        width={32}
        height={32}
        alt={assignedCoach.user?.name}
        src={(assignedCoach.profilePicture as fileDataType)?.location as string}
      />
      <p className='image-text'>{assignedCoach.user?.name}</p>
    </div>
  ) : (
    <p>sin coach asignado</p>
  )

export const statusBodyTemplate = (
  item: CoacheeDataType,
  statusCodeNames: any
) => {
  const status = statusCodeNames.find((statu: any) => {
    if (!item.isActive) return statu.registrationStatus === 'SUSPENDED'
    else return statu.registrationStatus === item.registrationStatus
  })

  return (
    <div
      className={`${classes[`button_${status.registrationStatus}`]} ${
        classes.button
      }`}>
      {status.label}
    </div>
  )
}
