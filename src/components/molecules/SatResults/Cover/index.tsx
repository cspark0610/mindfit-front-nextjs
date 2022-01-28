// Animation
import { motion } from 'framer-motion'
import { fadeIn } from 'commons/animations'

// Styles
import classes from 'styles/Cover/cover.module.scss'

// Type
import { FC } from 'react'

export const Cover: FC = () => {
  return (
    <motion.div {...fadeIn} className={classes.container}>
      <h1 className={classes.title}>
        Informe de <br /> <b>pruebas diagnósticas</b>
      </h1>
      <p className={classes.copyright}>
        Haki Health @ Todos los derechos reservados
      </p>
    </motion.div>
  )
}
