// Check out https://developer.edamam.com/edamam-docs-recipe-api for descriptions.

export interface SearchOptions {
  from?: number;
  to?: number;
  ingr?: number;
  diet?: DietLabel;
  health?: HealthLabel[];
  calories?: string;
  time?: string;
  excluded?: string[];
  nutrients?: NutrientsMap;
}

export interface SearchHits {
  q: string;
  from: number;
  to: number;
  params: {[param: string]: string; };
  count: number;
  more: boolean;
  hits: SearchHit[];
}

export interface SearchHit {
  recipe: Recipe;
  bookmarked: boolean;
  bought: boolean;
}

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  calories: number;
  totalWeight: number;
  ingredients: Ingredient[];
  totalNutrients: NutrientInfo[];
  totalDaily: NutrientInfo[];
  dietLabels: DietLabel[];
  healthLabels: HealthLabel[];
}

export interface Ingredient {
  foodId: string;
  quantity: number;
  measure: Measure;
  weight: number;
  food: Food;
}

export interface NutrientInfo {
  uri: string;
  label: string;
  quantity: number;
  unit: string;
}

export type NutrientsMap =
  Map<NutrientCode, string>;

export interface Measure {
  uri: string;
  label: string;
}

export interface Food {
  foodId: string;
  label: string;
}

export enum DietLabel {
  Balanced = "balanced",
  HighFiber = "high-fiber",
  HighProtein = "high-protein",
  LowCarb = "low-carb",
  LowFat = "low-fat",
  LowSodium = "low-sodium",
}

export enum HealthLabel {
  AlcoholFree = "alcohol-free",
  CeleryFree = "celery-free",
  CrustaceanFree = "crustacean-free",
  Dairy =	"dairy-free",
  Eggs = "egg-free",
  Fish = "fish-free",
  Gluten = "gluten-free",
  KidneyFriendly = "kidney-friendly",
  Kosher = "kosher",
  LowPotassium = "low-potassium",
  LupineFree = "lupine-free",
  MustardFree =	"mustard-free",
  NoOilAdded = "No-oil-added",
  NoSugar	= "low-sugar",
  Paleo =	"paleo",
  Peanuts =	"peanut-free",
  Pescatarian =	"pescatarian",
  PorkFree =	"pork-free",
  RedMeatFree =	"red-meat-free",
  SesameFree =	"sesame-free",
  Shellfish =	"shellfish-free",
  Soy =	"soy-free",
  SugarConscious = "sugar-conscious",
  TreeNuts = "tree-nut-free",
  Vegan =	"vegan",
  Vegetarian = "vegetarian",
  WheatFree =	"wheat-free",
}

export enum NutrientCode {
  Calcium = "CA",
  Carbs = "CHOCDF",
  Cholesterol = "CHOLE",
  Monounsaturated = "FAMS",
  Polyunsaturated = "FAPU",
  Saturated = "FASAT",
  Fat = "FAT",
  Trans = "FATRN",
  Iron = "FE",
  Fiber = "FIBTG",
  Folate = "FOLDFE",
  Potassium = "K",
  Magnesium = "MG",
  Sodium = "NA",
  Energy = "ENERC_KCAL",
  Niacin = "NIA",
  Phosphorus = "P",
  Protein = "PROCNT",
  Riboflavin = "RIBF",
  Sugars = "SUGAR",
  Thiamin = "THIA",
  VitaminE = "TOCPHA",
  VitaminA = "VITA_RAE",
  VitaminB12 = "VITB12",
  VitaminB6 = "VITB6A",
  VitaminC = "VITC",
  VitaminD = "VITD",
  VitaminK = "VITK1",
}
