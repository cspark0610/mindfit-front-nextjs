// prime components
import { Chart, ChartProps } from 'primereact/chart'

// types
import { FC } from 'react'

export const ChartBar: FC<ChartProps> = ({ data }) => {
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

  return <Chart type='bar' data={data} options={options} />
}
