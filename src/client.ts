import { get } from "got";
import { escape, stringify } from "querystring";
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
    if (!options) {
      const url = `${this.baseUrl}/search?${stringify({[key]: value})}`;
      const { body } = await get(url, {json: true});
      return body as SearchHits;
    }

    const { nutrients, excluded, ...rest } = options;

    const optionsParams = stringify(sanitiseObject({
      ...rest,
      app_id: this.appId,
      app_key: this.appKey,
      [key]: value,
    }));

    const nutrientsParams = buildQueryString("nutrients",
      nutrients || new Map(),
    );

    const excludedParams = buildArrayString("excluded",
      excluded || [],
    );

    const queryParams = [optionsParams, nutrientsParams, excludedParams]
      .filter((item) => item !== undefined)
      .join("&");

    const response = await get(`${this.baseUrl}/search?${queryParams}`, {
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

function buildQueryString<K, V>(param: string, map: Map<K, V>) {
  if (!map.size)  {
    return;
  }

  return [...map.entries()]
    .map(([key, val]) => escape(`${param}[${key}]=${val}`))
    .join("&");
}

function buildArrayString<T>(param: string, arr: T[]) {
  if (!arr.length) {
    return;
  }

  return arr
    .map((val) => escape(`${param}=${val}`))
    .join("&");
}
