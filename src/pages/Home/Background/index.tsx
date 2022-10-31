import React, { useEffect, useRef, useState } from "react";
import { Ball, drawRect } from "../../../commonFunction";
import styles from "./index.module.less";

export default function Index() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ballList, setBallList] = useState<Ball[]>([]);
  const [screen, setScreen] = useState({
    width: document.body.clientWidth,
    height: window.innerHeight,
  });
  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, screen.width, screen.height);
    drawRect(ctx, 0, 0, screen.width, screen.height, "black");
    const ball = new Ball(
      ctx,
      Math.floor(Math.random() * screen.width - 10) + 5,
      10,
      Math.floor(Math.random() * 3) + 3,
      Math.floor(Math.random() * 3) + 3,
      0,
      "white"
    );
    if (ballList[0] && ballList[0].y > screen.height) {
      ballList.shift();
    }
    ballList.push(ball);
    setBallList(ballList);
    for (let i = 0; i < ballList.length; i++) {
      ballList[i].draw();
      ballList[i].move();
    }
  };

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d")!;
    (canvas.current as any).width = document.body.clientWidth;
    (canvas.current as any).height = window.innerHeight;
    const timer = setInterval(() => {
      drawBackground(ctx);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <canvas id={styles["canvas"]} ref={canvas}></canvas>;
}
