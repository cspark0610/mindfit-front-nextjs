import Image from 'next/image'
import { FC } from 'react'
import { ChevronDoubleRight } from 'react-bootstrap-icons'
import styles from 'styles/CoachSession/coachSessionCard.module.scss'
interface coachDataDescription {
  id: string
  name: string
  title: string
  description: string
  picture: string
  areas: string[]
}
interface Props {
  data: coachDataDescription
}
export const CoachSessionCard: FC<Props> = ({ data }) => {
  return (
    <div className={styles.card}>
      <Image src={data.picture} width={100} height={100} alt='coach photo' />
      <h4>{data.name}</h4>
      <p className={styles.title}>{data.title}</p>
      <p>Otras especializaciones</p>
      <ul>
        {data.areas.map((area: string, idx: number) => (
          <li className={styles.specialItem} key={`areaid-${idx}`}>
            <ChevronDoubleRight width={16} height={16} color='#fe5000' /> {area}
          </li>
        ))}
      </ul>
      <p className={styles.description}>{data.description}</p>
    </div>
  )
}
