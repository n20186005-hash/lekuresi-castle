// 生成 PWA 图标（accent 底色 + 白色城堡剪影）
// 运行：node scripts/generate-icons.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

// ---- PNG 编码 ----
function crc32(buf) {
  if (!crc32.table) {
    crc32.table = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crc32.table[n] = c >>> 0;
    }
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++)
    c = crc32.table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(size, pixelFn) {
  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4);
    row[0] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixelFn(x, y);
      const o = 1 + x * 4;
      row[o] = r;
      row[o + 1] = g;
      row[o + 2] = b;
      row[o + 3] = a;
    }
    rows.push(row);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  const idat = zlib.deflateSync(Buffer.concat(rows));
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---- 城堡剪影（512 画布坐标系） ----
const ACCENT = [58, 122, 141]; // #3a7a8d
const FG = [250, 248, 244]; // 沙色白

function inCastle(cx, cy) {
  let castle = false;
  // 城墙底座
  if (cy >= 330 && cy < 400 && cx >= 150 && cx < 362) castle = true;
  // 主体
  if (cy >= 230 && cy < 330 && cx >= 190 && cx < 322) castle = true;
  // 左右塔
  if (cy >= 170 && cy < 330 && ((cx >= 150 && cx < 190) || (cx >= 322 && cx < 362)))
    castle = true;
  // 塔顶三角
  if (cy >= 130 && cy < 170) {
    const t1 = cx >= 150 && cx < 190 && Math.abs(cx - 170) <= (170 - cy) / 2;
    const t2 = cx >= 322 && cx < 362 && Math.abs(cx - 342) <= (170 - cy) / 2;
    if (t1 || t2) castle = true;
  }
  // 城齿
  if (cy >= 214 && cy < 230 && cx >= 190 && cx < 322 && (cx - 190) % 33 < 22)
    castle = true;
  // 中央拱门（挖空）
  if (castle) {
    const inRect = cx >= 238 && cx < 274 && cy >= 376 && cy < 400;
    const inArch =
      cx >= 238 && cx < 274 && cy >= 356 && cy < 376 &&
      Math.sqrt((cx - 256) ** 2 + (cy - 376) ** 2) <= 18;
    if (inRect || inArch) castle = false;
  }
  return castle;
}

function pixelFn(size) {
  const scale = size / 512;
  return (x, y) => {
    const cx = x / scale;
    const cy = y / scale;
    const c = inCastle(cx, cy) ? FG : ACCENT;
    return [...c, 255];
  };
}

writeFileSync(join(outDir, 'icon-192.png'), encodePng(192, pixelFn(192)));
writeFileSync(join(outDir, 'icon-512.png'), encodePng(512, pixelFn(512)));
console.log('已生成 public/icons/icon-192.png 与 public/icons/icon-512.png');
