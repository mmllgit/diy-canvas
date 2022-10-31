import { Button, Form, Input, InputNumber, Message, Select, Space } from '@arco-design/web-react'
import FormItem from '@arco-design/web-react/es/Form/form-item'
import React, { useEffect, useRef, useState } from 'react'
import { drawRect } from '../../../commonFunction'
import styles from './index.module.less'

export default function Index() {
  const reg = /Android|webOS|iPhone|iPod|BlackBerry/i
  if (reg.test(navigator.userAgent)) {
    return <div className={styles['tip']}>此设备暂不支持,请到pc端体验</div>
  }
  const Option = Select.Option
  const options = [
    {
      name: '方形',
      option: 'square',
    },
    {
      name: '屁股',
      option: 'butt',
    },
    {
      name: '圆形',
      option: 'round',
    },
  ]
  const extOptions = ['png', 'jpg', 'jpeg', 'webp']

  const canvas = useRef<HTMLCanvasElement>(null)
  const previewContainer = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [strokeColor, setStokeColor] = useState<string>('#000')
  const [strokeWidth, setStrokeWidth] = useState<number>(3)
  const [strokeCap, setStrokeCap] = useState<CanvasLineCap>('square')
  const [filename, setFilename] = useState<string>('')
  const [extname, setExtname] = useState<string>('png')
  const [startX, setStartX] = useState<number>(0)
  const [startY, setStartY] = useState<number>(0)

  const drawStart = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(true)
    setStartX(e.clientX - canvas.current?.offsetLeft!)
    setStartY(e.clientY - canvas.current?.offsetTop!)
    ctx?.beginPath()
  }

  const drawMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return
    const x = e.clientX - canvas.current?.offsetLeft!
    const y = e.clientY - canvas.current?.offsetTop!
    ctx?.moveTo(startX, startY)
    ctx?.lineTo(x, y)
    ctx!.strokeStyle = strokeColor
    ctx!.lineCap = strokeCap
    ctx!.lineWidth = strokeWidth
    ctx?.stroke()
    setStartX(x)
    setStartY(y)
  }

  const drawEnd = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(false)
    ctx?.closePath()
  }

  const mouseLeave = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(false)
  }

  const removeLastChild = () => {
    const parentElement = previewContainer.current!
    const lastNode = parentElement.lastChild
    if (lastNode) parentElement.removeChild(lastNode)
  }

  const boardReset = () => {
    ctx?.clearRect(0, 0, canvas.current!.width, canvas.current!.height)
    removeLastChild()
  }

  const preview = () => {
    removeLastChild()
    const parentElement = previewContainer.current!
    canvas.current?.toBlob(blob => {
      const newImg = document.createElement('img')
      const url = URL.createObjectURL(blob!)
      newImg.onload = () => {
        URL.revokeObjectURL(url)
      }
      newImg.src = url
      parentElement.appendChild(newImg)
    })
  }

  const colorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStokeColor(e.currentTarget.value)
  }

  const numberChange = (value: number) => {
    setStrokeWidth(value)
  }

  const capChange = (value: CanvasLineCap) => {
    setStrokeCap(value)
  }

  const filenameChange = (value: string) => {
    setFilename(value)
  }

  const extChange = (value: string) => {
    setExtname(value)
  }

  const exportImage = () => {
    canvas.current?.toBlob(blob => {
      const a = document.createElement('a')
      a.style.display = 'none'
      a.download = `${filename}.${extname}`
      a.href = URL.createObjectURL(blob!)
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(a.href)
      document.body.removeChild(a)
    })
  }

  const touchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setStartX(e.changedTouches[0].clientX)
    setStartY(e.changedTouches[0].clientY)
    ctx?.beginPath()
  }

  const touchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientX
    ctx?.moveTo(startX, startY)
    ctx?.lineTo(x, y)
    ctx!.strokeStyle = strokeColor
    ctx!.lineCap = strokeCap
    ctx!.lineWidth = strokeWidth
    ctx?.stroke()
    setStartX(x)
    setStartY(y)
  }

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d')!
    drawRect(ctx, 0, 0, 500, 500, '#fff')
    setCtx(ctx)
  }, [])

  return (
    <Space className={styles['container']}>
      <div className={styles['form-container']}>
        <div className={styles['form-title']}>配置选项</div>
        <Form style={{ width: 400 }}>
          <FormItem label='画笔颜色'>
            <input type='color' onChange={e => colorChange(e)} />
          </FormItem>
          <FormItem label='画笔宽度'>
            <InputNumber
              style={{ width: 230 }}
              onChange={e => numberChange(e)}
              min={3}
              max={10}
              value={strokeWidth}
              defaultValue={3}></InputNumber>
          </FormItem>
          <FormItem label='画笔形状'>
            <Select
              style={{ width: 230 }}
              placeholder='请选择笔尖形状'
              defaultValue={'square'}
              onChange={value => capChange(value)}>
              {options.map(({ name, option }) => (
                <Option key={option} value={option}>
                  {name}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='图片名称'>
            <Input
              placeholder='输入图片名称，默认为 img'
              onChange={e => filenameChange(e)}
              style={{ width: 230 }}></Input>
          </FormItem>
          <FormItem label='图片格式'>
            <Select
              style={{ width: 230 }}
              placeholder='选择图片格式，默认为 png'
              onChange={value => extChange(value)}>
              {extOptions.map(option => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem>
            <Space style={{ marginLeft: 10 }}>
              <Button type='primary' onClick={() => preview()}>
                预览
              </Button>
              <Button type='primary' onClick={() => boardReset()}>
                清空
              </Button>
              <Button type='primary' onClick={() => exportImage()}>
                生成图片
              </Button>
            </Space>
          </FormItem>
        </Form>
      </div>
      <div className={styles['board-container']}>
        <div style={{ color: 'rgb(222, 151, 9)' }} className={styles['board-title']}>
          画板区域
        </div>
        <canvas
          className={styles['canvas']}
          onMouseDown={e => drawStart(e)}
          onMouseUp={e => drawEnd(e)}
          onMouseMove={e => drawMove(e)}
          onMouseLeave={e => mouseLeave(e)}
          onTouchStart={e => touchStart(e)}
          onTouchMove={e => touchMove(e)}
          ref={canvas}
          width='500'
          height='500'></canvas>
      </div>
      <div className={styles['board-container']}>
        <div style={{ color: 'rgb(82, 196, 26)' }} className={styles['board-title']}>
          预览区域
        </div>
        <div className={styles['preview']} ref={previewContainer}></div>
      </div>
    </Space>
  )
}
