const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { createInstance } = require('i18next');
const root = path.resolve(__dirname, '..');
const localesPath = path.join(root, 'src/localization/locales');
const localeCodes = ['en', 'zh', 'hi', 'es', 'ar', 'fr', 'bn', 'pt', 'ru', 'id', 'ro'];
const resources = Object.fromEntries(localeCodes.map(code => [code, {
  translation: JSON.parse(fs.readFileSync(path.join(localesPath, `${code}.json`), 'utf8')),
}]));
const flatten = (object, prefix = '') => Object.fromEntries(Object.entries(object).flatMap(([key, value]) => {
  const name = prefix ? `${prefix}.${key}` : key;
  return typeof value === 'string' ? [[name, value]] : Object.entries(flatten(value, name));
}));

function loadTypeScript(relativePath, mocks = {}) {
  const filename = path.join(root, relativePath);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  const localRequire = id => mocks[id] ?? require(id.startsWith('.') ? path.resolve(path.dirname(filename), id) : id);
  vm.runInThisContext(`(function(require, module, exports) { ${code}\n})`, { filename })(localRequire, module, module.exports);
  return module.exports;
}

function loadLocalization({ saved = null, device = ['en'], writeError = false, readError = false } = {}) {
  const writes = [];
  const instance = createInstance();
  const exports = loadTypeScript('src/localization/i18n.ts', {
    i18next: instance,
    'react-i18next': { initReactI18next: { type: '3rdParty', init() {} } },
    'expo-localization': { getLocales: () => device.map(languageCode => ({ languageCode })) },
    '@react-native-async-storage/async-storage': {
      getItem: async () => { if (readError) throw new Error('Storage unavailable'); return saved; },
      setItem: async (key, value) => { if (writeError) throw new Error('Storage unavailable'); writes.push([key, value]); },
    },
  });
  return { ...exports, instance, writes };
}

test('all 11 locales contain every key, nonempty text, and matching interpolation variables', () => {
  const english = flatten(resources.en.translation);
  for (const code of localeCodes) {
    const messages = flatten(resources[code].translation);
    assert.deepEqual(Object.keys(messages).sort(), Object.keys(english).sort(), code);
    for (const [key, value] of Object.entries(messages)) {
      assert.ok(value.trim(), `${code}:${key}`);
      assert.deepEqual(value.match(/\{\{[^}]+\}\}/g) ?? [], english[key].match(/\{\{[^}]+\}\}/g) ?? [], `${code}:${key}`);
    }
  }
});

test('every static translation and validation key used in the app exists in each locale', () => {
  const files = fs.readdirSync(path.join(root, 'src'), { recursive: true }).filter(file => /\.tsx?$/.test(file));
  const english = flatten(resources.en.translation);
  for (const file of files) {
    const source = fs.readFileSync(path.join(root, 'src', file), 'utf8');
    for (const match of source.matchAll(/["']((?:common|navigation|auth|profile|language|cart|checkout|orders|validation|home)\.[A-Za-z]+)["']/g)) {
      assert.ok(english[match[1]], `${file}: ${match[1]}`);
    }
  }
});

test('saved Romanian overrides device language and changes persist across initialization', async () => {
  const app = loadLocalization({ saved: 'ro', device: ['fr'] });
  await app.localizationReady;
  assert.equal(app.instance.t('navigation.cart'), 'Coș');
  assert.equal(app.languages.length, 11);
  await app.changeAppLanguage('ar');
  assert.equal(app.instance.dir(), 'rtl');
  assert.equal(app.instance.t('navigation.cart'), 'السلة');
  const restarted = loadLocalization({ saved: app.writes.at(-1)[1], device: ['en'] });
  await restarted.localizationReady;
  assert.equal(restarted.instance.language, 'ar');
});

test('unsupported preferences fall back to a supported device locale or English', async () => {
  for (const [device, expected] of [[['de', 'ro'], 'ro'], [['ja'], 'en']]) {
    const app = loadLocalization({ saved: 'invalid', device });
    await app.localizationReady;
    assert.equal(app.instance.language, expected);
  }
});

test('a failed save preserves the current language and invalid codes are rejected', async () => {
  const app = loadLocalization({ writeError: true });
  await app.localizationReady;
  await assert.rejects(app.changeAppLanguage('ro'), /Storage unavailable/);
  assert.equal(app.instance.language, 'en');
  await assert.rejects(app.changeAppLanguage('xx'), /Unsupported language/);
});

test('translations switch for existing validation keys and interpolate product titles in every locale', async () => {
  const app = createInstance();
  await app.init({ resources, fallbackLng: 'en', lng: 'en', interpolation: { escapeValue: false } });
  for (const code of localeCodes) {
    await app.changeLanguage(code);
    assert.equal(app.t('validation.emailRequired'), resources[code].translation.validation.emailRequired);
    assert.ok(app.t('cart.addItem', { title: 'A & B' }).includes('A & B'));
  }
});

test('locale formatting preserves USD values and formats Romanian dates', () => {
  const { formatPrice } = loadTypeScript('src/localization/formatters.ts');
  const { formatDate } = loadTypeScript('src/helpers/dateFormat.ts');
  for (const code of localeCodes) {
    assert.equal(formatPrice(1234.5, code), new Intl.NumberFormat(code, { style: 'currency', currency: 'USD' }).format(1234.5));
  }
  const date = new Date(2026, 8, 11);
  assert.equal(formatDate(date, 'ro'), new Intl.DateTimeFormat('ro', {year:'numeric',month:'short',day:'numeric'}).format(date));
  assert.notEqual(formatDate(date, 'ro'), formatDate(date, 'en'));
});
