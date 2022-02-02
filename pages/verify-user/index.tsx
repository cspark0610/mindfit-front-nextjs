//main tools
import Image from 'next/image'
//components
import { Container } from 'react-bootstrap'
import { VerifyUserCard } from 'components/molecules/VerifyUserCard'

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
