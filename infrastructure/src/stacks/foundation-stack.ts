import * as cdk from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { LivoraSecurityStack } from './security-stack';

interface FoundationStackProps extends cdk.StackProps {
  appName: string;
  environment: string;
  vpc: ec2.Vpc;
  securityStack: LivoraSecurityStack;
}

export class LivoraFoundationStack extends cdk.Stack {
  public logGroup: logs.LogGroup;
  public alarmTopic: sns.Topic;
  public dashboard: cloudwatch.Dashboard;

  constructor(scope: Construct, id: string, props: FoundationStackProps) {
    super(scope, id, props);

    const { appName, environment, vpc, securityStack } = props;

    // CloudWatch Log Group for application logs
    this.logGroup = new logs.LogGroup(this, 'AppLogGroup', {
      logGroupName: `/livora/${environment}/application`,
      retention: logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // SNS Topic for alerts
    this.alarmTopic = new sns.Topic(this, 'AlarmTopic', {
      topicName: `${appName}-alarms-${environment}`,
      masterKey: securityStack.kmsKey,
      displayName: 'Livora Enterprise Engine Alarms',
    });

    // CloudWatch Dashboard
    this.dashboard = new cloudwatch.Dashboard(this, 'MainDashboard', {
      dashboardName: `${appName}-${environment}`,
    });

    // Add basic metrics to dashboard
    this.dashboard.addWidgets(
      new cloudwatch.TextWidget({
        markdown: `# Livora Enterprise Engine - ${environment.toUpperCase()}\n\n**Status: INITIALIZING**\n\nPhase 0 Foundation Stack Active`,
        width: 24,
        height: 3,
      })
    );

    // Output key resources
    new cdk.CfnOutput(this, 'LogGroupName', {
      value: this.logGroup.logGroupName,
      description: 'CloudWatch Log Group for Application Logs',
      exportName: `${appName}-log-group-${environment}`,
    });

    new cdk.CfnOutput(this, 'AlarmTopicArn', {
      value: this.alarmTopic.topicArn,
      description: 'SNS Topic for Alarms',
      exportName: `${appName}-alarm-topic-${environment}`,
    });

    new cdk.CfnOutput(this, 'DashboardURL', {
      value: `https://console.aws.amazon.com/cloudwatch/home?region=${this.region}#dashboards:name=${this.dashboard.dashboardName}`,
      description: 'CloudWatch Dashboard URL',
    });
  }
}