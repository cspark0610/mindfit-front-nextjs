// types
import { EditorProps } from 'primereact/editor'

export interface StyledEditorProps extends EditorProps {
  loading: boolean
  coachNote: { id: number; note: string }
  save: () => void
  removed?: (id: number) => void
}
