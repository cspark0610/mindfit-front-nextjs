// main tools
import { useState } from 'react'

// boostrap components
import { Button, Col, Row } from 'react-bootstrap'

// prime components
import { Chart } from 'primereact/chart'

// commons
import { microServices } from 'commons'

// gql
import { useQuery } from '@apollo/client'
import TIME_LINE from 'lib/queries/Organization/OrgDashboard/timeline.gql'

// styles
import classes from 'styles/DashboardOrg/timeline.module.scss'

// types
import { FC } from 'react'

export const Timeline: FC<{ content: any }> = ({ content }) => {
  const [selected, setSelected] = useState(content.buttonPeriod[0].href)
  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])

  const { loading } = useQuery(TIME_LINE, {
    variables: { period: selected },
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      setLabels(data.getOrganizationCoacheesCoachingSessionTimeline.labels)
      setValues(
        data.getOrganizationCoacheesCoachingSessionTimeline.datasets[0].data
      )
    },
  })

  const selectedPeriod = (item: any) => {
    setSelected(item.target.value)
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: content.numberSessionsText,
        data: values.map((value: any) => value),
        borderColor: '#1a7bee',
        pointBorderWidth: 10,
      },
    ],
  }

  const options = {
    scales: {
      x: { ticks: { color: '#4d4d4f' }, grid: { color: '#ffffff' } },
      y: { ticks: { color: '#4d4d4f' }, grid: { color: '#ffffff' } },
    },
    plugins: { legend: { display: false } },
  }

  return (
    <section className={`mb-5 ${classes.section}`}>
      <h3 className={`text-center mb-5 ${classes.title}`}>{content.title}</h3>
      <Row xs='auto' className='mb-4 justify-content-between'>
        {!loading &&
          content.buttonPeriod.map((item: any) => (
            <Col>
              <Button
                key={item.href}
                disabled={selected == item.href}
                className={
                  selected == item.href ? classes.selected : classes.link
                }
                onClick={(ev) => selectedPeriod(ev)}
                variant='light'
                value={item.href}>
                {item.label}
              </Button>
            </Col>
          ))}
      </Row>
      <Row xs='auto' className='mb-4'>
        <Col>
          <Button disabled={true} className={classes.legend} />
        </Col>
        <p className={classes.legend_text}>{content.numberSessionsText}</p>
      </Row>
      <Chart type='line' data={chartData} options={options} />
    </section>
  )
}
