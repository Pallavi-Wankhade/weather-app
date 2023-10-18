/* eslint-disable react/prop-types */
import styles from "./WeatherInfo.module.css";

const WeatherInfo = ({
  city,
  temperature,
  tempMax,
  tempMin,
  humidity,
  speed,
  desc,
}) => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.cty}>{city}</div>
        <div className={styles.cty}>
          {temperature}
          <label> &deg;C</label>
        </div>
        <div className={styles.tmp}>
          <label>Max : </label>
          {tempMax} <label> &deg;C </label>
          <label>&nbsp;&nbsp; Min : </label>
          {tempMin}
          <label> &deg;C</label>
        </div>
        <div>
          <div className={styles.hmd}>
            <div>
              <img src="./src/images/humid.jpg" height="20" width="20" />
              &nbsp; <label className={styles.lbl}>humidity : </label>{" "}
              {humidity}
              <label>&nbsp;%</label>
            </div>
            <div>
              <img src="./src/images/w.png" height="20" width="20" />
              &nbsp;&nbsp;
              <label className={styles.lbl}>wind speed : </label> {speed}
              <label>&nbsp; km/hr</label>
            </div>
            <div>
              <img src="./src/images/w.png" height="20" width="20" />
              &nbsp;&nbsp;
              <label className={styles.lbl}>descriptions : </label> {desc}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WeatherInfo;
