import { Cover } from './Cover'
import { Greeting } from './Greeting'
import { Percentages } from './Percentages'
import { ProfileTypes } from './ProfileTypes'
import { Graph } from './Graphics'
import { Farewell } from './Farewell'

export const SAT_TEMPLATES = {
  satReportIntro: (props: any) => <Cover {...props} />,
  satReportGreeting: (props: any) => <Greeting {...props} />,
  satReportQualification: (props: any) => <Percentages {...props} />,
  SatReportInformation: (props: any) => <ProfileTypes {...props} />,
  SatReportGraph: (props: any) => <Graph {...props} />,
  satReportFarewell: (props: any) => <Farewell {...props} />,
}
