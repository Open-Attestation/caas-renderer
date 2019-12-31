import { Document } from "@govtechsg/decentralized-renderer-react-components";

export interface Rating {
  name: string;
  code: number | string;
  limitations?: string;
  expiryDate: string;
}

export interface CustomTemplateCertificate extends Document {
  id: string;
  name: string;
  issuanceDate: string;
  recipient: {
    name: string;
    dob: string;
    photo: string;
  };
  ratings: Rating[];
}

export const customTemplateCertificate: CustomTemplateCertificate = {
  $template: {
    name: "UALP",
    type: "EMBEDDED_RENDERER",
    url: "https://demo-caas.openattestation.com"
  },
  id: "U0034577K",
  name: "Unmanned Aircraft Pilot Licence",
  issuanceDate: "2019-11-06T00:00:00.000Z",
  recipient: {
    name: "Adam Marvek",
    dob: "1990-01-01T00:00:00.000Z",
    photo:
      "data:image/png;base64,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"
  },
  ratings: [
    {
      name: "Aeroplane Class Rating(≤ 25kg)",
      code: "AC25",
      expiryDate: "2020-02-01T00:00:00.000Z"
    },
    {
      name: "Rotocraft Class Rating(≤ 25kg)",
      code: "RC25",
      expiryDate: "2023-12-27T00:00:00.000Z"
    }
  ]
};
