import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface SecurityStackProps extends cdk.StackProps {
  appName: string;
  environment: string;
}

export class LivoraSecurityStack extends cdk.Stack {
  public kmsKey: kms.Key;
  public lambdaExecutionRole: iam.Role;
  public dataProcessingRole: iam.Role;

  constructor(scope: Construct, id: string, props: SecurityStackProps) {
    super(scope, id, props);

    const { appName, environment } = props;

    // KMS Key for encryption
    this.kmsKey = new kms.Key(this, 'MasterKey', {
      description: `${appName} Master Encryption Key - ${environment}`,
      enableKeyRotation: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    this.kmsKey.addAlias(`alias/${appName}-master-${environment}`);

    // Lambda Execution Role
    this.lambdaExecutionRole = new iam.Role(this, 'LambdaExecutionRole', {
      roleName: `${appName}-lambda-execution-${environment}`,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'Lambda execution role for Livora Enterprise Engine',
    });

    // Add basic permissions
    this.lambdaExecutionRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
    );

    this.lambdaExecutionRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'kms:Decrypt',
          'kms:DescribeKey',
          'kms:GenerateDataKey',
        ],
        resources: [this.kmsKey.keyArn],
      })
    );

    // Data Processing Role (for Glue, Step Functions, etc.)
    this.dataProcessingRole = new iam.Role(this, 'DataProcessingRole', {
      roleName: `${appName}-data-processing-${environment}`,
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('glue.amazonaws.com'),
        new iam.ServicePrincipal('states.amazonaws.com'),
        new iam.ServicePrincipal('events.amazonaws.com')
      ),
      description: 'Data processing role for Livora workflows',
    });

    this.dataProcessingRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'kms:Decrypt',
          'kms:DescribeKey',
          'kms:GenerateDataKey',
        ],
        resources: [this.kmsKey.keyArn],
      })
    );

    // Outputs
    new cdk.CfnOutput(this, 'KMSKeyId', {
      value: this.kmsKey.keyId,
      description: 'KMS Master Key ID',
      exportName: `${appName}-kms-key-id-${environment}`,
    });

    new cdk.CfnOutput(this, 'LambdaRoleArn', {
      value: this.lambdaExecutionRole.roleArn,
      description: 'Lambda Execution Role ARN',
      exportName: `${appName}-lambda-role-${environment}`,
    });

    new cdk.CfnOutput(this, 'DataProcessingRoleArn', {
      value: this.dataProcessingRole.roleArn,
      description: 'Data Processing Role ARN',
      exportName: `${appName}-data-processing-role-${environment}`,
    });
  }
}