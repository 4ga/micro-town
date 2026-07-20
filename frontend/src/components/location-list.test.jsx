import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LocationList } from "./location-list";

// Mock the shared category data so the tests remain predictable.
vi.mock("../data/dataset", () => ({
  categories: [
    { id: 1, value: "all", name: "All" },
    { id: 2, value: "food", name: "Food" },
    { id: 3, value: "services", name: "Services" },
    { id: 4, value: "parks", name: "Parks" },
  ],
}));

const locations = [
  {
    id: 1,
    name: "Micro Bakery",
    category: "food",
    description: "Fresh bread and pastries.",
    isOpen: false,
  },
  {
    id: 2,
    name: "Town Clinic",
    category: "services",
    description: "Healthcare for Micro Town residents.",
    isOpen: false,
  },
  {
    id: 3,
    name: "Tiny Diner",
    category: "food",
    description: "Breakfast and lunch.",
    isOpen: true,
  },
];

describe("LocationList", () => {
  it("renders the labeled category control and named location collection", () => {
    render(<LocationList locations={locations} />);

    expect(
      screen.getByRole("combobox", {
        name: /filter by category/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: /locations/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("filters locations by category", async () => {
    const user = userEvent.setup();

    render(<LocationList locations={locations} />);

    const categoryControl = screen.getByRole("combobox", {
      name: /filter by category/i,
    });

    await user.selectOptions(categoryControl, "services");

    expect(
      screen.getByRole("heading", {
        name: "Town Clinic",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Micro Bakery",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Tiny Diner",
      }),
    ).not.toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("toggles a location between open and closed", async () => {
    const user = userEvent.setup();

    render(<LocationList locations={locations} />);

    const openButton = screen.getByRole("button", {
      name: "Open Micro Bakery",
    });

    expect(openButton).toHaveClass("close");

    await user.click(openButton);

    const closeButton = screen.getByRole("button", {
      name: "Close Micro Bakery",
    });

    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass("open");
  });

  it("displays a message when a category has no locations", async () => {
    const user = userEvent.setup();

    render(<LocationList locations={locations} />);

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: /filter by category/i,
      }),
      "parks",
    );

    expect(screen.getByText(/no locations found/i)).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
