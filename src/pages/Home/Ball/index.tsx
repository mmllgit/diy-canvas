import { Form, Button, InputNumber } from "@arco-design/web-react";
import { useEffect, useRef, useState } from "react";
import { Ball, randomColor } from "../../../commonFunction";
import styles from "./index.module.less";

let timer: NodeJS.Timer | null = null;

export default function Index() {
  const FormItem = Form.Item;
  const formRef = useRef<any>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ballNums, setBallNums] = useState<number>(0);

  const ballMove = (ctx: CanvasRenderingContext2D, ballList: Ball[]) => {
    ctx.clearRect(0, 0, 400, 400);
    for (let i = 0; i < ballList.length; i++) {
      ballList[i].draw();
      ballList[i].moveCrash();
    }
  };

  const submit = (values: any) => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    const { nums = 0 } = values;
    setBallNums(nums);
    const ctx = canvas.current?.getContext("2d")!;
    const list: Ball[] = [];
    for (let i = 0; i < nums; i++) {
      const ball = new Ball(
        ctx,
        200,
        200,
        Math.random() * 10 + 5,
        Math.floor(Math.random() * 6) - 3,
        Math.PI * 2 * Math.random(),
        randomColor()
      );
      list.push(ball);
      ball.draw();
    }
    timer = setInterval(() => {
      ballMove(ctx, list);
    }, 10);
  };

  const resetNums = () => {
    const ctx = canvas.current?.getContext("2d")!;
    ctx.clearRect(0, 0, 400, 400);
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    setBallNums(0);
    formRef.current.resetFields();
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles["container"]}>
      <canvas id="canvas" ref={canvas} width="400" height="400"></canvas>
      <Form
        className={styles["form-container"]}
        ref={formRef}
        onSubmit={(values) => submit(values)}
        style={{ width: 600 }}
        autoComplete="off"
      >
        <FormItem className={styles["form-item"]} label="当前个数">
          <div>{ballNums}</div>
        </FormItem>
        <FormItem className={styles["form-item"]} label="小球个数" field="nums">
          <InputNumber placeholder="请输入小球个数，最少100个" min={100} />
        </FormItem>
        <FormItem className={styles["form-button"]}>
          <Button type="primary" htmlType="submit">
            开始
          </Button>
          <Button style={{ marginLeft: "10px" }} onClick={() => resetNums()}>
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
