import React, { FunctionComponent, useState } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { format } from "date-fns";
// import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { CustomTemplateCertificate, Rating } from "../sample";

const colorWhite = "#ffffff";
// const colorMaroon = "#b1344b";
const colorBlue = "#3463b1";
const colorBlueDark = "#2a4e8A";
const easeOutCubic = "cubic-bezier(0.215, 0.61, 0.355, 1)";

const cardW = "250px";
const cardH = "400px";

const FieldGroup = styled.div`
  border: 0;
  border-left: 2px solid ${colorWhite};
  padding-left: ${props => (props.front ? "15px" : "5px")};
  margin-bottom: ${props => (props.front ? "10px" : "5px")};
  flex: ${props => props.flex};
`;

const RatingGroup = styled.div`
  font-size: 0.6em;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RatingName = styled.div`
  font-weight: 900;
  margin-bottom: 5px;
`;

const RatingHeading = styled.div`
  font-size: 0.8em;
  font-weight: 900;
  margin-bottom: 20px;
`;

const LabelText = styled.div`
  font-size: 0.6em;
`;

const LabelValue = styled.div`
  font-size: 0.8em;
  font-weight: 900;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  padding-left: 20px;
  padding-right: 20px;
`;

const ProfileContent = styled.div`
  display: flex;
`;

const ProfileAgency = styled.div`
  flex: 1 1 0%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileShot = styled.div`
  flex: 1 1 0%;
  padding: 20px;
  background-color: ${colorWhite};
`;

const LicenseDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${colorBlueDark};
`;

const LicenseInfo = styled.div`
  display: flex;
  padding: 20px;
  font-size: 0.8em;
  text-align: center;
`;

const LicenseRatings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${colorBlueDark};
`;

const Scene = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  perspective: 1000;
`;

const FlipCard = styled.div<{ isFlipped: boolean }>`
  transform: rotateY(${({ isFlipped }) => (isFlipped ? "-180deg" : "0deg")});
  position: relative;
  transition: transform 0.7s ${easeOutCubic};
  transform-style: preserve-3d;
  width: ${cardW};
  height: ${cardH};
  margin-left: auto;
  margin-right: auto;
  color: ${colorWhite};
`;

const FlipCardFace = styled.div<{ isFront: boolean }>`
  transform: rotateY(${({ isFront }) => (isFront ? "0deg" : "-180deg")});
  backface-visibility: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${colorBlue};
  border-radius: 15px;
  overflow: hidden;
`;

interface RatingsProps {
  ratings: Rating[];
}

const Ratings: FunctionComponent<RatingsProps> = ({ ratings }: { ratings: Rating[] }) => {
  const rendererdRatings = ratings.map((rating, index) => (
    <RatingGroup key={index}>
      <RatingName>{rating.name}</RatingName>
      <div className="d-flex">
        <FieldGroup flex="2">
          <div>Limitations:</div>
          <div>{rating.limitations || "NIL"}</div>
        </FieldGroup>
        <FieldGroup flex="1">
          <div>Valid Till:</div>
          <div>{format(new Date(rating.expiryDate), "dd MMM yyyy")}</div>
        </FieldGroup>
      </div>
    </RatingGroup>
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
    <Scene>
      <FlipCard isFlipped={isFlipped} onClick={onClickFlipCard}>
        <FlipCardFace isFront={true}>
          <Profile>
            <ProfileContent>
              <ProfileAgency>
                <img className="img-fluid" src="https://www.caas.gov.sg/assets/caas/images/logo-caas-white.png" />
              </ProfileAgency>
              <ProfileShot>
                <img className="img-fluid" src={document.recipient.photo} />
              </ProfileShot>
            </ProfileContent>
          </Profile>
          <LicenseDetails>
            <FieldGroup front>
              <LabelText>License Number:</LabelText>
              <LabelValue>{document.id}</LabelValue>
            </FieldGroup>
            <FieldGroup front>
              <LabelText>Name of Pilot:</LabelText>
              <LabelValue>{document.recipient.name}</LabelValue>
            </FieldGroup>
            <FieldGroup front>
              <LabelText>Birth Date:</LabelText>
              <LabelValue>{format(new Date(document.recipient.dob), "dd MMM yyyy")}</LabelValue>
            </FieldGroup>
            <FieldGroup front>
              <LabelText>Issue Date:</LabelText>
              <LabelValue>{format(new Date(document.issuanceDate), "dd MMM yyyy")}</LabelValue>
            </FieldGroup>
          </LicenseDetails>
        </FlipCardFace>
        <FlipCardFace isFront={false}>
          <LicenseInfo>
            THIS PILOT IS ENTITLED TO EXERCISE THE PRIVILEGES IN CONJUNCTION WITH THE RATINGS SHOWING BELOW:
          </LicenseInfo>
          <LicenseRatings>
            <RatingHeading>UNMANNED AIRCRAFT RATING</RatingHeading>
            <Ratings ratings={document.ratings} />
          </LicenseRatings>
        </FlipCardFace>
      </FlipCard>
    </Scene>
  );
};
