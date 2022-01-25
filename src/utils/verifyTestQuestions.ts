export const verifyTestQuestions = (
  sectionIndex: number,
  section: any,
  answers: any
) => {
  let completed = true

  const answerList =
    (answers.sectionsResult &&
      answers?.sectionsResult[sectionIndex]?.questions) ||
    []

  answerList.forEach(({ answersSelected }: any) => {
    if (answersSelected.length < 1) completed = false
  })
  if (answerList.length < section?.questions.length) completed = false

  return completed
}
