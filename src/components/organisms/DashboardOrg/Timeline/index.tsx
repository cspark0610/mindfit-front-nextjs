// main tools
import { useState } from 'react'

// boostrap components
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'

// prime components
import { Chart, ChartProps } from 'primereact/chart'

// styles
import classes from 'styles/DashboardOrg/timeline.module.scss'

// types
import { FC } from 'react'

export const Timeline: FC<ChartProps> = () => {
  const [selected, setSelected] = useState('month')
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Numero de sesiones',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#1a7bee',
        backgroundColor: '#1a7bee',
      },
      {
        label: 'Sesiones acumuladas',
        data: [55, 49, 70, 71, 46, 45, 30],
        borderColor: '#e7f2ff',
        backgroundColor: '#e7f2ff',
      },
    ],
  }

  const options = {
    scales: {
      x: { ticks: { color: '#4d4d4f' }, grid: { color: '#ffffff' } },
      y: { ticks: { color: '#4d4d4f' }, grid: { color: '#ffffff' } },
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <Container>
      <h1 className={`text-center mb-5 ${classes.title}`}>
        Sesiones de coaching
      </h1>
      <h4 className={`mb-4 ${classes.subtitle}`}>Sesiones de coaching</h4>
      <Tab.Container id='tab' defaultActiveKey='month'>
        <Nav variant='pills' className='mb-4 justify-content-around'>
          {['day', 'month'].map((item: any) => (
            <Nav.Item key={item}>
              <Nav.Link
                eventKey={item}
                className={selected == item ? classes.selected : classes.link}
                onClick={() => setSelected(item)}>
                {item}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          <Row xs='auto' className='mb-4'>
            <div className={classes.legend}/>
            <h4 className={classes.legend_text}>Numero de sesiones</h4>
          </Row>
          <Row xs='auto' className='mb-4'>
            <div className={classes.legend_light}/>
            <h4 className={classes.legend_text}>Sesiones acumuladas previamente</h4>
          </Row>
          <Tab.Pane eventKey='month'>
            <Chart type='line' data={data} options={options} />
          </Tab.Pane>
          <Tab.Pane eventKey='day'>
            <Chart type='line' data={data} options={options} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  )
}
