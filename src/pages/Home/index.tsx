import { Space } from '@arco-design/web-react'
import { Outlet } from 'react-router-dom'
import { MyCard } from '../../components'
import ballSrc from '../../assets/ball.png'
import clockSrc from '../../assets/clock.png'
import drawBoard from '../../assets/drawBoard.png'
import background from '../../assets/background.png'
import back from '../../assets/back.jpg'
import styles from './index.module.less'

const CardList = [
  {
    title: '闹钟',
    path: 'clock',
    introduce: '这个动画是关于闹钟的',
    src: back,
  },
  {
    title: '小球动画',
    path: 'ball',
    introduce: '这个动画是关于小球的',
    src: back,
  },
  {
    title: '背景',
    path: 'background',
    introduce: '这个动画是关于背景的',
    src: back,
  },
  {
    title: '画板',
    path: 'DrawBoard',
    introduce: '这是一个画板',
    src: back,
  },
]

export default function Index() {
  return (
    <Space className={styles['container']}>
      {CardList.map(({ title, path, introduce, src }) => {
        return <MyCard key={path} src={src} title={title} path={path} introduce={introduce} />
      })}
      <Outlet />
    </Space>
  )
}
