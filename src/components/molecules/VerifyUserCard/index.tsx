//main
import { useEffect, useState } from 'react'
//components
import { InputText } from 'primereact/inputtext'
import { Button, Col, Row } from 'react-bootstrap'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { InputMask } from 'primereact/inputmask'
//styles
import classes from 'styles/VerifyUser/verifyUser.module.scss'
//types
import { SubmitType } from 'types'
//GQL
import { useMutation } from '@apollo/client'
import VERIFY_USER from 'lib/mutations/verifyUser.gql'
import { useSession } from 'next-auth/react'
//commons
import { microServices } from 'commons'

export const VerifyUserCard = () => {
  const [userEmail, setuserEmail] = useState('')
  const [verificationCode, setverificationCode] = useState('')
  const session = useSession()
  useEffect(() => {
    if (session?.data?.user?.email) setuserEmail(session.data.user.email)
  }, [session])

  const [verifyUser] = useMutation(VERIFY_USER, {
    onCompleted: (res) => {
      console.log(res)
    },
    onError: (error) => {
      console.log(error)
    },
    context: { ms: microServices.backend },
  })

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault()
    console.log('submitting')
    verifyUser({
      variables: {
        data: {
          email: userEmail,
          code: verificationCode,
        },
      },
    })
  }

  return (
    <Row className=''>
      <Col xs={12} className='d-flex justify-content-center'>
        <form
          onSubmit={handleSubmit}
          className={`${classes.card} ${classes.section}`}>
          <Row>
            <h3 className='text-center mb-3'>Verifica tu cuenta</h3>
          </Row>
          <Row>
            <InputMask
              className={classes.InputMask}
              mask='********'
              value={verificationCode}
              onChange={(e) => setverificationCode(e.value)}></InputMask>
          </Row>
          <Row>
            <Button type='submit' className={`mt-3 ${classes.button}`}>
              Verificar
            </Button>
          </Row>
          <Row>
            <Button variant='text' className={`mb-3 mt-3 ${classes.button}`}>
              No he recibido el codigo
            </Button>
          </Row>

          <ExploreBadge />
        </form>
      </Col>
    </Row>
  )
}
