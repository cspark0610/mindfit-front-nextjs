// main tools
import Link from 'next/link'

// bootstrap components
import { Card, Badge } from 'react-bootstrap'

// styles
import classes from 'styles/Library/articleCard.module.scss'

// types
import { FC } from 'react'

type ArticleCardProps = { id: number; attributes: any }

export const ArticleCard: FC<ArticleCardProps> = ({ id, attributes }) => {
  return (
    <Link href={`/library/${id}`}>
      <a>
        <Card className={classes.articleCard}>
          <Card.Img
            src={attributes.mainImage.data.attributes.url}
            alt='Card image'
          />
          <Card.ImgOverlay className={classes.articleCard_overlay}>
            <header className={classes.articleCard_overlay_header}>
              <Badge pill bg='secondary'>
                {attributes.badge}
              </Badge>
            </header>
            <Card.Body className={classes.articleCard_overlay_body}>
              <Card.Title className={classes.articleCard_overlay_title}>
                <div dangerouslySetInnerHTML={{ __html: attributes.title }} />
              </Card.Title>
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
      </a>
    </Link>
  )
}
