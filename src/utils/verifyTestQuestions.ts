export const verifyTestQuestions = (
  step: number,
  questions:
    | {
        description: string
        questions: {
          title: string
          options: {
            label: string
            value: number
          }[]
        }[]
      }[]
    | undefined,
  answers: { [key: string]: { value: number } }[]
) => {
  if (questions && answers[step]) {
    return (
      Object.keys(answers[step]).length === questions[step].questions.length
    )
  }

  return false
}
