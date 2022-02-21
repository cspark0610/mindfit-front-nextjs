// main tools
import { useState, useRef, useEffect } from 'react'
import { PrimeIcons } from 'primereact/api'

// bootstrap components
import { Row, Col } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'

// styles
import classes from 'styles/Library/page.module.scss'

// types
import { FC } from 'react'
import { SubmitType } from 'types'

type FilterProps = {
  refetch: (ev: any) => void
  postCategories: string[]
  defaultCategory: string | string[]
}

export const Filter: FC<FilterProps> = ({
  refetch,
  postCategories,
  defaultCategory,
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [searcher, setSearcher] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)

  const handleClick = (category: string) => {
    setSelectedCategory(category)
    const filter = { postCategories: { category: { eq: category } } }
    refetch(filter)
  }

  const handleSubmit = (ev: SubmitType) => {
    ev.preventDefault()
    const filter = { title: { contains: searcher } }
    refetch(filter)
    setSearcher('')
    setSelectedCategory('')
  }

  useEffect(() => {
    if (defaultCategory) {
      const filter = { postCategories: { category: { eq: defaultCategory } } }
      refetch(filter)
    }
  }, [defaultCategory, refetch])

  return (
    <Row className={classes.filter}>
      <Col xs={12} md={8}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`p-input-icon-right ${classes.searcher}`}>
          <i
            onClick={() => formRef.current?.requestSubmit()}
            className={`${classes.inputIcon} ${PrimeIcons.SEARCH}`}
          />
          <InputText
            type='search'
            value={searcher}
            placeholder='Buscar'
            className={classes.input}
            onChange={(ev) => setSearcher(ev.target.value)}
          />
        </form>
      </Col>
      <Col className={classes.categories} xs={12}>
        {postCategories.map((category, idx: number) => (
          <span
            key={idx}
            onClick={() => handleClick(category)}
            className={`${
              category === selectedCategory && classes.categories_item_selected
            } ${classes.categories_item}`}>
            {category}
          </span>
        ))}
      </Col>
    </Row>
  )
}
