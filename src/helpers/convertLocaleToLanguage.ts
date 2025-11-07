export const convertLocaleToLanguage = (code: string): string => {
  const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  const name = languageNames.of(code);
  return name ? name : code;
};
