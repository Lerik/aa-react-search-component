class UploadService {
  create(uriObject) {
    return Promise.resolve({
      id: '000000000000000000000',
      ur: uriObject.uri,
      size: uriObject.uri.length,
    });
  }
}

module.exports = UploadService;
