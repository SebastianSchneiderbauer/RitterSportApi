const { photoIds, sendError, sendPhoto } = require('./_photos');

module.exports = function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return sendError(response, 405, 'Method not allowed');
  }

  const ids = photoIds();
  if (ids.length === 0) return sendError(response, 404, 'No photos available');

  sendPhoto(response, ids[Math.floor(Math.random() * ids.length)]);
};
