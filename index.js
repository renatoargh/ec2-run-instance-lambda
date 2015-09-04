'use strict';

var Aws = require('aws-sdk'),
  async = require('async');

function newHandler(ec2parameters) {
  var ec2 = new Aws.EC2(ec2parameters);

  return function handler(event, context) {
    var instancesCreated = [];

    function runInstances(cb) {
      ec2.runInstances({
        ImageId: event.imageId,
        KeyName: event.keyName,
        MaxCount: event.maxCount || event.count || 1,
        MinCount: event.minCount || event.count || 1,
        Monitoring: {
          Enabled: event.monitoring || false
        },
        InstanceType: event.instanceType || 't2.micro',
        SecurityGroupIds: event.securityGroupIds,
        UserData: event.userData || null
      }, cb);
    }

    function createTags(reservations, cb) {
      if(!event.tags || !event.tags.length) {
        return cb();
      }

      var reservedInstances = reservations.Instances;
      instancesCreated = reservedInstances.map(function(reservation) {
        return reservation.InstanceId;
      });

      ec2.createTags({
        Resources: instancesCreated,
        Tags: event.tags.map(function(tag) {
            return {
              Key: tag.key,
              Value: tag.value
            }
        })
      }, cb);
    }

    async.waterfall([
      runInstances,
      createTags
    ], function(err) {
      if(err) {
        return context.fail(err);
      }

      context.succeed(instancesCreated);
    });
  }
}

module.exports.newHandler = newHandler;
