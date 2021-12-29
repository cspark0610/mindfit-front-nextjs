import Link from 'next/link'
import * as Icon from 'react-bootstrap-icons'
import classes from 'styles/Sidebar/sidebar.module.scss'
interface Props {
  icon?: string
  background?: boolean
  url?: string
}

export const Item: React.FunctionComponent<Props> = ({
  icon,
  background = true,
  url = '',
}) => {
  let iconSize = 24,
    iconColor = 'black'

  return (
    <div
      className={
        background
          ? classes.sidebarItemContainer
          : classes.sidebarItemContainerNoBackground
      }>
      <Link href={url}>
        <a className={classes.sidebarIconContainer}>
          {icon === 'Journal' && (
            <Icon.Journal size={iconSize} color={iconColor} />
          )}

          {icon === 'Calendar' && (
            <Icon.Calendar size={iconSize} color={iconColor} />
          )}

          {icon === 'LayoutWtf' && (
            <Icon.LayoutWtf size={iconSize} color={iconColor} />
          )}

          {icon === 'ChatRightText' && (
            <Icon.ChatRightText size={iconSize} color={iconColor} />
          )}

          {icon === 'Nut' && <Icon.Nut size={40} color={'white'} />}
        </a>
      </Link>
    </div>
  )
}
