// types
import { FormEvent, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { GetServerSideProps } from 'next'

// models
import { UserDataType } from 'types/models/User'

export interface ChangeType extends ChangeEvent<HTMLInputElement> {}
export interface SubmitType extends FormEvent<HTMLFormElement> {}
export type GetSSPropsType<PropsType> = PropsType extends GetServerSideProps<
  infer Props,
  any
>
  ? Props
  : PropsType
export type SetStateType<objectType> = Dispatch<SetStateAction<objectType>>

declare module 'next-auth' {
  export interface Session {
    token: string
    user: UserDataType
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    backendToken: string
    backendRefresh: string
  }
}
