import Image from 'next/image'
import React from 'react'
import { Badge, Button } from 'react-bootstrap'

export const Navbar = () => {
  return (
    <div className='navbar navbar-container d-flex justify-content-end'>
      <div className='avatar pr-3'>
        <Image
          src={
            'https://cdn.pixabay.com/photo/2016/06/06/17/05/woman-1439909_960_720.jpg'
          }
          width={72}
          height={72}
          alt='user avatar'
        />
      </div>
      <div className='notifications'>
        <div className='item'>
          <Button type='button' variant='link'>
            <i className='bi bi-bell'> </i>
          </Button>
          <Badge className='badge' pill={true} text='white'>
            3
          </Badge>
        </div>
      </div>
    </div>
  )
}
