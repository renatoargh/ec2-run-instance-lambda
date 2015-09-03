# ec2-run-instance-lambda
AWS Lambda function that runs an EC2 instance with parameters coming from an HTTP request

### Instalation

```bash
npm install --save ec2-run-instance-lambda
```

### Usage

```javascript
'use strict';

var ec2RunInstance = require('ec2-run-instance');

module.exports.handler = ec2RunInstance({
  region: 'sa-east-1'
});
```

### License: MIT
