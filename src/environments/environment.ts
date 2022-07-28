// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  API_ENDPOINT: 'https://prebap.prodapt.com:6378', // Dev Environment
  //API_ENDPOINT: 'http://localhost:443',
  USER_LOGIN_URL: '/auth',

  // Candidate Login Creds URL
  GET_CAND_BY_EMAIL: '/candidate/get/email/',

  //Declarations
  DECLARATIONS_POST_URL: '/declarations/save',
  DECLARATIONS_PUT_URL: '/declarations/update/',
  DECLARATIONS_GET_BY_EMPID_URL: '/declarations/get/empid/',

  DECLARATIONS_BASE_URL: '/declarations/',
  DOCUMENTS_POST_URL: '/save-document', // Upload Signature
  DOCUMENTS_PUT_URL: '/update-document/',
  DOCUMENTS_DELETE_URL: '/delete-document/',

  //Company App Form Urls
  CANDIDATE_DETAILS_GET_BASIC_URL: '/candidate-details/get/empid/',
  CANDIDATE_DETAILS_POST_URL: '/candidate-details/save',
  CANDIDATE_DETAILS_PUT_URL: '/candidate-details/update/',
  CANDIDATE_UPDATE_PASSWORD_URL: '/candidate/update-password/',
  CANDIDATE_DETAILS_BASE_URL: '/candidate-details/',
  ADDRESS_DETAILS_POST_URL: '/save-address', // Address Details Urls
  ADDRESS_DETAILS_DELETE_URL: '/delete-address/',
  IDENTITY_DETAILS_POST_URL: '/save-identity', // Identity Details Urls
  IDENTITY_DETAILS_DELETE_URL: '/delete-identity/',
  LANGUAGE_POST_URL: '/save-language', // Language Proficiency Urls
  LANGUAGE_DELETE_URL: '/delete-language/',
  REF_PERSON_POST_URL: '/save-refperson', // Reference Person Urls
  REF_PERSON_DELETE_URL: '/delete-refperson/',
  EDUCATION_DETAILS_POST_URL: '/save-education', // Education Details Urls
  EDUCATION_DETAILS_DELETE_URL: '/delete-education/',
  SPEC_TRAINING_POST_URL: '/save-specialization', //  Specialized Training Urls
  SPEC_TRAINING_DELETE_URL: '/delete-specialization/',
  EXPERIENCE_DETAILS_POST_URL: '/save-work', // Experience Details Urls
  EXPERIENCE_DETAILS_DELETE_URL: '/delete-work/',
  TRAVEL_DETAILS_POST_URL: '/save-travel', // Travel Details Urls
  TRAVEL_DETAILSS_DELETE_URL: '/delete-travel/',

  // Id Card Form Urls
  IDCARD_GET_BASIC_URL: '/idcard/get/empid/',
  IDCARD_DETAILS_POST_URL: '/idcard/save/',
  IDCARD_DETAILS_PUT_URL: '/idcard/update/',
  VEHICLE_BASE_URL: '/idcard/',  // Vehicle Details Urls
  VEHICLE_POST_URL: '/save-vehicle',
  VEHICLE_DELETE_URL: '/delete-vehicle/',

  // Mediclaim Form Urls
  MC_GET_BASIC_URL: '/mediclaim/get/empid/',
  MC_DETAILS_POST_URL: '/mediclaim/save',
  MC_DETAILS_PUT_URL: '/mediclaim/update/',
  REL_BASE_URL: '/mediclaim/', // Relation Details Urls
  REL_POST_URL: '/save-relation',
  REL_DELETE_URL: '/delete-relation/',

  // Gratuity Form(Form F) Urls
  GRATUITY_GET_BASIC_URL: '/gratuity/get/empid/',
  GRATUITY_DETAILS_POST_URL: '/gratuity/save',
  GRATUITY_DETAILS_PUT_URL: '/gratuity/update/',
  GRATUITY_DETAILS_BASE_URL: '/gratuity/',  // Gratuity Nominee Details Urls
  GRATUITY_NOMINEE_POST_URL: '/save-nominee',
  GRATUITY_NOMINEE_DELETE_URL: '/delete-nominee/',

  // EPF KYC Form(Form 11) Urls
  EPF_KYC_GET_BASIC_URL: '/epf-kyc/get/empid/',
  EPF_KYC_FORM_POST_URL: '/epf-kyc/save',
  EPF_KYC_FORM_PUT_URL: '/epf-kyc/update/',
  EPF_KYC_FORM_BASE_URL: '/epf-kyc/',  // KYC Details Urls
  KYC_DETAIL_POST_URL: '/save-kyc-detail',
  KYC_DETAIL_DELETE_URL: '/delete-kyc-detail/',

  // EPF Nomination(Form 2) Urls
  EPF_NOMINATION_GET_BASIC_URL: '/epf-nomination/get/empid/',
  EPF_NOMINATION_DETAILS_POST_URL: '/epf-nomination/save',
  EPF_NOMINATION_DETAILS_PUT_URL: '/epf-nomination/update/',
  EPF_NOMINATION_BASE_URL: '/epf-nomination/',  // EPF Nominee Details Urls
  EPF_NOMINATION_NOMINEE_POST_URL: '/save-epf-nominee',
  EPF_NOMINATION_NOMINEE_DELETE_URL: '/delete-epf-nominee/',
  EPF_NOMINATION_FAMILY_POST_URL: '/save-eps-family',   // EPS Family Details Urls
  EPF_NOMINATION_FAMILY_DELETE_URL: '/delete-eps-family/',
  EPF_NOMINATION_SEC_NOMINEE_POST_URL: '/save-nominee',  // EPF Sec Nominee Details Urls
  EPF_NOMINATION_SEC_NOMINEE_DELETE_URL: '/delete-nominee/',

  // Bank Details Urls
  BANK_DETAILS_GET_URL: '/bank-details/get/empid/',
  BANK_DETAILS_POST_URL: '/bank-details/save',
  BANK_DETAILS_PUT_URL: '/bank-details/update/',

  // Welfare Fund Details Urls
  WELFARE_FUND_DETAILS_GET_URL: '/welfare-fund/get/empid/',
  WELFARE_FUND_DETAILS_POST_URL: '/welfare-fund/save',
  WELFARE_FUND_DETAILS_PUT_URL: '/welfare-fund/update/',

  //Candidate List
  GET_ALL_CANDIDATES_URL: '/candidate/get/all',
  PUT_CANDIDATE_UPDATE_URL: '/candidate/update/',
  GET_CANDIDATE_URL: '/candidate/get/',

  // Email Service
  EMAIL_SIMPLE_URL: '/email/send-simple',
  EMAIL_GENERAL_URL: '/email/send-general',
  EMAIL_WITH_ATTACHMENT_URL: '/email/send-with-attachment',

  // Candidate Landing Page
  LANDING_PAGE_GET_URL: '/landing-page/get/all',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
