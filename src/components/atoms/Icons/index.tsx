// bootstrap components
import { Button } from 'react-bootstrap'

// prime components
import { PrimeIcons } from 'primereact/api'

// type
import { FC } from 'react'

export const Icons: FC<{ handleClickIcon: (ev: string) => void }> = ({
  handleClickIcon,
}) => {
  return (
    <>
      {Object.values(PrimeIcons).map((item) => (
        <Button
          key={item}
          variant='link'
          className='p-0 m-0'
          onClick={() => handleClickIcon(item)}>
          <i className={item} />
        </Button>
      ))}
    </>
  )
}
