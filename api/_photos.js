const fs = require('node:fs');
const path = require('node:path');

const photoDirectory = () => path.join(process.cwd(), 'ritterSportMemes');

function photoIds() {
  let entries;
  try {
    entries = fs.readdirSync(photoDirectory(), { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  return entries
    .filter((entry) => entry.isFile() && /^(0|[1-9]\d*)\.jpeg$/.test(entry.name))
    .map((entry) => entry.name.slice(0, -5));
}

function sendError(response, status, message) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ error: message }));
}

function sendPhoto(response, id, extraHeaders = {}) {
  const photo = fs.readFileSync(path.join(photoDirectory(), `${id}.jpeg`));
  response.writeHead(200, {
    'Content-Type': 'image/jpeg',
    'Content-Length': photo.length,
    'Cache-Control': 'no-store',
    'X-Photo-Id': id,
    ...extraHeaders,
  });
  response.end(photo);
}

module.exports = { photoIds, sendError, sendPhoto };
