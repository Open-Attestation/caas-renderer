import React, { FunctionComponent, useState } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { format } from "date-fns";
import styled from "@emotion/styled";
import { CustomTemplateCertificate, Rating } from "../sample";
import arrowLeft from "./../../assets/images/common/arrow-left.svg";

const colorWhite = "#ffffff";
const colorMaroon = "#b1344b";
const colorYellow = "#e4ab00";
const colorBlue = "#3463b1";
const colorBlueDark = "#2a4e8A";
const easeOutCubic = "cubic-bezier(0.215, 0.61, 0.355, 1)";
const easeInOutCubic = "cubic-bezier(0.645, 0.045, 0.355, 1)";

const cardW = "250px";
const cardH = "400px";

const FieldGroup = styled.div<{ isFront: boolean }>`
  border: 0;
  border-left: 2px solid ${colorWhite};
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
  top: calc(${cardH} + 10px);
  left: 50%;
  width: 36px;
  height: 36px;
  margin-left: -18px;
  border-radius: 50%;
  background-color: ${colorMaroon};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

const ButtonFlipIcon = styled.img<{ isFlipped: boolean }>`
  transition: transform 0.4s ${easeInOutCubic};
  transform: rotateZ(${({ isFlipped }) => (isFlipped ? "0deg" : "-180deg")});
`;

const LabelText = styled.div`
  font-size: 0.6em;
`;

const LabelExpiring = styled.div`
  font-size: 0.7em;
  border-radius: 2px;
  padding: 3px 8px;
  display: inline-block;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  font-weight: 900;
  background-color: ${colorYellow};
`;

const LabelExpired = styled.div`
  font-size: 0.7em;
  border-radius: 2px;
  padding: 3px 8px;
  display: inline-block;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  font-weight: 900;
  background-color: ${colorMaroon};
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
  padding: 15px 20px;
  font-size: 0.8em;
  text-align: center;
`;

const LicenseRatings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 20px;
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
  transition: transform 0.7s ${easeOutCubic};
  transform: rotateY(${({ isFlipped }) => (isFlipped ? "-180deg" : "0deg")});
  position: relative;
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

interface LabelStatusProps {
  expiryDate: string;
}

const LabelStatus: React.FunctionComponent<LabelStatusProps> = (props: LabelStatusProps) => {
  const today = new Date();
  const expiryDate = new Date(props.expiryDate);
  const expiryDateYear = expiryDate.getFullYear();
  const expiryDateMonth = expiryDate.getMonth();
  const expiryDateDay = expiryDate.getDay();
  const expiringDate = new Date(expiryDateYear, expiryDateMonth - 3, expiryDateDay);

  if (today > expiryDate) {
    return <LabelExpired>Rating Expired</LabelExpired>;
  } else if (today > expiringDate) {
    return <LabelExpiring>Rating Expiring</LabelExpiring>;
  } else {
    return null;
  }
};

interface RatingsProps {
  ratings: Rating[];
}

const Ratings: FunctionComponent<RatingsProps> = ({ ratings }: { ratings: Rating[] }) => {
  const rendererdRatings = ratings.map((rating, index) => (
    <RatingGroup key={index}>
      <RatingName>{rating.name}</RatingName>
      <LabelStatus expiryDate={rating.expiryDate} />
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
    if (isFlipped) {
      setFlip(false);
    } else {
      setFlip(true);
    }
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
        <ButtonFlipIcon src={arrowLeft} isFlipped={isFlipped} />
      </ButtonFlip>
    </Scene>
  );
};
