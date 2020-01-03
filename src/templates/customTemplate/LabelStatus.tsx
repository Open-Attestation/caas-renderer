import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import * as constants from "./constants";

const LabelExpiring = styled.div`
  font-size: 0.7em;
  border-radius: 2px;
  padding: 3px 8px;
  display: inline-block;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  font-weight: 900;
  background-color: ${constants.colorYellow};
`;

const LabelExpired = styled.div`
  font-size: 0.7em;
  border-radius: 2px;
  padding: 2px 8px;
  display: inline-block;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  font-weight: 900;
  background-color: ${constants.colorMaroon};
`;

interface LabelStatusProps {
  expiryDate: Date;
  today?: Date;
}

export const LabelStatus: React.FunctionComponent<LabelStatusProps> = ({ expiryDate, today = new Date() }) => {
  const expiryDateYear = expiryDate.getFullYear();
  const expiryDateMonth = expiryDate.getMonth();
  const expiryDateDay = expiryDate.getDay();
  const expiringDate = new Date(expiryDateYear, expiryDateMonth - 3, expiryDateDay);

  if (today > expiryDate) {
    return <LabelExpired>Expired</LabelExpired>;
  } else if (today > expiringDate) {
    return <LabelExpiring>Expiring</LabelExpiring>;
  } else {
    return null;
  }
};
