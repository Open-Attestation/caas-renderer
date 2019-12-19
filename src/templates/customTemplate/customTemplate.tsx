import React, { FunctionComponent, useState } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { format } from "date-fns";
// import { css } from "@emotion/core";
import "./../../assets/scss/main.scss";
import { CustomTemplateCertificate, Rating } from "../sample";

const fieldGroupStyle = {
  border: 0,
  borderLeft: 2,
  borderColor: "white",
  borderStyle: "solid",
  paddingLeft: 15,
  marginBottom: 10
};
const labelStyle = { fontSize: "0.6em" };
const valueStyle = { fontSize: "0.8em", fontWeight: 900 };

const backFieldGroupStyle = {
  border: 0,
  borderLeft: 2,
  borderColor: "white",
  borderStyle: "solid",
  paddingLeft: 5,
  marginBottom: 5
};

interface RatingsProps {
  ratings: Rating[];
}

const Ratings: FunctionComponent<RatingsProps> = ({ ratings }: { ratings: Rating[] }) => {
  const rendererdRatings = ratings.map((rating, index) => (
    <div style={{ marginBottom: 10, fontSize: "0.6em" }} key={index}>
      <div style={{ fontWeight: 900, marginBottom: 5 }}>{rating.name}</div>
      <div className="d-flex">
        <div style={{ flex: 2, ...backFieldGroupStyle }}>
          <div>Limitations:</div>
          <div>{rating.limitations || "NIL"}</div>
        </div>
        <div style={{ flex: 1, ...backFieldGroupStyle }}>
          <div>Valid Till:</div>
          <div>{format(new Date(rating.expiryDate), "dd MMM yyyy")}</div>
        </div>
      </div>
    </div>
  ));
  return <>{rendererdRatings}</>;
};

export const CustomTemplate: FunctionComponent<TemplateProps<CustomTemplateCertificate>> = ({ document }) => {
  const [isFlipped, setFlip] = useState(false);

  const flipCard = () => {
    if (isFlipped) {
      setFlip(false);
    } else {
      setFlip(true);
    }
  };

  return (
    <div className="scene">
      <div className={"flipcard " + (isFlipped ? "is-flipped" : "")} onClick={flipCard}>
        <div className="flipcard-face flipcard-face-front">
          <div style={{ height: 200, paddingTop: 20 }} className="d-flex">
            <div style={{ flex: 1, padding: 20 }} className="d-flex align-items-center">
              <img src="https://www.caas.gov.sg/assets/caas/images/logo-caas-white.png" className="w-100" />
            </div>
            <div style={{ flex: 1, padding: 20, background: "white", margin: 20 }}>
              <img src={document.recipient.photo} className="w-100 h-100" />
            </div>
          </div>
          <div
            className="flex-fill"
            style={{ backgroundColor: "#2A4E8A", borderBottomRightRadius: 15, borderBottomLeftRadius: 15, padding: 20 }}
          >
            <div style={fieldGroupStyle}>
              <div style={labelStyle}>License Number:</div>
              <div style={valueStyle}>{document.id}</div>
            </div>
            <div style={fieldGroupStyle}>
              <div style={labelStyle}>Name of Pilot:</div>
              <div style={valueStyle}>{document.recipient.name}</div>
            </div>
            <div style={fieldGroupStyle}>
              <div style={labelStyle}>Birth Date:</div>
              <div style={valueStyle}>{format(new Date(document.recipient.dob), "dd MMM yyyy")}</div>
            </div>
            <div style={fieldGroupStyle}>
              <div style={labelStyle}>Issue Date:</div>
              <div style={valueStyle}>{format(new Date(document.issuanceDate), "dd MMM yyyy")}</div>
            </div>
          </div>
        </div>
        <div className="flipcard-face flipcard-face-back">
          <div style={{ padding: 20, fontSize: "0.8em", textAlign: "center" }} className="d-flex">
            THIS PILOT IS ENTITLED TO EXERCISE THE PRIVILEGES IN CONJUNCTION WITH THE RATINGS SHOWING BELOW:
          </div>
          <div
            className="flex-fill"
            style={{
              backgroundColor: "#2A4E8A",
              padding: 20,
              marginBottom: 50
            }}
          >
            <div style={{ fontWeight: 900, fontSize: "0.8em", marginBottom: 20 }}>UNMANNED AIRCRAFT RATING</div>
            <Ratings ratings={document.ratings} />
          </div>
        </div>
      </div>
    </div>
  );
};
