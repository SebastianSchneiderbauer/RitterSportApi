const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const byId = require('../api/photos');
const random = require('../api/random');
const { photoIds } = require('../api/_photos');

function call(handler, id, method = 'GET') {
  const response = {
    status: 200,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    writeHead(status, headers) { this.status = status; Object.assign(this.headers, headers); },
    end(body) { this.body = body; },
  };
  handler({ method, query: { id } }, response);
  return response;
}

test('photo ID returns its JPEG with the same format as random', () => {
  const selected = call(byId, '0');
  const picked = call(random);

  assert.equal(selected.status, 200);
  assert.equal(selected.headers['Content-Type'], 'image/jpeg');
  assert.equal(selected.headers['X-Photo-Id'], '0');
  assert.deepEqual(selected.body, fs.readFileSync('ritterSportMemes/0.jpeg'));

  assert.equal(picked.status, 200);
  assert.equal(picked.headers['Content-Type'], selected.headers['Content-Type']);
  assert.ok(photoIds().includes(picked.headers['X-Photo-Id']));
  assert.deepEqual(picked.body, fs.readFileSync(`ritterSportMemes/${picked.headers['X-Photo-Id']}.jpeg`));
});

test('unknown and unsafe IDs return 404', () => {
  for (const id of ['77', '../0', '00', '0.jpeg']) {
    const result = call(byId, id);
    assert.equal(result.status, 404);
    assert.deepEqual(JSON.parse(result.body), { error: 'Photo not found' });
  }
});

test('an empty collection is reported clearly by both endpoints', () => {
  const originalDirectory = process.cwd();
  const emptyDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'ritter-photos-'));
  try {
    process.chdir(emptyDirectory);
    for (const handler of [byId, random]) {
      const result = call(handler, '0');
      assert.equal(result.status, 404);
      assert.deepEqual(JSON.parse(result.body), { error: 'No photos available' });
    }
  } finally {
    process.chdir(originalDirectory);
    fs.rmdirSync(emptyDirectory);
  }
});
