// Styles
import classes from 'styles/Cover/cover.module.scss'

export const Cover = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        Informe de <br /> <b>pruebas diagnósticas</b>
      </h1>
      <p className={classes.copyright}>
        Haki Health @ Todos los derechos reservados
      </p>
    </div>
  )
}
