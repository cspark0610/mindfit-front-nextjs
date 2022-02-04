// bootstrap components
import { Container, Row, Button } from 'react-bootstrap'
import { Sticky } from 'react-bootstrap-icons'

// prime components
import { InputText } from 'primereact/inputtext'

// components
import { CardChat } from 'components/molecules/CardChat'

// styles
import classes from 'styles/Chat/dashboardChat.module.scss'

// types
import { FC } from 'react'
import { PrimeIcons } from 'primereact/api'

export const DashboardChat: FC = () => {
  return (
    <Container className={classes.section}>
      <Row>
        <form className={`p-input-icon-right ${classes.searcher}`}>
          <i className={`${classes.inputIcon} ${PrimeIcons.SEARCH}`} />
          <InputText
            type='search'
            placeholder='Buscar'
            className={classes.input}
          />
        </form>
      </Row>
      <Row xs='auto'>
        <h5>Mensajes</h5>
        <div>
          <Button className={classes.buttonIcon} size='sm' variant='light'>
            <Sticky />
          </Button>
        </div>
      </Row>
      <Row className={classes.container}>
        <div className={classes.cardChats}>
          {[0, 1, 2].map((item, idx) => (
            <CardChat key={idx} />
          ))}
        </div>
      </Row>
    </Container>
  )
}
