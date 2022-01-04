// Main tools
import { useState } from 'react'
import Image from 'next/image'

// Components

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// Styles
// import classes from 'styles/Login/page.module.scss'

// Types
import { NextPage, GetServerSidePropsContext } from 'next'
import { GetSSPropsType } from 'types'

const UserDashboard: NextPage = () => {
  return (
    <div>
      <h1>Soy el UserDashboard</h1>
    </div>
  )
}

export default UserDashboard
