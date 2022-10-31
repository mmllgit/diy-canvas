import { Avatar, Card, Image, Link, Space, Typography } from '@arco-design/web-react'
import Meta from '@arco-design/web-react/es/Card/meta'
import {
  IconThumbUp,
  IconShareInternal,
  IconMore,
  IconThumbUpFill,
} from '@arco-design/web-react/icon'
import avatar from '../../assets/avatar.png'
import { useState } from 'react'

interface IProps {
  title: string
  path: string
  introduce: string
  src: string
}

export function MyCard({ title, path, introduce, src }: IProps) {
  const [isDig, setIsDig] = useState<boolean>(false)

  return (
    <Card
      className='card-with-icon-hover'
      hoverable
      extra={<Link href={`/${path}`}>前往</Link>}
      cover={
        <div style={{ height: 204, overflow: 'hidden' }}>
          <Image
            style={{ width: '40vw', transform: 'translateY(-20px)', aspectRatio: 5 / 3 }}
            alt={title}
            src={src}
          />
        </div>
      }
      actions={[
        <span className={'icon-hover'} onClick={() => setIsDig(!isDig)}>
          {isDig ? <IconThumbUpFill /> : <IconThumbUp />}
        </span>,
        <span className='icon-hover'>
          <IconShareInternal />
        </span>,
        <span className='icon-hover'>
          <IconMore />
        </span>,
      ]}>
      <Meta
        avatar={
          <Space>
            <Avatar size={24}>
              <img src={avatar} alt='head' />
            </Avatar>
            <Typography.Text>Username</Typography.Text>
          </Space>
        }
        title={title}
        description={introduce}
      />
    </Card>
  )
}
