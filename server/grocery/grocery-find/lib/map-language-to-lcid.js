const languagePivotList = [
  {
    pivot_language: 'it',
    lcid: 'it_IT',
    siblings: ['it_CH']
  },
  {
    pivot_language: 'de',
    lcid: 'de_DE',
    siblings: ['de_AT', 'de_CH', 'de_LI', 'de_LU']
  },
  {
    pivot_language: 'en',
    lcid: 'en_GB',
    siblings: [
      'en_AU',
      'en_BZ',
      'en_CA',
      'en_CB',
      'en_IE',
      'en_IN',
      'en_JA',
      'en_MY',
      'en_NZ',
      'en_PH',
      'en_TT',
      'en_US',
      'en_ZA',
      'en_ZW'
    ]
  },
  {
    pivot_language: 'fr',
    lcid: 'fr_FR',
    siblings: ['fr_BE', 'fr_CA', 'fr_CH', 'fr_LU', 'fr_MC']
  },
  {
    pivot_language: 'es',
    lcid: 'es_ES',
    siblings: [
      'es_AR',
      'es_BO',
      'es_CL',
      'es_CO',
      'es_CR',
      'es_DO',
      'es_EC',
      'es_GT',
      'es_HN',
      'es_MX',
      'es_NI',
      'es_PA',
      'es_PE',
      'es_PR',
      'es_PY',
      'es_SV',
      'es_UR',
      'es_US',
      'es_VE'
    ]
  }
];

const pivotToLanguage = pivot => {
  const language = languagePivotList.find(
    obj => obj.pivot_language === pivot.toLowerCase()
  );
  return language.lcid;
};

const siblingToMainLanguage = sibling => {
  const re_ = new RegExp('[a-z]{2}_', 'i');
  const pivot = sibling.match(re_);
  return pivotToLanguage(pivot);
};

module.exports = { pivotToLanguage, siblingToMainLanguage };
