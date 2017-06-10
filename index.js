exports.handler = (event, context, callback) => {
    // TODO implement
    callback(null, {"version": "1.0",
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "It is currently 50 degrees outside... Wear something warm!"
    },
    "shouldEndSession": true
  }
  });
};