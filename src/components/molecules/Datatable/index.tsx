// components
import { ActionDataTable } from 'components/molecules/ActionDataTable'

// prime components
import { Column, ColumnProps } from 'primereact/column'
import { DataTable as PrimeDatatable } from 'primereact/datatable'

// types
import { FC } from 'react'
import { StyledDataTableProps } from 'types/components/datatable'

export const DataTable: FC<StyledDataTableProps> = ({
  schema,
  value,
  selection,
  onSelectionChange,
  actions = undefined,
}) => {
  const dynamicColumns = schema.map((col: ColumnProps) => (
    <Column
      key={col.field}
      field={col.field}
      header={col.header}
      align='center'
      body={col.body}
    />
  ))

  return (
    <PrimeDatatable
      value={value}
      paginator
      rows={10}
      responsiveLayout='scroll'
      emptyMessage='No se han encontrado resultados'
      selection={selection}
      onSelectionChange={onSelectionChange}
      breakpoint='988px'>
      <Column selectionMode='multiple' headerStyle={{ width: '3em' }} />
      {dynamicColumns}
      {actions !== undefined && (
        <Column
          header='Acciones'
          align='center'
          body={(item) => <ActionDataTable {...actions} {...item} />}
        />
      )}
    </PrimeDatatable>
  )
}
