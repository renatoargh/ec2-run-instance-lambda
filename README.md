# ec2-run-instance-lambda
AWS Lambda function that runs an EC2 instance

### Instalation

```bash
npm install --save ec2-run-instance-lambda
```

### Usage

```javascript
var ec2RunInstance = require('ec2-run-instance');

module.exports.handler = ec2RunInstance.newHandler({
  region: 'sa-east-1'
});
```

### License: MIT
