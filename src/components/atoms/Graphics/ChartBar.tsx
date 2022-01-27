// prime components
import { Chart } from 'primereact/chart'

// types
import { FC } from 'react'

interface Props {
  name: string
  labels: object
  data: object
}

export const ChartBar: FC<Props> = ({ name, labels, data }) => {
  const basicData = {
    labels: labels,
    datasets: [
      {
        label: name,
        backgroundColor: '#1a7bee',
        data: data,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    scales: {
      x: {
        ticks: {
          color: '#4d4d4f',
        },
        grid: {
          color: '#ffffff',
        },
      },
      y: {
        ticks: {
          color: '#4d4d4f',
        },
        grid: {
          color: '#c4c4c4',
        },
      },
    },
  }

  return <Chart type='bar' data={basicData} options={options} />
}
