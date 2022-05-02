// main tools
import { useState } from 'react'

// commons
import { microServices } from 'commons'

// gql
import { useMutation, useQuery } from '@apollo/client'
import ADD_TASK from 'lib/mutations/Coachee/Objectives/createTask.gql'
import DELETE_TASK from 'lib/mutations/Coachee/Objectives/deleteTask.gql'
import UPDATE_TASK from 'lib/mutations/Coachee/Objectives/updateTask.gql'
import GET_COACHEE_PROFILE from 'lib/queries/Coachee/getCoacheeProfile.gql'
import ADD_OBJECTIVE from 'lib/mutations/Coachee/Objectives/createObjective.gql'
import DELETE_OBJECTIVE from 'lib/mutations/Coachee/Objectives/deleteObjective.gql'
import UPDATE_OBJECTIVE from 'lib/mutations/Coachee/Objectives/updateObjective.gql'

export const useCoacheeObjectives = () => {
  const [goalsData, setGoalsData] = useState([])

  const { loading: goalsLoading, refetch } = useQuery(GET_COACHEE_PROFILE, {
    context: { ms: microServices.backend },
    onCompleted: (data) => setGoalsData(data.getCoacheeProfile.objectives),
  })

  const [addObjective] = useMutation(ADD_OBJECTIVE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })
  const [updateObjective] = useMutation(UPDATE_OBJECTIVE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })
  const [deleteObjective] = useMutation(DELETE_OBJECTIVE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })

  const [addTask] = useMutation(ADD_TASK, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })
  const [updateTask] = useMutation(UPDATE_TASK, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })
  const [deleteTask] = useMutation(DELETE_TASK, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })

  return {
    goalsLoading,
    goalsData,
    addObjective,
    updateObjective,
    deleteObjective,
    addTask,
    updateTask,
    deleteTask,
  }
}
