const { photoIds, sendError, sendPhoto } = require('./_photos');

const DAY_MS = 24 * 60 * 60 * 1000;

module.exports = function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return sendError(response, 405, 'Method not allowed');
  }

  const ids = photoIds().sort((a, b) => Number(a) - Number(b));
  if (ids.length === 0) return sendError(response, 404, 'No photos available');

  const utcDay = Math.floor(Date.now() / DAY_MS);
  const id = ids[utcDay % ids.length];
  const nextReset = new Date((utcDay + 1) * DAY_MS).toISOString();
  sendPhoto(response, id, { 'X-Next-Reset': nextReset });
};
