import { VerifyUserCard } from 'components/molecules/VerifyUserCard'
import Image from 'next/image'
import React from 'react'
import { Container } from 'react-bootstrap'

export default function VerifyUser() {
  return (
    <>
      <Container className='d-flex flex-column align-items-center justify-content-center'>
        <Image
          src='/assets/icon/MINDFIT.svg'
          alt='Mindfit Logo'
          width={420}
          height={250}
          layout='intrinsic'
        />
        <VerifyUserCard />
      </Container>
    </>
  )
}
