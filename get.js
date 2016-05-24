const request = require('request');
const fs = require('fs');

request({
    method: 'GET',
    uri: 'https://vaww.esrdev30.aac.va.gov:8432/voa/voaSvc?wsdl',
    agentOptions: {
      //  ca: fs.readFileSync('certs/VAdeviceCA.cert'),
      // ca: fs.readFileSync('src/cert/caCertsIssuedTofcpca.cert'),
      ca: [
        fs.readFileSync('certs/VAdeviceCA.pem'),
        fs.readFileSync('certs/SSP-CA-A1.pem'),
        fs.readFileSync('certs/fed_common_policy.pem'),
        fs.readFileSync('certs/fbca-2013.pem')
      ]
    },
  },
  (err, response,body) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(response.statusCode); // 200
    console.log(response.headers['content-type']);
    console.log(body);
  });
