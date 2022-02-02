// main tools
import Link from 'next/link'

// bootstrap components
import { Card, Badge } from 'react-bootstrap'

// styles
import classes from 'styles/Library/page.module.scss'

// types
import { FC } from 'react'

export const ArticleCard: FC = () => {
  return (
    <Link href='#'>
      <a>
        <Card className={classes.articleCard}>
          <Card.Img src='/assets/images/article.png' alt='Card image' />
          <Card.ImgOverlay className={classes.articleCard_overlay}>
            <header className={classes.articleCard_overlay_header}>
              <Card.Text className={classes.articleCard_overlay_category}>
                Article
              </Card.Text>
              <Badge pill bg='secondary'>
                20 min
              </Badge>
            </header>
            <Card.Body className={classes.articleCard_overlay_body}>
              <Card.Title className={classes.articleCard_overlay_title}>
                Retomar habitos
              </Card.Title>
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
      </a>
    </Link>
  )
}
