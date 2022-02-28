// main tools
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

// bootstrap components
import { Container, Modal } from 'react-bootstrap'
import { Nut, ChatRightText } from 'react-bootstrap-icons'

// components
import { ChatSession } from 'components/organisms/chatSession'

// utils
import { items } from 'components/molecules/Sidebar/items'

// styles
import classes from 'styles/Sidebar/sidebar.module.scss'

export const Sidebar = () => {
  const [showChat, setShowChat] = useState(false)
  const { data } = useSession()

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
              {items(data.user.sub).map((item, idx) => (
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
