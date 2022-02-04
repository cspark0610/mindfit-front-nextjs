// Bootstrap Component
import { Container } from 'react-bootstrap'

// Animation Component
import { RowMotion } from 'components/atoms/AnimateComponents'

// Animation
import { motion } from 'framer-motion'
import { viewportFadeIn } from 'commons/animations'

// Styles
import classes from 'styles/ProfileTypes/profileTypes.module.scss'

// Types
import { FC } from 'react'

export const ProfileTypes: FC = () => {
  return (
    <Container className={classes.container}>
      <motion.div {...viewportFadeIn}>
        <p className={classes.header}>
          Ahora es el turno de conocer qué tipo de perfil no trabas con el
          equipo
        </p>
        <h1 className={`${classes.title} mb-5`}>Trabajo en equipo</h1>
      </motion.div>
      <Container>
        <RowMotion {...viewportFadeIn} xs={1} lg={2}>
          <div>
            <p className={classes.description}>
              ¿Qué <b>perfiles</b> podemos desarrollar si lo viésemos necesario?
            </p>
            <ul>
              <li>
                <h2 className={`${classes.profile} mb-2`}>Coordinador</h2>
                <p>
                  Son los miembros más <b>Serviciales</b> del equipo, ayudando a
                  mantener una <b>atmósfera</b> de equipo positiva. Son
                  sensibles a los trasfondos emocionales que pueden afectar a la
                  forma en que el equipo rabaja en conjunto y pueden ser útiles
                  para resolver dificultades. Además de ser{' '}
                  <b>Buenos escuchando</b> y muy <b>competentes</b> en
                  comunicacion interna, son personas empáticas y afables lo que
                  los hace populares entre sus compañeros. Tu nivel de
                  adaptación a este perfil es sutilmente bajo.
                </p>
              </li>
              <li>
                <h2 className={`${classes.profile} mb-2`}>Creador de equipo</h2>
                <p>
                  <b>Maduros, calmados y seguros,</b> son responsables de aunar
                  los esfuerzos del grupo hacia un objetivo compartido. En un
                  equipo con diversas habilidades y comportamientos, son capaces
                  de <b>identificar y utilizar los talentos</b> de cada
                  individuo de la mejor manera posible, delegar el trabajo en
                  consecuencia y alentar a cada persona a dar lo mejor de sí
                  misma en beneficio del equipo. Tu nivel de adaptación a este
                  perfil es bajo.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li>
                <h2 className={`${classes.profile} mb-2`}>Evaluador</h2>
                <p>
                  Son personas <b>serias y pridentes,</b> muy adecuadas para
                  analizar problemas y evaluar ideas y sugerencias para
                  determinar su viabilidad y ayudar a desarrollarlas. Serán muy
                  útiles para el equipo si pueden establecer una relación sólida
                  de trabajo con el perfil creativo del equipo. Disfrutan del
                  debate y se enorgullecen de <b>Tomarse su tiempo</b> para
                  tomar grandes decisiones correctamente. Como tales, deberían
                  ser los árbritarios de la toma de decisiones dentro del
                  equipo. Tu nivel de adaptación a este perfil es bajo
                </p>
              </li>
              <li>
                <h2 className={`${classes.profile} mb-2`}>Finalizador</h2>
                <p>
                  Con un ojo puesto en los detalles y siempre esforzándose por
                  alcanzar los estándares más altos posibles, son ideales para
                  trabajar en áreas que requieran un seguimiento cuidadoso, una{' '}
                  <b>concentración profunda</b> y un{' '}
                  <b>alto grado de precisión,</b> como correción de pruebas o
                  verificación. Motivados por una ansiedad interna para hacer
                  las cosas bien, necesitan pocos estímulos externos en su
                  búsqueda de la perfección. Dados sus propios altos estándares,
                  asumen la responsabilidad y es poco probable que entreguen el
                  trabajo a los demás por temor a que la otra persona no brinde
                  a la tara el mismo cuidado y atención que ellos. Tu nivel de
                  adaptacion a este perfil es muy bajo.
                </p>
              </li>
            </ul>
          </div>
        </RowMotion>
      </Container>
    </Container>
  )
}
