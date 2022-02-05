import * as sst from '@serverless-stack/resources'
import * as cdk from 'aws-cdk-lib'

const { DOMAIN_NAME, HOSTED_ZONE_ID, PERSONAL_ACCESS_TOKEN } = process.env
export default class App extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    const stage = this.stage
    const prefix = stage === 'prod' ? '' : `${stage}.`
    const domainName = `${prefix}${DOMAIN_NAME}`

    const hostedZone = cdk.aws_route53.HostedZone.fromHostedZoneAttributes(
      this,
      'HostedZone',
      {
        hostedZoneId: HOSTED_ZONE_ID,
        zoneName: DOMAIN_NAME,
      },
    )

    const site = new sst.NextjsSite(this, 'Site', {
      customDomain: {
        domainName,
        hostedZone,
      },
      environment: {
        PERSONAL_ACCESS_TOKEN,
      },
      path: 'src',
    })

    this.addOutputs({
      URL: site.url,
    })
  }
}
