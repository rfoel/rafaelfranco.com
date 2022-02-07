import * as sst from '@serverless-stack/resources'

const { DOMAIN_NAME, PERSONAL_ACCESS_TOKEN } = process.env
export default class App extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    const stage = this.stage
    const prefix = stage === 'prod' ? '' : `${stage}.`
    const domainName = `${prefix}${DOMAIN_NAME}`

    const site = new sst.NextjsSite(this, 'Site', {
      customDomain: {
        domainName,
        hostedZone: DOMAIN_NAME,
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
