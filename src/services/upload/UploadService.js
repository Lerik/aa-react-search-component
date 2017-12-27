import * as feathers from '../../feathers';

class UploadService {
  create(image) {
    feathers.default.service('/uploads').timeout = 40000;
    return feathers.default.service('/uploads').create(image);
  }
}

module.exports = UploadService;
