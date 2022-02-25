import Styles from 'styles/VideoCall/VideoCall.module.scss'

export const WaitingRoom = () => {
  return (
    <>
      <div className={Styles.waitingRoom}>
        <h3>Sala de espera</h3>
        <p>
          ¡Hola!, tu coach está proximo a iniciar la sesión, estarás conectado a
          traveés de una video llamada, puedes encender o apagar tu camara y
          microfono cuando quieras.
        </p>
      </div>
    </>
  )
}
