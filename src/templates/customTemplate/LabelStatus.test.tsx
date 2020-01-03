import React from "react";
import { render, cleanup } from "@testing-library/react";
import { LabelStatus } from "./LabelStatus";

describe("labelStatus", () => {
  it("should show rating expired if expiry date is before today", () => {
    const { queryByText } = render(<LabelStatus today={new Date("2020-01-01")} expiryDate={new Date("2019-12-31")} />);
    expect(queryByText("Expired")).not.toBeNull();
    expect(queryByText("Expiring")).toBeNull();
  });

  it("should show rating expiring if expiry date is less than 3 months after today", () => {
    let container;
    container = render(<LabelStatus today={new Date("2020-01-01")} expiryDate={new Date("2020-03-31")} />);
    expect(container.queryByText("Expired")).toBeNull();
    expect(container.queryByText("Expiring")).not.toBeNull();

    cleanup();

    container = render(<LabelStatus today={new Date("2020-01-01")} expiryDate={new Date("2020-01-02")} />);
    expect(container.queryByText("Expired")).toBeNull();
    expect(container.queryByText("Expiring")).not.toBeNull();
  });

  it("should return null if expiry date is more than (or equal) to 3 months after today", () => {
    const { container } = render(<LabelStatus today={new Date("2020-01-01")} expiryDate={new Date("2023-04-01")} />);
    expect(container.firstChild).toBeNull();
  });
});
