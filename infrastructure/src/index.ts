import * as cdk from 'aws-cdk-lib';
import { LivoraFoundationStack } from './stacks/foundation-stack';
import { LivoraNetworkingStack } from './stacks/networking-stack';
import { LivoraSecurityStack } from './stacks/security-stack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
};

const appName = app.node.tryGetContext('app_name') || 'livora-enterprise-engine';
const environment = app.node.tryGetContext('environment') || 'dev';

// Foundation Stack - VPC, Subnets, NAT Gateways
const networkingStack = new LivoraNetworkingStack(
  app,
  `${appName}-networking-${environment}`,
  { env, appName, environment }
);

// Security Stack - IAM Roles, KMS Keys
const securityStack = new LivoraSecurityStack(
  app,
  `${appName}-security-${environment}`,
  { env, appName, environment }
);

// Foundation Stack - Monitoring, Logging, Base Services
const foundationStack = new LivoraFoundationStack(
  app,
  `${appName}-foundation-${environment}`,
  {
    env,
    appName,
    environment,
    vpc: networkingStack.vpc,
    securityStack: securityStack,
  }
);

// Add dependencies
foundationStack.addDependency(networkingStack);
foundationStack.addDependency(securityStack);

cdk.Tags.of(app).add('Application', appName);
cdk.Tags.of(app).add('Environment', environment);
cdk.Tags.of(app).add('ManagedBy', 'CDK');
cdk.Tags.of(app).add('Phase', 'Phase-0');