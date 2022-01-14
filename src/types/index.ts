// types
import { FormEvent, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { GetServerSideProps } from 'next'

export interface ChangeType extends ChangeEvent<HTMLInputElement> {}
export interface SubmitType extends FormEvent<HTMLFormElement> {}
export type GetSSPropsType<PropsType> = PropsType extends GetServerSideProps<
  infer Props,
  any
>
  ? Props
  : PropsType
export type SetStateType<objectType> = Dispatch<SetStateAction<objectType>>

type UserType = {
  email?: string | null
  id?: string | null
  image?: string | null
  name?: string | null
}

declare module 'next-auth' {
  export interface Session {
    user: UserType
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    user: UserType
  }
}
