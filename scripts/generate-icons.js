const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[i] = c >>> 0;
    }
    crc32.table = table;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.allocUnsafe(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.allocUnsafe(4);
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  crc.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function createPng(width, height, drawFn) {
  const rgba = Buffer.alloc(width * height * 4);

  function fillRect(x0, y0, w, h, color) {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) {
        const idx = (y * width + x) * 4;
        rgba[idx] = color[0];
        rgba[idx + 1] = color[1];
        rgba[idx + 2] = color[2];
        rgba[idx + 3] = 255;
      }
    }
  }

  // Background #0f172a
  fillRect(0, 0, width, height, [0x0f, 0x17, 0x2a]);

  drawFn({ width, height, fillRect });

  const rowLen = 1 + width * 4;
  const raw = Buffer.alloc(rowLen * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowLen;
    raw[rowStart] = 0;
    rgba.copy(raw, rowStart + 1, y * width * 4, y * width * 4 + width * 4);
  }

  const idat = zlib.deflateSync(raw);

  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const png = Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);

  return png;
}

function writeIcons() {
  const outDir = path.resolve(__dirname, '..', 'public', 'icons');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 192x192
  const png192 = createPng(192, 192, ({ width, height, fillRect }) => {
    const scale = width / 192;
    const x = Math.round(48 * scale);
    fillRect(x, Math.round(56 * scale), Math.round(96 * scale), Math.round(24 * scale), [0xf8, 0xfa, 0xfc]);
    fillRect(x, Math.round(88 * scale), Math.round(64 * scale), Math.round(24 * scale), [0x38, 0xbd, 0xf8]);
    fillRect(x, Math.round(120 * scale), Math.round(96 * scale), Math.round(24 * scale), [0xf8, 0xfa, 0xfc]);
  });

  fs.writeFileSync(path.join(outDir, 'icon-192x192.png'), png192);
  console.log('Wrote icon-192x192.png');

  // 512x512
  const png512 = createPng(512, 512, ({ width, height, fillRect }) => {
    const scale = width / 512;
    const x = Math.round(132 * scale);
    fillRect(x, Math.round(148 * scale), Math.round(248 * scale), Math.round(64 * scale), [0xf8, 0xfa, 0xfc]);
    fillRect(x, Math.round(240 * scale), Math.round(176 * scale), Math.round(64 * scale), [0x38, 0xbd, 0xf8]);
    fillRect(x, Math.round(332 * scale), Math.round(248 * scale), Math.round(64 * scale), [0xf8, 0xfa, 0xfc]);
  });

  fs.writeFileSync(path.join(outDir, 'icon-512x512.png'), png512);
  console.log('Wrote icon-512x512.png');

  // Validate signatures
  const sig192 = fs.readFileSync(path.join(outDir, 'icon-192x192.png')).slice(0, 8);
  const sig512 = fs.readFileSync(path.join(outDir, 'icon-512x512.png')).slice(0, 8);
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!sig192.equals(pngSig) || !sig512.equals(pngSig)) {
    console.error('PNG signature check failed');
    process.exit(2);
  }

  console.log('PNG signature checks passed');
}

writeIcons();
