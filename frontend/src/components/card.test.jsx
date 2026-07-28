import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LocationCard } from "./card";
import userEvent from "@testing-library/user-event";

const location = {
  id: "loc-001",
  name: "Micro Bakery",
  category: "business",
  description: "Fresh bread and pastries",
  isOpen: false,
};

describe("LocationCard", () => {
  it("render the location content, status, and action", () => {
    const handleCardClick = vi.fn();

    render(
      <LocationCard location={location} handleCardClick={handleCardClick} />,
    );

    expect(
      screen.getByRole("heading", { name: "Micro Bakery" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Business")).toBeInTheDocument();

    expect(screen.getByText("Fresh bread and pastries")).toBeInTheDocument();

    expect(screen.getByText("Status: Closed")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Open Micro Bakery" }),
    ).toBeInTheDocument();
  });

  it("renders the open status and close action", () => {
    const openLocation = { ...location, isOpen: true };

    const handleCardClick = vi.fn();

    render(
      <LocationCard
        location={openLocation}
        handleCardClick={handleCardClick}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Micro Bakery" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Status: Open")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close Micro Bakery" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Open Micro Bakery" }),
    ).not.toBeInTheDocument();
  });

  it("clicking button sends the correct location", async () => {
    const user = userEvent.setup();
    const handleCardClick = vi.fn();

    render(
      <LocationCard location={location} handleCardClick={handleCardClick} />,
    );

    const locationButton = screen.getByRole("button", {
      name: "Open Micro Bakery",
    });

    await user.click(locationButton);
    expect(handleCardClick).toHaveBeenCalledTimes(1);
    expect(handleCardClick).toHaveBeenCalledWith("loc-001");
  });
});
