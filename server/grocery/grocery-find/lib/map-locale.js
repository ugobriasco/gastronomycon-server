const { pivotToLanguage } = require('./map-language-to-lcid');

// maps [it, IT, it_it, it_IT, IT_it, IT_IT, it-it, it-IT, IT-it, IT-IT] to "it_IT"
function mapLocale(lang) {
  const dashRe = new RegExp('-', 'g');
  const re_re = new RegExp('[a-z]{2}_(?:[a-z]{2}){1,2}(?:_[a-z]{2})?$', 'i');
  const _RE = new RegExp('_[a-z]{2}', 'i');
  const re_ = new RegExp('[a-z]{2}_', 'i');

  lang = lang.replace(dashRe, '_'); //handle case it-it
  if (lang.match(re_re)) {
    //handle case it_it, IT_IT, IT_it, it_IT
    return lang
      .replace(_RE, x => x.toUpperCase())
      .replace(re_, x => x.toLowerCase());
  } else {
    // handle case it, IT
    return pivotToLanguage(lang.toLowerCase());
  }
}

module.exports = mapLocale;
