import Image from 'next/image'
import Link from 'next/link'

interface Props {
  icon: string
  background?: boolean
  url?: string
}
export const Item: React.FunctionComponent<Props> = ({
  icon,
  background = true,
  url = '',
}) => {
  return (
    <div
      className={`sidebar--item-container ${
        !background && 'no-background'
      } d-flex justify-content-center align-items-center`}>
      <Link href={url}>
        <a>
          <i className={`bi bi-${icon}`}></i>
        </a>
      </Link>
    </div>
  )
}
