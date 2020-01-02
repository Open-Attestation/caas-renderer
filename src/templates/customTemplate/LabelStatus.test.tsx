import React from "react";
import { render, cleanup } from "@testing-library/react";
import { LabelStatus } from "./customTemplate";

describe("labelStatus", () => {
  it("should show rating expired if expiry date is before today", () => {
    const { queryByText } = render(<LabelStatus today={new Date("2020-01-01")} expiryDate={new Date("2019-12-31")} />);
    expect(queryByText("Rating Expired")).not.toBeNull();
    expect(queryByText("Rating Expiring Soon")).toBeNull();
  });

  it("should show rating expiring if expiry date is less than 3 months after today", () => {
    let container;
    container = render(<LabelStatus today={new Date("2020-01-01")} expiryDate={new Date("2020-03-31")} />);
    expect(container.queryByText("Rating Expired")).toBeNull();
    expect(container.queryByText("Rating Expiring Soon")).not.toBeNull();

    cleanup();

    container = render(<LabelStatus today={new Date("2020-01-01")} expiryDate={new Date("2020-01-02")} />);
    expect(container.queryByText("Rating Expired")).toBeNull();
    expect(container.queryByText("Rating Expiring Soon")).not.toBeNull();
  });

  it("should return null if expiry date is more than (or equal) to 3 months after today", () => {
    const { container } = render(<LabelStatus today={new Date("2020-01-01")} expiryDate={new Date("2023-04-01")} />);
    expect(container.firstChild).toBeNull();
  });
});
