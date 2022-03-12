// main tools
import Image from 'next/image'

// styles
import classes from 'styles/DashboardOrg/coacheesDatatable.module.scss'

// types
import { CoachDataType } from 'types/models/Coach'
import { CoacheeDataType } from 'types/models/Coachee'

export const coachBodyTemplate = (coach: CoachDataType | undefined) => coach ? (
  <div>
    <Image
      width={32}
      height={32}
      alt={coach.user?.name}
      src={coach?.profilePicture as string}
    />
    <span className='image-text'>{coach.user?.name}</span>
  </div>
) : (
  <p>sin coach asignado</p>
)

export const statusBodyTemplate = (
  item: CoacheeDataType,
  statusCodeNames: any
) => {
  const status = statusCodeNames.find(
    (statu: any) => statu.registrationStatus == item.registrationStatus
  )
  return (
    <div
      className={`${classes[`button_${item.registrationStatus}`]} ${
        classes.button
      }`}>
      {status.label}
    </div>
  )
}
