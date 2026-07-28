import { render, screen, within } from "@testing-library/react";
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

    const bakeryHeading = screen.getByRole("heading", {
      name: "Micro Bakery",
    });

    const bakeryCard = bakeryHeading.closest("article");

    expect(bakeryCard).not.toBeNull();

    const bakery = within(bakeryCard);

    expect(bakery.getByText(/status:\s*closed/i)).toBeInTheDocument();

    await user.click(
      bakery.getByRole("button", {
        name: "Open Micro Bakery",
      }),
    );

    expect(bakery.getByText(/status:\s*open/i)).toBeInTheDocument();

    expect(
      bakery.getByRole("button", {
        name: "Close Micro Bakery",
      }),
    ).toBeInTheDocument();

    expect(
      bakery.queryByRole("button", {
        name: "Open Micro Bakery",
      }),
    ).not.toBeInTheDocument();
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

  it("displays the two food locations and then return all three", async () => {
    const user = userEvent.setup();

    render(<LocationList locations={locations} />);

    const categoryControl = screen.getByRole("combobox", {
      name: /filter by category/i,
    });

    await user.selectOptions(categoryControl, "food");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    expect(
      screen.getByRole("heading", { name: "Micro Bakery" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tiny Diner" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Town Clinic" }),
    ).not.toBeInTheDocument();

    await user.selectOptions(categoryControl, "all");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    expect(
      screen.getByRole("heading", { name: "Micro Bakery" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Town Clinic" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tiny Diner" }),
    ).toBeInTheDocument();
  });
});
