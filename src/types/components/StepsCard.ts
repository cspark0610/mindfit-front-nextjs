export type StepsCardProps = {
  steps: { label: string; action: string; url: string; completed: boolean }[]
}

export type CompletedStepProps = {
  label: string
}
export type ActualStepProps = {
  index: number
  label: string
}
export interface NextStepProps extends CompletedStepProps {}
