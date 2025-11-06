import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface NetworkingStackProps extends cdk.StackProps {
  appName: string;
  environment: string;
}

export class LivoraNetworkingStack extends cdk.Stack {
  public vpc: ec2.Vpc;
  public publicSubnets: ec2.Subnet[];
  public privateSubnets: ec2.Subnet[];

  constructor(scope: Construct, id: string, props: NetworkingStackProps) {
    super(scope, id, props);

    const { appName, environment } = props;
    const vpcCidr = this.node.tryGetContext('vpc_cidr') || '10.0.0.0/16';

    // Create VPC with Public and Private Subnets
    this.vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 3,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    } as any);

    this.publicSubnets = this.vpc.publicSubnets as any;
    this.privateSubnets = this.vpc.privateSubnets as any;

    // VPC Flow Logs
    new ec2.FlowLog(this, 'FlowLogs', {
      resourceType: ec2.FlowLogResourceType.fromVpc(this.vpc),
      trafficType: ec2.FlowLogTrafficType.ALL,
    });

    // Outputs
    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
      description: 'VPC ID',
      exportName: `${appName}-vpc-id-${environment}`,
    });

    new cdk.CfnOutput(this, 'VpcCidr', {
      value: this.vpc.vpcCidrBlock,
      description: 'VPC CIDR Block',
      exportName: `${appName}-vpc-cidr-${environment}`,
    });
  }
}