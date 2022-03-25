// main tools
import axios from 'axios'

// types
import { SetStateType } from 'types'

export const uploadFilesService = async (
  url: string,
  data: FormData,
  setProgress: SetStateType<number>
) =>
  axios
    .put(url, data.get('file'), {
      headers: { 'Content-Type': (data.get('file') as File).type },
      onUploadProgress: (p) => setProgress((p.loaded / p.total) * 100),
    })
    .then(() => setProgress(0))
    .catch((err) => {
      setProgress(0)
      console.error(err)
    })
