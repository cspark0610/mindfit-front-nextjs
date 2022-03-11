// main tools
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// bootstrap components
import { Container, Modal } from 'react-bootstrap'
import { Nut, ChatRightText } from 'react-bootstrap-icons'

// components
import { ChatSession } from 'components/organisms/chatSession'

// utils
import { userRoles } from 'utils/enums'

// styles
import { Icon } from 'react-bootstrap-icons'
import classes from 'styles/Sidebar/sidebar.module.scss'

export const Sidebar = () => {
  const [items, setItems] = useState<
    { label: string; url: string; icon: Icon }[] | undefined
  >(undefined)
  const [showChat, setShowChat] = useState(false)
  const { data, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      ;(async () => {
        switch (data?.user.role) {
          case userRoles.COACHEE:
            {
              await import('components/molecules/Sidebar/items').then(
                ({ coacheeItems }) => setItems(coacheeItems(data.user.sub))
              )
            }
            break
          case userRoles.COACH:
            {
              await import('components/molecules/Sidebar/items').then(
                ({ coachItems }) => setItems(coachItems(data.user.sub))
              )
            }
            break
        }
      })()
    }
  }, [data, status])

  return (
    <>
      <aside className={classes.container}>
        <div>
          <Image
            src='/assets/icon/MINDFIT_WHITE.svg'
            width={80}
            height={40}
            alt='mindfit'
          />
          {data?.user && (
            <>
              {items &&
                items.map((item, idx) => (
                  <Container key={idx} className={classes.itemContainer}>
                    <Link href={item.url}>
                      <a className={classes.itemElement}>
                        <item.icon />
                        <span className={classes.itemElement_label}>
                          {item.label}
                        </span>
                      </a>
                    </Link>
                  </Container>
                ))}
              <Container
                onClick={() => setShowChat(true)}
                className={classes.itemContainer}>
                <span role='button' className={classes.itemElement}>
                  <ChatRightText />
                  <span className={classes.itemElement_label}>Chat</span>
                </span>
              </Container>
            </>
          )}
        </div>
        <Link href='/settings'>
          <a className={classes.settings}>
            <Nut color='white' size={32} />
          </a>
        </Link>
      </aside>
      <Modal
        centered
        show={showChat}
        className={classes.modal}
        onHide={() => setShowChat(false)}>
        <Modal.Body>
          <ChatSession />
        </Modal.Body>
      </Modal>
    </>
  )
}
