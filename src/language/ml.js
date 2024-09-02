import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
import languageTR from './tr.json'
import languageEN from './en.json'
Vue.use(MLInstaller)
const moment = require('moment')
Vue.use(require('vue-moment'), {
  moment
})

var getFirstBrowserLanguage = function () {
  var nav = window.navigator,
  browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
  i,
  language;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }

  return null;
};
var lang=getFirstBrowserLanguage().substring(0, 2);

if(lang=='tr' || lang=="TR"){
  lang="tr"
}else{
  lang="en"
}

export default new MLCreate({
  initial: lang,
  save: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
  languages: [
    new MLanguage('tr').create(languageTR),
    new MLanguage('en').create(languageEN)
  ]
})