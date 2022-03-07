export const items = [
  { id: 1, name: 'maría', status: 'suspendido' },
  { id: 2, name: 'Ana', status: 'activo' },
  { id: 3, name: 'David', status: 'suspendido' },
]

export const tableItems = [
  { field: 'name', header: 'Nombre y Apellido' },
  { field: 'status', header: 'Status' },
]

export const handlePause = (id: string | number) => console.log(id, 'pausa')
export const handleRemove = (id: string | number) => console.log(id, 'remove')
export const handleEdit = (id: string | number) => console.log(id, 'edit')
