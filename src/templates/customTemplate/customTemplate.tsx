import React, { FunctionComponent, useState } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { format } from "date-fns";
import styled from "@emotion/styled";
import { CustomTemplateCertificate, Rating } from "../sample";
import { LabelStatus } from "./LabelStatus";
import * as constants from "./constants";

const flexColumnCenter = `
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FieldGroup = styled.div<{ isFront: boolean }>`
  border: 0;
  border-left: 2px solid ${constants.colorWhite};
  padding-left: ${({ isFront }) => (isFront ? "15px" : "5px")};
  margin-bottom: ${({ isFront }) => (isFront ? "10px" : "5px")};
`;

const RatingGroup = styled.div`
  font-size: 0.6em;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RatingGroupDetails = styled.div`
  display: flex;
`;

const RatingName = styled.div`
  font-weight: 900;
  margin-bottom: 5px;
`;

const RatingHeading = styled.div`
  font-size: 0.8em;
  font-weight: 900;
  margin-bottom: 15px;
`;

const ButtonFlip = styled.button`
  appearance: none;
  outline: none;
  border: 0;
  padding: 0;
  position: absolute;
  top: calc(${constants.cardH} + 10px);
  left: 50%;
  width: 36px;
  height: 36px;
  margin-left: -18px;
  border-radius: 50%;
  background-color: ${constants.colorMaroon};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

const ButtonFlipIcon = styled.svg<{ isFlipped: boolean }>`
  transition: transform 0.4s ${constants.easeInOutCubic};
  transform: rotateZ(${({ isFlipped }) => (isFlipped ? "0deg" : "-180deg")});
`;

const LabelText = styled.div`
  font-size: 0.6em;
`;

const LabelValue = styled.div`
  font-size: 0.8em;
  font-weight: 900;
`;

const Profile = styled.div`
  ${flexColumnCenter}
  height: 50%;
  padding-left: 20px;
  padding-right: 20px;
`;

const ProfileContent = styled.div`
  display: flex;
`;

const ProfileAgency = styled.div`
  ${flexColumnCenter}
  flex: 1 1 0%;
  padding: 20px;
`;

const ProfileShot = styled.div`
  flex: 1 1 0%;
  padding: 20px;
  background-color: ${constants.colorWhite};
`;

const LicenseDetails = styled.div`
  ${flexColumnCenter}
  height: 50%;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${constants.colorBlueDark};
`;

const LicenseInfo = styled.div`
  display: flex;
  padding: 15px 20px;
  font-size: 0.8em;
  text-align: center;
`;

const LicenseRatings = styled.div`
  ${flexColumnCenter}
  padding: 15px 20px;
  background-color: ${constants.colorBlueDark};
`;

const Scene = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  perspective: 1000;
`;

const FlipCard = styled.div<{ isFlipped: boolean }>`
  transition: transform 0.7s ${constants.easeOutCubic};
  transform: rotateY(${({ isFlipped }) => (isFlipped ? "-180deg" : "0deg")});
  position: relative;
  transform-style: preserve-3d;
  width: ${constants.cardW};
  height: ${constants.cardH};
  margin-left: auto;
  margin-right: auto;
  color: ${constants.colorWhite};
`;

const FlipCardFace = styled.div<{ isFront: boolean }>`
  transform: rotateY(${({ isFront }) => (isFront ? "0deg" : "-180deg")});
  backface-visibility: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${constants.colorBlue};
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
      <LabelStatus expiryDate={new Date(rating.expiryDate)} />
      <RatingGroupDetails>
        <FieldGroup isFront={false} style={{ flex: 2 }}>
          <div>Limitations:</div>
          <div>{rating.limitations || "NIL"}</div>
        </FieldGroup>
        <FieldGroup isFront={false} style={{ flex: 1 }}>
          <div>Valid Till:</div>
          <div>{format(new Date(rating.expiryDate), "dd MMM yyyy")}</div>
        </FieldGroup>
      </RatingGroupDetails>
    </RatingGroup>
  ));
  return <>{rendererdRatings}</>;
};

export const CustomTemplate: FunctionComponent<TemplateProps<CustomTemplateCertificate>> = ({ document }) => {
  const [isFlipped, setFlip] = useState(false);

  const onClickFlipCard = () => {
    setFlip(!isFlipped);
  };

  return (
    <Scene>
      <FlipCard isFlipped={isFlipped}>
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
            <FieldGroup isFront={true}>
              <LabelText>License Number:</LabelText>
              <LabelValue>{document.id}</LabelValue>
            </FieldGroup>
            <FieldGroup isFront={true}>
              <LabelText>Name of Pilot:</LabelText>
              <LabelValue>{document.recipient.name}</LabelValue>
            </FieldGroup>
            <FieldGroup isFront={true}>
              <LabelText>Birth Date:</LabelText>
              <LabelValue>{format(new Date(document.recipient.dob), "dd MMM yyyy")}</LabelValue>
            </FieldGroup>
            <FieldGroup isFront={true}>
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
      <ButtonFlip onClick={onClickFlipCard}>
        <ButtonFlipIcon
          isFlipped={isFlipped}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </ButtonFlipIcon>
      </ButtonFlip>
    </Scene>
  );
};
