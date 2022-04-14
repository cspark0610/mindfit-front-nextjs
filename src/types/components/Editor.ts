// types
import { EditorProps } from 'primereact/editor'

export interface StyledEditorProps extends EditorProps {
  coachNote: { id: number; note?: string; evaluation?: string }
  removed?: (id: number) => void
  loading: boolean
  save: () => void
  content: any
}
