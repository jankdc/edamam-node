import { get } from "got";
import { SearchHits, SearchOptions } from "./types";

export interface EdamamParams {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export class EdamamClient {
  private appId: string;
  private appKey: string;
  private baseUrl: string;

  constructor(params: EdamamParams) {
    this.appId = params.appId;
    this.appKey = params.appKey;
    this.baseUrl = params.baseUrl || "https://api.edamam.com";
  }

  public async searchRecipesByQuery(q: string, options?: SearchOptions) {
    return this.searchRecipes("q", q, options);
  }

  public async searchRecipesById(r: string, options?: SearchOptions) {
    return this.searchRecipes("r", r, options);
  }

  private async searchRecipes(key: string, value: string, options?: SearchOptions) {
    const opts = options || {};
    const { nutrients, excluded, ...rest } = opts;

    const optionsParams = buildObjString(sanitiseObject({
      ...rest,
      app_id: this.appId,
      app_key: this.appKey,
      [key]: value,
    }));

    const nutrientsParams = buildMapString("nutrients",
      nutrients || new Map(),
    );

    const excludedParams = buildArrayString("excluded",
      excluded || [],
    );

    const queryParams = [optionsParams, nutrientsParams, excludedParams]
      .filter((item) => item)
      .join("&");

    const response = await get(encodeURI(`${this.baseUrl}/search?${queryParams}`), {
      json: true,
    });
    return response.body as SearchHits;
  }
}

// Helpers
function sanitiseObject(obj: any) {
  const clone = { ...obj };

  Object.keys(clone).forEach((key) =>
    clone[key] === undefined && delete clone[key],
  );

  return clone;
}

function buildMapString<K, V>(param: string, map: Map<K, V>) {
  return [...map.entries()]
    .map(([key, val]) => `${param}[${key}]=${val}`)
    .join("&");
}

function buildArrayString<T>(param: string, arr: T[]) {
  return arr
    .map((val) => `${param}=${val}`)
    .join("&");
}

function buildObjString(obj: object) {
  return Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
}
