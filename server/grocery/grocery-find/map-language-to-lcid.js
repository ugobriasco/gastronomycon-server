const languagePivotList = [
  {
    pivot_language: 'it',
    lcid: 'it_IT'
  },
  {
    pivot_language: 'de',
    lcid: 'de_DE'
  },
  {
    pivot_language: 'en',
    lcid: 'en_GB'
  },
  {
    pivot_language: 'fr',
    lcid: 'fr_FR'
  },
  {
    pivot_language: 'es',
    lcid: 'es_ES'
  }
];

const pivotToLanguage = pivot =>
  languagePivotList
    .find({ pivot_language: pivot.toLowerCase() })
    .then(obj => (obj[0].lcid ? obj[0].lcid : ''));

module.exports = { pivotToLanguage };
