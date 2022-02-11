//main
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//components
import { Button, Col, Row } from 'react-bootstrap'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { InputMask } from 'primereact/inputmask'
import { AlertText } from 'components/atoms/AlertText'

//styles
import classes from 'styles/VerifyUser/verifyUser.module.scss'

//GQL
import { useMutation } from '@apollo/client'
import VERIFY_USER from 'lib/mutations/verifyUser.gql'

//commons
import { microServices } from 'commons'
import { Session } from 'next-auth'

// types
import { FC } from 'react'

export const VerifyUserCard: FC<{
  code: string
  session: Session
  content: any
}> = ({ code, session, content }) => {
  const [alertTextValues, setalertTextValues] = useState({
    show: false,
    alertType: 'success' || 'error',
    text: '',
  })
  const { push } = useRouter()

  const [verifyUser] = useMutation(VERIFY_USER, {
    context: { ms: microServices.backend },
    onCompleted: () => push('/'),
    onError: () =>
      setalertTextValues({
        show: true,
        alertType: 'error',
        text: content.warningLabel,
      }),
  })

  useEffect(() => {
    verifyUser &&
      verifyUser({ variables: { data: { email: session.user.email, code } } })
  }, [verifyUser, code, session.user.email])

  return (
    <Row>
      <Col xs={12} className='d-flex justify-content-center'>
        <section className={`${classes.card} ${classes.section}`}>
          <h3 className={classes.title}>{content.title}</h3>
          <Row>
            <InputMask
              mask='********'
              value={code}
              className={`${classes.InputMask} ${classes.marginInput} ${classes.input} mt-3`}
            />
          </Row>
          <Row>
            {alertTextValues.show && (
              <AlertText
                alertType={alertTextValues.alertType}
                text={alertTextValues.text}
              />
            )}
          </Row>
          <Row>
            <Button variant='text' className={classes.label}>
              {content.claimCodeLabel}
            </Button>
          </Row>
          <ExploreBadge />
        </section>
      </Col>
    </Row>
  )
}
