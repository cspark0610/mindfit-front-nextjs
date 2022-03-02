// prime components
import { Chart, ChartProps } from 'primereact/chart'

// types
import { FC } from 'react'

export const ChartDoughnut: FC<ChartProps> = ({data}) => {
  const options = {
    plugins: {
      legend: {
        labels: false
      },
    },
  }
  return <Chart type='doughnut' data={data} options={options} />
}
