import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import LocationLoader from "./location-loader";

const locations = [
  { id: "loc-001", name: "Micro Bakery" },
  { id: "loc-002", name: "Town Clinic" },
];

describe("LocationLoader", () => {
  it("loading state appears immediately", async () => {
    let resolveRequest;

    const loadLocations = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        }),
    );

    render(<LocationLoader loadLocations={loadLocations} />);

    expect(screen.getByText(/loading locations/i)).toBeInTheDocument();
    expect(loadLocations).toHaveBeenCalledTimes(1);

    resolveRequest(locations);

    expect(await screen.findByText("Micro Bakery")).toBeInTheDocument();

    expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument();
  });

  it("successful results appear", async () => {
    const loadLocations = vi.fn().mockResolvedValue(locations);

    render(<LocationLoader loadLocations={loadLocations} />);

    expect(screen.getByText(/loading locations/i)).toBeInTheDocument();

    expect(await screen.findByText("Micro Bakery")).toBeInTheDocument();
    expect(screen.getByText("Town Clinic")).toBeInTheDocument();

    expect(loadLocations).toHaveBeenCalledTimes(1);

    expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument();
  });

  it("displays the empty state when no locations are returned", async () => {
    const loadLocations = vi.fn().mockResolvedValue([]);

    render(<LocationLoader loadLocations={loadLocations} />);

    expect(
      await screen.findByText("No locations available."),
    ).toBeInTheDocument();
    expect(loadLocations).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("displays a user-friendly error when loading fails", async () => {
    const loadLocations = vi
      .fn()
      .mockRejectedValue(new Error("Network failure"));

    render(<LocationLoader loadLocations={loadLocations} />);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent("Unable to load locations.");
    expect(loadLocations).toHaveBeenCalledTimes(1);

    expect(screen.queryByText("Network failure")).not.toBeInTheDocument();

    expect(screen.queryByText("Loading locations...")).not.toBeInTheDocument();
  });

  it("retries loading after a failure", async () => {
    const user = userEvent.setup();

    const loadLocations = vi
      .fn()
      .mockRejectedValueOnce(new Error("Network failure"))
      .mockResolvedValueOnce(locations);

    render(<LocationLoader loadLocations={loadLocations} />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to load locations.",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Retry loading locations",
      }),
    );

    await waitFor(() => {
      expect(loadLocations).toHaveBeenCalledTimes(2);
    });

    expect(await screen.findByText("Micro Bakery")).toBeInTheDocument();

    expect(screen.getByText("Town Clinic")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
