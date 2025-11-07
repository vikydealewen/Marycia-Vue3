const { propertyGroups } = require('stylelint-config-clean-order');

//отключение отступов между свойствами
const propertiesOrder = propertyGroups.map((properties) => ({
  'at-rule-empty-line-before': ['always', { except: ['inside-block'] }],
  'declaration-empty-line-before': 'never',
  properties,
}));

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'custom-property-empty-line-before': 'never',
    'color-hex-length': 'short',
    'selector-class-pattern': null, // отключаем проверку формата имён классов
    // 'color-function-notation': 'legacy',
    // 'alpha-value-notation': 'number',
    'order/properties-order': [propertiesOrder],
  },
  overrides: [
    {
      files: ['**/*.vue', '**/*.scss'],
      customSyntax: 'postcss-html',
    },
  ],
};
