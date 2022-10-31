import { useEffect, useRef, useState } from "react";
import { drawLine, drawCircle, drawText } from "../../../commonFunction";
import styles from "./index.module.less";

const clockInit = {
  w: 400,
  h: 400,
  r: 180,
  r1: 176,
  r_hour: 60,
  r_minute: 120,
  r_second: 140,
  r_square: 155,
  r_circle: 10,
  deg: 2 * Math.PI,
  hour_w: 10,
  minute_w: 7,
  second_w: 4,
  single_deg: Math.PI / 6,
  single_scale: Math.PI / 30,
  hour_deg: Math.PI / 6,
  hour_minute_deg: Math.PI / 720,
  hour_second_deg: Math.PI / 720 / 60,
  minute_deg: Math.PI / 30,
  minute_second_deg: Math.PI / 30 / 60,
  second_deg: Math.PI / 30,
  inner_circle: 10,
};

export default function Index() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [clock, setClock] = useState(clockInit);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(-clock.w / 2, -clock.h / 2, clock.w / 2, clock.h / 2);
    drawCircle(ctx, 0, 0, clock.r, "#fff");
    drawCircle(ctx, 0, 0, clock.inner_circle, "#000");
    for (let i = 1; i <= 12; i++) {
      const x = Math.sin(-clock.single_deg * i + Math.PI) * clock.r_square;
      const y = Math.cos(-clock.single_deg * i + Math.PI) * clock.r_square;
      drawText(ctx, i + "", x, y);
    }
    for (let i = 0; i < 60; i++) {
      const x1 = Math.sin(clock.single_scale * i) * clock.r;
      const y1 = Math.cos(clock.single_scale * i) * clock.r;
      let x2 = Math.sin(clock.single_scale * i) * clock.r1;
      let y2 = Math.cos(clock.single_scale * i) * clock.r1;
      let color = "gray";
      if (i % 5 === 0) {
        color = "#000";
        x2 = Math.sin(clock.single_scale * i) * (clock.r1 - 5);
        y2 = Math.cos(clock.single_scale * i) * (clock.r1 - 5);
      }
      drawLine(ctx, x1, y1, x2, y2, color, 4);
    }
    const time = new Date();
    const hour = time.getHours() % 12;
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const hour_deg =
      -hour * clock.hour_deg -
      minute * clock.hour_minute_deg -
      second * clock.hour_second_deg +
      Math.PI;
    const minute_deg =
      -minute * clock.minute_deg - second * clock.minute_second_deg + Math.PI;
    const second_deg = Math.PI - clock.second_deg * second;
    drawLine(
      ctx!,
      0,
      0,
      Math.sin(hour_deg) * clock.r_hour,
      Math.cos(hour_deg) * clock.r_hour,
      "#000",
      clock.hour_w
    );
    drawLine(
      ctx!,
      0,
      0,
      Math.sin(minute_deg) * clock.r_minute,
      Math.cos(minute_deg) * clock.r_minute,
      "#000",
      clock.minute_w
    );
    drawLine(
      ctx!,
      0,
      0,
      Math.sin(second_deg) * clock.r_second,
      Math.cos(second_deg) * clock.r_second,
      "red",
      clock.second_w
    );
  };

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d")!;
    ctx.translate(clock.w / 2, clock.h / 2);
    setInterval(() => {
      draw(ctx);
    }, 1000);
  }, []);

  return (
    <div className={styles["canvas-container"]}>
      <canvas
        className={styles["canvas"]}
        ref={canvas}
        width="400px"
        height="400px"
      >
        浏览器版本过低，请更换浏览器或者升级浏览器。
      </canvas>
    </div>
  );
}
