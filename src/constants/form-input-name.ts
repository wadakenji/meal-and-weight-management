export const SIGN_IN_FORM_VALUE_NAMES = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

export const USER_FORM_VALUE_NAMES = {
  NAME: 'name',
  PASSWORD: 'password',
  BASAL_METABOLISM_RATE: 'basal_metabolism_rate',
  ENERGY_PER_STEP: 'energy_per_step',
} as const;

export const MEAL_FORM_VALUE_NAMES = {
  DATETIME: 'datetime',
  NAME: 'name',
  AMOUNT_OF_ENERGY: 'amount_of_energy',
  AMOUNT_OF_PROTEIN: 'amount_of_protein',
} as const;

export const WEIGHT_FORM_VALUE_NAMES = {
  DATE: 'date',
  WEIGHT: 'weight',
} as const;

export const STEP_FORM_VALUE_NAMES = {
  DATE: 'date',
  STEP: 'step',
} as const;