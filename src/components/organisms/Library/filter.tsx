// main tools
import { useState, useEffect } from 'react'
import { PrimeIcons } from 'primereact/api'

// bootstrap components
import { Row, Col } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'

// styles
import classes from 'styles/Library/page.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'

type FilterProps = {
  placeholder: string
  postCategories: string[]
  refetch: (ev: any) => void
  defaultCategory: string | string[]
}

export const Filter: FC<FilterProps> = ({
  refetch,
  placeholder,
  postCategories,
  defaultCategory,
}) => {
  const [searcher, setSearcher] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)

  const handleClick = (category: string) => {
    setSelectedCategory(category)
    refetch({ postCategories: { category: { eq: category } } })
  }

  const handleChange = (ev: ChangeType) => {
    setSearcher(ev.target.value)
    refetch({ title: { containsi: ev.target.value } })
    setSelectedCategory('')
  }

  useEffect(() => {
    if (defaultCategory) {
      refetch({ postCategories: { category: { eq: defaultCategory } } })
    }
  }, [defaultCategory, refetch])

  return (
    <Row className={classes.filter}>
      <Col xs={12} md={8}>
        <form className={`p-input-icon-right ${classes.searcher}`}>
          <i className={`${classes.inputIcon} ${PrimeIcons.SEARCH}`} />
          <InputText
            type='search'
            value={searcher}
            placeholder={placeholder}
            className={classes.input}
            onChange={(ev) => handleChange(ev)}
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
