import React, { FunctionComponent, useState } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { format } from "date-fns";
import { css } from "@emotion/core";
import { CustomTemplateCertificate, Rating } from "../sample";

const colorWhite = "#ffffff";
const colorBlue = "#3463b1";
const colorBlueDark = "#2a4e8A";
const easeOutCubic = "cubic-bezier(0.215, 0.61, 0.355, 1)";

const borderLeft = css(`
  border: 0;
  border-left: 2px solid ${colorWhite};
`);

const fieldGroupStyle = css(`
  padding-left: 15px;
  margin-bottom: 10px;
`);

const labelStyle = css(`
  font-size: 0.6em;
`);

const valueStyle = css(`
  font-size: 0.8em;
  font-weight: 900;
`);

const backFieldGroupStyle = css(`
  padding-left: 5px;
  margin-bottom: 5px;
`);

const scene = css(`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% ,-50%);
  perspective: 1000;
`);

const flipCard = css(`
  position: relative;
  transition: transform 0.7s ${easeOutCubic};
  transform-style: preserve-3d;
  width: 250px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  color: ${colorWhite};
`);

const flipped = css(`
  transform: rotateY(180deg);
`);

const flipCardFace = css(`
  backface-visibility: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${colorBlue};
  border-radius: 15px;
`);

const flipCardFaceFront = css(`
  transform: rotateY(0deg);
`);

const flipCardFaceBack = css(`
  transform: rotateY(180deg);
`);

interface RatingsProps {
  ratings: Rating[];
}

const Ratings: FunctionComponent<RatingsProps> = ({ ratings }: { ratings: Rating[] }) => {
  const rendererdRatings = ratings.map((rating, index) => (
    <div css={{ marginBottom: 10, fontSize: "0.6em" }} key={index}>
      <div css={{ fontWeight: 900, marginBottom: 5 }}>{rating.name}</div>
      <div className="d-flex">
        <div css={[{ flex: 2 }, backFieldGroupStyle, borderLeft]}>
          <div>Limitations:</div>
          <div>{rating.limitations || "NIL"}</div>
        </div>
        <div css={[{ flex: 1 }, backFieldGroupStyle, borderLeft]}>
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
    <div css={scene}>
      <div css={isFlipped ? [flipCard, flipped] : [flipCard]} onClick={onClickFlipCard}>
        <div css={[flipCardFace, flipCardFaceFront]}>
          <div css={{ height: 200, paddingTop: 20 }} className="d-flex">
            <div css={{ flex: 1, padding: 20 }} className="d-flex align-items-center">
              <img src="https://www.caas.gov.sg/assets/caas/images/logo-caas-white.png" className="w-100" />
            </div>
            <div css={{ flex: 1, padding: 20, background: "white", margin: 20 }}>
              <img src={document.recipient.photo} className="w-100 h-100" />
            </div>
          </div>
          <div
            className="flex-fill"
            css={{
              backgroundColor: colorBlueDark,
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              padding: 20
            }}
          >
            <div css={[fieldGroupStyle, borderLeft]}>
              <div css={labelStyle}>License Number:</div>
              <div css={valueStyle}>{document.id}</div>
            </div>
            <div css={[fieldGroupStyle, borderLeft]}>
              <div css={labelStyle}>Name of Pilot:</div>
              <div css={valueStyle}>{document.recipient.name}</div>
            </div>
            <div css={[fieldGroupStyle, borderLeft]}>
              <div css={labelStyle}>Birth Date:</div>
              <div css={valueStyle}>{format(new Date(document.recipient.dob), "dd MMM yyyy")}</div>
            </div>
            <div css={[fieldGroupStyle, borderLeft]}>
              <div css={labelStyle}>Issue Date:</div>
              <div css={valueStyle}>{format(new Date(document.issuanceDate), "dd MMM yyyy")}</div>
            </div>
          </div>
        </div>
        <div css={[flipCardFace, flipCardFaceBack]}>
          <div css={{ padding: 20, fontSize: "0.8em", textAlign: "center" }} className="d-flex">
            THIS PILOT IS ENTITLED TO EXERCISE THE PRIVILEGES IN CONJUNCTION WITH THE RATINGS SHOWING BELOW:
          </div>
          <div
            className="flex-fill"
            css={{
              backgroundColor: colorBlueDark,
              padding: 20
            }}
          >
            <div css={{ fontWeight: 900, fontSize: "0.8em", marginBottom: 20 }}>UNMANNED AIRCRAFT RATING</div>
            <Ratings ratings={document.ratings} />
          </div>
        </div>
      </div>
    </div>
  );
};
