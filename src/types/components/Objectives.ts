export interface ObjectivesProps {
  id: number
  icon: string
  title: string
  tasks?: TasksProps[]
}

export interface TasksProps {
  id: number
  title: string
  progress: number
}
