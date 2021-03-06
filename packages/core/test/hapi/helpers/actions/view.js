const { ActionTransport } = require('./../../../..');

function ViewAction(request) {
  return request.transportRequest.sendView('view', request.params);
}

ViewAction.transports = [ActionTransport.http];

module.exports = ViewAction;
