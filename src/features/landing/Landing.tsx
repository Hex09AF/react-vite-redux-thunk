import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import data from "./data";
import "./style.scss";

const oddData = data.filter((_, i) => i % 2 == 0);
const evenData = data.filter((_, i) => i % 2 != 0);
const n = data.length;
const rat = 1 / n;
const ratY = 100 / ((n + 1) / 2);
const input = data.reduce((pre, _, i) => {
  return pre.concat(
    i * rat,
    i * rat + ((i + 1) * rat - i * rat) / 3,
    i * rat + (2 * ((i + 1) * rat - i * rat)) / 3,
    (i + 1) * rat
  );
}, []);

function Title({ title, scrollYProgress, i }) {
  const input = data.slice(0, i + 1).reduce((pre, _, ix) => {
    return pre.concat(
      ix * rat,
      ix * rat + ((ix + 1) * rat - ix * rat) / 3,
      ix * rat + (2 * ((ix + 1) * rat - ix * rat)) / 3,
      (ix + 1) * rat
    );
  }, []);

  const ratY = (i * 100) / (i + 0.5);

  const output = data
    .slice(0, i + 1)
    .reduce((pre, _, ix) => {
      return pre.concat(
        ix * ratY,
        ix * ratY + ((ix + 1) * ratY - ix * ratY) / 3,
        ix * ratY + (2 * ((ix + 1) * ratY - ix * ratY)) / 3,
        (ix + 1) * ratY
      );
    }, [])
    .map((v) => `-${Math.min(i * 100, v)}%`);

  const y = useTransform(scrollYProgress, input, output);

  const outputO = [i == 0 ? 1 : 0.5, 1, 1, i + 1 === n ? 1 : 0];

  const opacity = useTransform(
    scrollYProgress,
    [
      i * rat,
      i * rat + ((i + 1) * rat - i * rat) / 3,
      i * rat + (2 * ((i + 1) * rat - i * rat)) / 3,
      (i + 1) * rat,
    ],
    outputO
  );

  return (
    <motion.li style={{ y, opacity }}>
      <h1>{title}</h1>
    </motion.li>
  );
}

function Article({ scrollYProgress }) {
  const opacities = data.map((_, i) =>
    useTransform(
      scrollYProgress,
      [i * rat, ((i + 1) * rat + i * rat) / 2, (i + 1) * rat],
      [!i ? 1 : 0.3, 1, i + 1 === n ? 1 : 0.3]
    )
  );
  const filters = data.map((_, i) => {
    return useTransform(
      scrollYProgress,
      [
        i * rat,
        i * rat + ((i + 1) * rat - i * rat) / 3,
        i * rat + (2 * ((i + 1) * rat - i * rat)) / 3,
        (i + 1) * rat,
      ],
      [
        !i ? "blur(0px)" : "blur(3px)",
        "blur(0px)",
        "blur(0px)",
        i + 1 === n ? "blur(0px)" : "blur(3px)",
      ]
    );
  });

  const output = data.reduce((pre, _, i) => {
    if (i % 2 == 0)
      return pre.concat([
        i == 0 ? "0%" : "-25%",
        "0%",
        "0%",
        i + 1 === n ? "0%" : "-25%",
      ]);
    return pre.concat(["-25%", "-50%", "-50%", i + 1 === n ? "0%" : "-25%"]);
  }, []);

  const moveX = useTransform(scrollYProgress, input, output);

  const outputY = data
    .reduce((pre, _, i) => {
      if (i == 0) return pre.concat([0, 0, 0, 0]);
      if (i == 1) return pre.concat([0, 0, 0, (1 / 2) * ratY]);
      if (i == 2) return pre.concat([(1 / 2) * ratY, ratY, ratY, ratY]);
      if (i == 3) return pre.concat([ratY, ratY, ratY, ratY + (1 / 2) * ratY]);
      if (i == 4)
        return pre.concat([
          ratY + (1 / 2) * ratY,
          2 * ratY,
          2 * ratY,
          2 * ratY,
        ]);
      if (i == 5)
        return pre.concat([
          2 * ratY,
          2 * ratY,
          2 * ratY,
          2 * ratY + (1 / 2) * ratY,
        ]);
      if (i == 6)
        return pre.concat([
          2 * ratY + (1 / 2) * ratY,
          3 * ratY,
          3 * ratY,
          3 * ratY,
        ]);
    }, [])
    .map((v) => `-${v}%`);
  const moveY = useTransform(scrollYProgress, input, outputY);

  return (
    <motion.section className="article-c">
      <motion.div
        className="article-translate"
        style={{
          x: moveX,
          y: moveY,
        }}
      >
        <div className="article-w">
          <div className="article-odd">
            {oddData.map((v, i) => {
              return (
                <motion.article
                  key={v.subTitle}
                  initial={{
                    opacity: !i ? 1 : 0.3,
                    filter: !i ? `blur(0px)` : `blur(3px)`,
                  }}
                  style={{ filter: filters[i * 2], opacity: opacities[i * 2] }}
                >
                  <h1>{v.subTitle}</h1>
                  <h2>{v.title}</h2>
                  <p>{v.paragraph}</p>
                </motion.article>
              );
            })}
          </div>
          <div className="article-even">
            {evenData.map((v, i) => {
              return (
                <motion.article
                  key={v.subTitle}
                  initial={{
                    opacity: 0.3,
                    filter: `blur(3px)`,
                  }}
                  style={{
                    filter: filters[i * 2 + 1],
                    opacity: opacities[i * 2 + 1],
                  }}
                >
                  <h1>{v.subTitle}</h1>
                  <h2>{v.title}</h2>
                  <p>{v.paragraph}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default function App() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <motion.div
      className="scroll-c"
      ref={ref}
      style={{
        height: "3000vh",
      }}
    >
      <section className="title-c">
        <div className="number-c">
          {data.map((_, i) => {
            return <div key={i + ""}>{i + 1}</div>;
          })}
        </div>
        <ul>
          {data.map((v, i) => {
            return (
              <Title
                i={i}
                scrollYProgress={scrollYProgress}
                key={i}
                title={v.title}
              />
            );
          })}
        </ul>
      </section>

      <Article scrollYProgress={scrollYProgress} />
    </motion.div>
  );
}
