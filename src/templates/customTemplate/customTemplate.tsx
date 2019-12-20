import React, { FunctionComponent, useState } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { format } from "date-fns";
// import { css } from "@emotion/core";
import { CustomTemplateCertificate, Rating } from "../sample";

const colorWhite = "#ffffff";
const colorBlue = "#3463b1";
const colorBlueDark = "#2a4e8A";
const easeOutCubic = "cubic-bezier(0.215, 0.61, 0.355, 1)";

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

const scene = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50% ,-50%)",
  perspective: 1000
};

const flipCard = {
  position: "relative",
  transition: "transform 0.7s " + easeOutCubic,
  transformStyle: "preserve-3d",
  width: 250,
  height: 400,
  marginLeft: "auto",
  marginRight: "auto",
  color: colorWhite
};

const flipCardFlipped = {
  transform: "rotateY(180deg)"
};

const flipCardFace = {
  backfaceVisibility: "hidden",
  position: "absolute",
  height: "100%",
  width: "100%",
  backgroundColor: colorBlue,
  borderRadius: 15
};

const flipCardFaceFront = {
  transform: "rotateY(0deg)"
};

const flipCardFaceBack = {
  transform: "rotateY(180deg)"
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

  const onClickFlipCard = () => {
    if (isFlipped) {
      setFlip(false);
    } else {
      setFlip(true);
    }
  };

  return (
    <div style={scene}>
      <div style={Object.assign({}, flipCard, isFlipped ? flipCardFlipped : {})} onClick={onClickFlipCard}>
        <div style={Object.assign({}, flipCardFace, flipCardFaceFront)}>
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
            style={{
              backgroundColor: colorBlueDark,
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              padding: 20
            }}
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
        <div style={Object.assign({}, flipCardFace, flipCardFaceBack)}>
          <div style={{ padding: 20, fontSize: "0.8em", textAlign: "center" }} className="d-flex">
            THIS PILOT IS ENTITLED TO EXERCISE THE PRIVILEGES IN CONJUNCTION WITH THE RATINGS SHOWING BELOW:
          </div>
          <div
            className="flex-fill"
            style={{
              backgroundColor: colorBlueDark,
              padding: 20
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
