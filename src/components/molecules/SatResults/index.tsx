import { forwardRef } from 'react'
import { Cover } from './Cover'
import { Greeting } from './Greeting'
import { Percentages } from './Percentages'
import { ProfileTypes } from './ProfileTypes'
import { Graph } from './Graphics'
import { Farewell } from './Farewell'

// const SatReportIntro = forwardRef((props: any) => {
//   return <p {...props} />
// })
// const SatReportGreeting = forwardRef((props: any, ref) => <Percentages ref={ref} {...props} />)
// const SatReportQualification = forwardRef((props: any, ref) => <Cover ref={ref} {...props} />)
// const SatReportIntro = forwardRef((props: any, ref) => <Cover ref={ref} {...props} />)
// const SatReportIntro = forwardRef((props: any, ref) => <Cover ref={ref} {...props} />)

export const SAT_TEMPLATES = {
  SatReportIntro: (props: any) => <Cover {...props} />,
  SatReportGreeting: (props: any) => <Greeting {...props} />,
  SatReportQualification: (props: any) => <Percentages {...props} />,
  SatReportInformation: (props: any) => <ProfileTypes {...props} />,
  SatReportGraph: (props: any) => <Graph {...props} />,
  SatReportFarewell: (props: any) => <Farewell {...props} />,
}
