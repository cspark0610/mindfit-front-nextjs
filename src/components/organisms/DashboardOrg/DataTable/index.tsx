// main tools
import { useState } from 'react'

// prime components
import { Column, ColumnProps } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

// components
import { ActionDataTable } from 'components/molecules/ActionDataTable'

// types
import { FC } from 'react'
import { StyledDataTableProps } from 'types/components/datatable'

export const StyledDataTable: FC<StyledDataTableProps> = ({
  schema,
  items,
  actions = undefined
}) => {
  const [selected, setSelected] = useState(null)

  const dynamicColumns = schema.map((col: ColumnProps) => (
    <Column 
      key={col.field}
      field={col.field}
      header={col.header}
      align='center'
    />
  ))
    
  return (
    <DataTable
      value={items}
      paginator
      rows={10}
      responsiveLayout='stack'
      emptyMessage='No se han encontrado resultados'
      selection={selected}
      onSelectionChange={(e) => setSelected(e.value)}
      breakpoint='768px'
    >
      <Column selectionMode='multiple' headerStyle={{ width: '3em' }} />
      {dynamicColumns}
      {actions !== undefined && (
        <Column
          header='Acciones'
          align='center'
          body={(item) => <ActionDataTable {...actions} {...item}/>}/>
      )}
    </DataTable>
  )
}
