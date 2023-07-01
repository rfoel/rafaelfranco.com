import { SES } from '@aws-sdk/client-ses'
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda'

export const handler: APIGatewayProxyHandlerV2 = async (request) => {
  const ses = new SES({
    region: 'us-east-1',
  })

  try {
    if (!request.body) return { statusCode: 204 }

    const { email, message } = JSON.parse(request.body)
    await ses.sendEmail({
      Destination: { ToAddresses: ['oi@rafaelfranco.com'] },
      Message: {
        Body: { Text: { Data: `from: ${email} message: ${message}` } },
        Subject: { Data: 'Message from contact form' },
      },
      Source: 'contact@rafaelfranco.com',
    })

    return { statusCode: 201 }
  } catch (error) {
    if (error instanceof Error) return { statusCode: 400, body: error.message }
    return { statusCode: 500, body: 'Unknown error' }
  }
}
