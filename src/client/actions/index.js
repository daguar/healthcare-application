export const ENSURE_FIELDS_INITIALIZED = 'ENSURE_FIELDS_INITIALIZED';
export const VETERAN_OVERWRITE = 'VETERAN_OVERWRITE';
export const VETERAN_FIELD_UPDATE = 'VETERAN_FIELD_UPDATE';
export const UPDATE_COMPLETED_STATUS = 'UPDATE_COMPLETED_STATUS';
export const UPDATE_INCOMPLETE_STATUS = 'UPDATE_INCOMPLETE_STATUS';
export const UPDATE_REVIEW_STATUS = 'UPDATE_REVIEW_STATUS';
export const UPDATE_VERIFIED_STATUS = 'UPDATE_VERIFIED_STATUS';
export const UPDATE_SPOUSE_ADDRESS = 'UPDATE_SPOUSE_ADDRESS';
export const UPDATE_SUBMISSION_STATUS = 'UPDATE_SUBMISSION_STATUS';
export const CREATE_CHILD_INCOME_FIELDS = 'CREATE_CHILD_INCOME_FIELDS';

export function ensureFieldsInitialized(fields, parentNode) {
  return {
    type: ENSURE_FIELDS_INITIALIZED,
    fields,
    parentNode
  };
}

export function veteranOverwrite(value) {
  return {
    type: VETERAN_OVERWRITE,
    value
  };
}

export function veteranUpdateField(propertyPath, value) {
  return {
    type: VETERAN_FIELD_UPDATE,
    propertyPath,
    value
  };
}

export function updateCompletedStatus(path) {
  return {
    type: UPDATE_COMPLETED_STATUS,
    path
  };
}

export function updateIncompleteStatus(path) {
  return {
    type: UPDATE_INCOMPLETE_STATUS,
    path
  };
}

export function updateReviewStatus(path, value) {
  return {
    type: UPDATE_REVIEW_STATUS,
    path,
    value
  };
}

export function updateVerifiedStatus(path, value) {
  return {
    type: UPDATE_VERIFIED_STATUS,
    path,
    value
  };
}

export function updateSpouseAddress(propertyPath, value) {
  return {
    type: UPDATE_SPOUSE_ADDRESS,
    propertyPath,
    value
  };
}

export function updateSubmissionStatus(value) {
  return {
    type: UPDATE_SUBMISSION_STATUS,
    value
  };
}

export function createChildIncomeFields(path) {
  return {
    type: CREATE_CHILD_INCOME_FIELDS,
    path
  };
}
