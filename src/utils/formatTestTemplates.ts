export const formatSatResultsTemplates = (
  content: any,
  results: any[]
): any[] => {
  const formatedTemplates: any = []
  results.forEach((result) => {
    const templates = content.satReportQualifications.data
      .filter(
        ({ attributes }: any) => attributes.codeName === result.areaCodeName
      )
      .map(({ attributes }: any) => ({
        result,
        attributes,
        template: 'satReportQualification',
      }))
    const graphs = content.satReportGraphs.data
      .filter(
        ({ attributes }: any) => attributes.codeName === result.areaCodeName
      )
      .map(({ attributes }: any) => ({
        result,
        attributes,
        template: 'satReportGraph',
      }))

    templates.length > 0 && formatedTemplates.push(...templates)
    graphs.length > 0 && formatedTemplates.push(...graphs)
  })

  return formatedTemplates
}
