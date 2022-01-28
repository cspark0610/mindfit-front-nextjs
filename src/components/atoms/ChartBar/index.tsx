// prime components
import { ChartData } from 'chart.js'
import { Chart } from 'primereact/chart'

// types
import { FC } from 'react'

export const ChartBar: FC<ChartData> = ({ labels, datasets }) => {
  const graphicData = {
    labels: labels,
    datasets: datasets
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

  return <Chart type='bar' data={graphicData} options={options} />
}
