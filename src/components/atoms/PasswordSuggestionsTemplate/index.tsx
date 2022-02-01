// main tools
import { PrimeIcons } from 'primereact/api'

// utils
import { regexValidation } from 'commons'

// styles
import classes from 'styles/UI/PasswordSuggestions/suggestions.module.scss'

// types
import { FC } from 'react'

export const passwordSuggestionsTemplate: FC<{
  value?: string
  suggestionsContent: any
}> = ({ value, suggestionsContent }) => {
  const validated = regexValidation(value as string)

  return (
    <ul className={classes.container}>
      {suggestionsContent.suggestionList.map(
        (suggestion: { value: string; label: string }) => (
          <li key={suggestion.value}>
            {suggestion.label}
            {validated[suggestion.value as keyof typeof validated] && (
              <i className={`mx-2 ${PrimeIcons.CHECK_CIRCLE}`} />
            )}
          </li>
        )
      )}
    </ul>
  )
}
