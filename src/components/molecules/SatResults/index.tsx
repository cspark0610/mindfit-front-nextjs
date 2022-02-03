import { Cover } from './Cover'
import { Greeting } from './Greeting'
import { Percentages } from './Percentages'
import { ProfileTypes } from './ProfileTypes'
import { Graph } from './Graphics'
import { Farewell } from './Farewell'

export const SAT_TEMPLATES = {
  cover: () => <Cover />,
  greeting: (props: any) => <Greeting {...props} />,
  percentages: (props: any) => <Percentages {...props} />,
  profileTypes: (props: any) => <ProfileTypes {...props} />,
  graphics: (props: any) => <Graph {...props} />,
  farewell: (props: any) => <Farewell {...props} />,
}
