import * as got from "got";

import {
  DietLabel,
  EdamamClient,
  HealthLabel,
  NutrientCode,
} from "../";

describe("EdamamClient", () => {
  let client: EdamamClient;
  let getSpy: jest.SpyInstance;

  beforeEach(() => {
    client = new EdamamClient({
      appId: "some-id",
      appKey: "some-key",
      baseUrl: "https://some-url.com",
    });
    getSpy = jest.spyOn(got, "get").mockResolvedValue({body: {}} as any);
  });

  afterEach(() => {
    getSpy.mockClear();
  });

  describe("searchRecipesByQuery", () => {
    it("requests correctly (no options)", async () => {
      await client.searchRecipesByQuery("some-query");
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });

    it("requests correctly (from, to)", async () => {
      await client.searchRecipesByQuery("some-query", {
        from: 1234,
        to: 4321,
      });
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });

    it("requests correctly (diet)", async () => {
      await client.searchRecipesByQuery("some-query", {
        diet: DietLabel.Balanced,
      });
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });

    it("requests correctly (ingr)", async () => {
      await client.searchRecipesByQuery("some-query", {
        ingr: 1234,
      });
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });

    it("requests correctly (time)", async () => {
      await client.searchRecipesByQuery("some-query", {
        time: "123+",
      });
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });

    it("requests correctly (health)", async () => {
      await client.searchRecipesByQuery("some-query", {
        health: [HealthLabel.AlcoholFree, HealthLabel.Dairy],
      });
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });

    it("requests correctly (excluded)", async () => {
      await client.searchRecipesByQuery("some-query", {
        excluded: ["some-excluded"],
      });
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });

    it("requests correctly (calories)", async () => {
      await client.searchRecipesByQuery("some-query", {
        calories: "some-calories",
      });
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });

    it("requests correctly (nutrients)", async () => {
      const nutrientsMap = new Map<NutrientCode, string>();
      nutrientsMap.set(NutrientCode.Calcium, "1341+");

      await client.searchRecipesByQuery("some-query", {
        nutrients: nutrientsMap,
      });
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });
  });

  describe("searchRecipesById", () => {
    it("requests API correctly (no options)", async () => {
      await client.searchRecipesById("some-r");
      expect(getSpy.mock.calls[0][0]).toMatchSnapshot();
    });
  });
});
