// PrimeComponents
import { Skeleton } from 'primereact/skeleton'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

export const DatatableSkeleton = () => {
  const products = Array.from({ length: 10 })

  const bodyTemplate = () => {
    return <Skeleton></Skeleton>
  }

  return (
    <DataTable value={products} className='p-datatable-striped'>
      <Column selectionMode='multiple' headerStyle={{ width: '3em' }} />
      <Column body={bodyTemplate}></Column>
    </DataTable>
  )
}
