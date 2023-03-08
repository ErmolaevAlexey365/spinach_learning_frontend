import React, { useState } from "react";
import styles from "../../styles/dashboard/dashboard.module.css";
import { IJobs } from "../../interfaces/dashboardInterfaces";
import Chip from "@mui/material/Chip";


const Jobs = ({
  title,
  postedOn,
  description,
  skills,
  scoring,
  url,
}: IJobs) => {
  let textLength = description.length;

  const [readMore, setReadMore] = useState<boolean>(false);
  const [viewMore, setViewMore] = useState<boolean>(false);
  return (
    <div className={styles.jobs}>
      <h3>{title}</h3>
      <p>{postedOn}</p>

      {textLength > 200 ? (
        !readMore ? (
          <>
            <div className={!readMore ? styles.jobsDescription : ""}>
              {description.split("<br>")}
            </div>
            <p
              style={{ marginBottom: "0", cursor: "pointer" }}
              onClick={() => setReadMore(!readMore)}
            >
              ...read more
            </p>
          </>
        ) : (
          <>
            <div>{description.split("<br>")}</div>
            <p
              style={{ marginBottom: "0", cursor: "pointer" }}
              onClick={() => setReadMore(!readMore)}
            >
              ...close
            </p>
          </>
        )
      ) : (
        <div className={styles.jobsDescription}>
          {description.split("<br>")}
        </div>
      )}

      {skills.split(",").length > 11 ? (
        !viewMore ? (
          <>
            <div className={styles.skills_close}>
              {" "}
              {skills.split(",").map((el: string,index:number) => {
                if (el != "")
                  return <Chip key={index} label={el} size="small" color="primary" />;
              })}
            </div>
            <Chip
              label="close"
              className={styles.chip_button}
              size="small"
              onClick={() => setViewMore(!viewMore)}
            />
          </>
        ) : (
          <>
            <div className={styles.skills}>
              {" "}
              {skills.split(",").map((el: string,index:number) => {
                if (el != "")
                  return <Chip key={index} label={el} size="small" color="primary" />;
              })}
            </div>
            <Chip
              label="show more"
              className={styles.chip_button}
              size="small"
              onClick={() => setViewMore(!viewMore)}
            />
          </>
        )
      ) : (
        <div className={styles.skills}>
          {" "}
          {skills.split(",").map((el: string,index:number) => {
            if (el != "")
              return <Chip key={index} label={el} size="small" color="primary" />;
          })}
        </div>
      )}

      <div className={styles.jobsUrlAndScoring}>
        <Chip label="view in upwork" component="a" href={url} />
        <p>Scoring:{scoring}</p>
      </div>

      <hr/>
    </div>
  );
};

export default Jobs;
