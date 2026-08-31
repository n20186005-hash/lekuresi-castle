// 校验三语（en/zh/sq）messages JSON 的 key 结构一致性与数组长度一致性。
// 运行：node scripts/check-i18n.mjs
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, '..', 'src', 'messages');

function load(locale) {
  return JSON.parse(readFileSync(join(messagesDir, `${locale}.json`), 'utf8'));
}

const locales = ['en', 'zh', 'sq'];
const files = new Map(locales.map((l) => [l, load(l)]));
const enFile = files.get('en');

// 展平 key 路径（含数组项索引）
function flatten(obj, prefix = '', out = {}) {
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => flatten(item, `${prefix}[${i}]`, out));
  } else if (obj !== null && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      flatten(obj[k], prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out[prefix] = obj;
  }
  return out;
}

const flat = new Map(
  [...files.entries()].map(([l, f]) => [l, flatten(f)])
);
const baseKeys = Object.keys(flat.get('en')).sort();

let fail = false;

// 1) key 结构一致性
for (const [locale, f] of files) {
  const keys = Object.keys(f).length ? Object.keys(flatten(f)).sort() : [];
  const missing = baseKeys.filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !baseKeys.includes(k));
  if (missing.length || extra.length) {
    fail = true;
    console.log(`[FAIL] ${locale}: missing=${missing.length} extra=${extra.length}`);
    if (missing.length) console.log('  missing:', missing.slice(0, 20).join(', '));
    if (extra.length) console.log('  extra:', extra.slice(0, 20).join(', '));
  }
}

// 2) 数组长度一致性（以 en 为基准，逐层递归）
function checkArrays(enObj, otherObj, locale, path = '') {
  if (!enObj || typeof enObj !== 'object') return;
  for (const [k, v] of Object.entries(enObj)) {
    const p = path ? `${path}.${k}` : k;
    const otherV = otherObj?.[k];
    if (Array.isArray(v)) {
      if (Array.isArray(otherV) && otherV.length !== v.length) {
        fail = true;
        console.log(`[FAIL] ${locale}.${p}: length ${otherV.length} !== en ${v.length}`);
      }
      checkArrays(v, otherV, locale, p);
    } else if (v && typeof v === 'object') {
      checkArrays(v, otherV, locale, p);
    }
  }
}

for (const [locale, f] of files) {
  if (locale === 'en') continue;
  checkArrays(enFile, f, locale);
}

if (fail) {
  console.log('\n结果：FAIL（存在不一致，请修复后再构建）');
  process.exit(1);
} else {
  console.log(`\n结果：PASS（${locales.join('/')} 全部 ${baseKeys.length} 个 key 一致，数组长度一致）`);
}
