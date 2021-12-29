// main tools
import { PrimeIcons } from 'primereact/api'

// utils
import { regexValidation } from 'commons'

// styles
import classes from 'styles/UI/PasswordSuggestions/suggestions.module.scss'

// types
import { FC } from 'react'

export const passwordSuggestionsTemplate: FC<{ value: any }> = ({ value }) => {
  const validated = regexValidation(value)

  return (
    <ul className={classes.container}>
      <li>
        Minimo 8 caracteres
        {validated.minSize && (
          <i className={`mx-2 ${PrimeIcons.CHECK_CIRCLE}`} />
        )}
      </li>
      <li>
        Al menos un caracter alfabetico
        {validated.hasLetters && (
          <i className={`mx-2 ${PrimeIcons.CHECK_CIRCLE}`} />
        )}
      </li>
      <li>
        Al menos un caracter numerico
        {validated.hasNumbers && (
          <i className={`mx-2 ${PrimeIcons.CHECK_CIRCLE}`} />
        )}
      </li>

      <li>
        Al menos un caracter especial
        {validated.hasSpecials && (
          <i className={`mx-2 ${PrimeIcons.CHECK_CIRCLE}`} />
        )}
      </li>
    </ul>
  )
}
