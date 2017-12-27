const feathers = jest.genMockFromModule('feathers');
/* eslint-disable */
let response;

function __setMockResponse(mockResponse, err = false) {
  response = new Promise((resolve, reject) => {
    err ? reject(mockResponse) : resolve(mockResponse);
  });
}

const defaultMock = {
  service: serviceName => {
    return {
      create(...args) {
        return response;
      },
      patch(...args) { 
        return response;
      },
      get(...args) {
        return response;
      },
    };
  },
};

const mockFeathers = {
  ...feathers,
  service: defaultMock.service,
  __setMockResponse,
};
export default mockFeathers;