// main tools
import { useState } from 'react'
import { useRouter } from 'next/router'

// gql
import { useQuery } from '@apollo/client'
import GET_LOCALES from 'lib/strapi/queries/I18NLocales/getLocales.gql'

// bootstrap components
import { Dropdown } from 'react-bootstrap'
import { Globe } from 'react-bootstrap-icons'

// styles
import classes from 'styles/ChooseLanguage/styles.module.scss'

// types
import { FC } from 'react'
import { microServices } from 'commons'

type localeType = { attributes: { name: string; code: string } }

export const ChooseLanguage: FC = () => {
  const [locales, setLocales] = useState<localeType[]>([])
  const { route, asPath, push } = useRouter()

  useQuery(GET_LOCALES, {
    context: { ms: microServices.strapi },
    onCompleted: (data) => setLocales(data.i18NLocales.data),
  })

  const handleChangeLocale = (locale: string | null) =>
    push(route, asPath, { locale: locale as string, scroll: false })

  return (
    <Dropdown onSelect={handleChangeLocale} className={classes.dropdown}>
      <Dropdown.Toggle id='language-selector' className={classes.toggle}>
        <Globe />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {locales.map(({ attributes }: localeType) => (
          <Dropdown.Item eventKey={attributes.code} key={attributes.code}>
            {attributes.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
