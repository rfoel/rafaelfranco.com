import * as sst from '@serverless-stack/resources'
import * as ssm from 'aws-cdk-lib/aws-ssm'

const {
  CLIENT_ID,
  CLIENT_SECRET,
  DOMAIN_NAME,
  PERSONAL_ACCESS_TOKEN,
  SECRET_COOKIE_PASSWORD,
} = process.env
export default class App extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    const stage = this.stage
    const prefix = stage === 'prod' ? '' : `${stage}.`
    const domainName = `${prefix}${DOMAIN_NAME}`

    new ssm.StringParameter(this, 'Parameter', {
      description: 'GitHub personal access token used to access issues (posts)',
      parameterName: `/${stage}/personalAccessToken`,
      stringValue: PERSONAL_ACCESS_TOKEN,
      tier: ssm.ParameterTier.STANDARD,
    })

    const site = new sst.NextjsSite(this, 'Site', {
      customDomain: {
        domainName,
        hostedZone: DOMAIN_NAME,
      },
      defaultFunctionProps: {
        permissions: ['ssm:GetParameter'],
      },
      environment: {
        CLIENT_ID,
        CLIENT_SECRET,
        REGION: this.region,
        SECRET_COOKIE_PASSWORD,
        STAGE: this.stage,
      },
      path: 'src',
    })

    this.addOutputs({
      URL: site.url,
    })
  }
}
