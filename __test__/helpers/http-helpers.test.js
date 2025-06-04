import { describe, test, expect, afterEach, beforeAll, vi } from "vitest";
import http_helpers from "@/helpers/http-helpers";

describe("HTTP Utils", () => {
  beforeAll(() => {
    expect(http_helpers).toBeTruthy();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Post Error Notification with Description", () => {
    let _this = { $kytos: { eventBus: { $emit: vi.fn() } } };
    let error = {
      response: { data: { description: "testDescription" }, status: 404 },
    };
    let description = { prefix: "test1", suffix: "test2" };
    http_helpers.post_error(_this, error, "Status", description);
    expect(_this.$kytos.eventBus.$emit).toHaveBeenCalledOnce();
    expect(_this.$kytos.eventBus.$emit.mock.calls[0]).toEqual([
      "setNotification",
      {
        description: "test1testDescriptiontest2",
        icon: "gear",
        title: "Status (404):",
      },
    ]);
  });

  test("Post Error Notification with Data", () => {
    let _this = { $kytos: { eventBus: { $emit: vi.fn() } } };
    let error = {
      response: { data: "testData", status: 404 },
    };
    let description = { prefix: "test1", suffix: "test2" };
    http_helpers.post_error(_this, error, "Status", description);
    expect(_this.$kytos.eventBus.$emit).toHaveBeenCalledOnce();
    expect(_this.$kytos.eventBus.$emit.mock.calls[0]).toEqual([
      "setNotification",
      {
        description: "test1testDatatest2",
        icon: "gear",
        title: "Status (404):",
      },
    ]);
  });
});
