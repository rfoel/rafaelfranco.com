import { Box } from 'caixa'
import { ActionFunction, Form, json, useActionData } from 'react-router-dom'

import { rest } from './api'
import { ReactComponent as ArrowDown } from './assets/arrow-down.svg'
import { ReactComponent as FooterIllustration } from './assets/footer-illustration.svg'
import { ReactComponent as HeroIllustration } from './assets/hero-illustration.svg'

export const path = '/'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const message = formData.get('message')?.toString()

  const errors: { email?: string; message?: string } = {}

  if (!email) errors.email = 'Email is required'
  if (!message) errors.message = 'Message is required'

  if (Object.keys(errors).length) return json({ errors })

  await rest('/contact', {
    body: JSON.stringify({ email, message }),
    method: 'post',
  })

  return null
}

const Component = () => {
  const actionData = useActionData() as {
    errors?: { email?: string; message?: string }
  }

  return (
    <>
      <Box
        as='section'
        display='flex'
        alignItems='center'
        justifyContent='center'
        maxWidth='980px'
        margin='0 auto'
        gap='24px'
        height='100vh'
      >
        <Box flex='1'>
          <Box
            as='span'
            display='inline-block'
            backgroundColor='#9869FF'
            borderRadius='80px'
            color='#000'
            padding='16px 32px'
            fontWeight='700'
            marginBottom='24px'
          >
            SOFTWARE ENGINEER
          </Box>

          <Box
            as='h1'
            fontWeight='700'
            fontSize='72px'
            lineHeight='120%'
            marginBottom='24px'
          >
            HI, I'M{' '}
            <Box as='span' color='#9869FF'>
              RAFAEL
            </Box>
          </Box>
          <Box
            as='p'
            color='#000'
            fontSize='24px'
            fontWeight='700'
            lineHeight='150%'
            marginBottom='40px'
          >
            Experienced software engineer with 6+ years of expertise in
            developing innovative and efficient solutions.
          </Box>
          <Box
            as='button'
            fontWeight='700'
            lineHeight='120%'
            borderRadius=' 4px'
            border='1px solid #000'
            background='#FFF'
            boxShadow='8px 8px 0px 0px #000'
            display='flex'
            gap='8px'
            padding='16px 32px'
            alignItems='center'
            justifyContent='center'
          >
            Check out my work
            <Box height='24px' width='24px'>
              <ArrowDown />
            </Box>
          </Box>
        </Box>
        <Box flex='1'>
          <HeroIllustration />
        </Box>
      </Box>

      <Box
        as='section'
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        backgroundColor='#f1f1f1'
      >
        <Box
          as='section'
          display='flex'
          alignItems='flex-start'
          flexDirection='column'
          maxWidth='980px'
          margin='0 auto'
          gap='24px'
        >
          <Box
            as='h1'
            fontWeight='700'
            fontSize='64px'
            lineHeight='120%'
            marginBottom='32px'
          >
            I bet you gonna be{' '}
            <Box as='span' color='#9869FF'>
              impressed
            </Box>{' '}
            by my work...
          </Box>
          <Box
            as='p'
            fontWeight='700'
            fontSize='24px'
            lineHeight='120%'
            marginBottom='72px'
          >
            ...or not, but since I have your attention, what if you checkout my
            projects?
          </Box>
          <Box display='flex' gap='16px'>
            <Box
              fontWeight='700'
              lineHeight='120%'
              borderRadius=' 4px'
              border='1px solid #000'
              background='#FFF'
              boxShadow='8px 8px 0px 0px #000'
              display='flex'
              flexDirection='column'
              gap='8px'
              padding='16px 32px'
              alignItems='flex-start'
              justifyContent='center'
              flex='1'
            >
              <Box as='h2'>caixa</Box>
              <Box as='p'>React Component with fully typed inline CSS</Box>
              <Box
                as='a'
                fontWeight='700'
                lineHeight='120%'
                borderRadius=' 4px'
                border='1px solid #000'
                background='#000'
                boxShadow='8px 8px 0px 0px #9869FF'
                display='flex'
                gap='8px'
                padding='16px 32px'
                alignItems='center'
                justifyContent='center'
                href='https://github.com/rfoel/caixa'
                target='_blank'
                color='#fff'
                textDecoration='none'
              >
                Know more
              </Box>
            </Box>

            <Box
              fontWeight='700'
              lineHeight='120%'
              borderRadius=' 4px'
              border='1px solid #000'
              background='#FFF'
              boxShadow='8px 8px 0px 0px #000'
              display='flex'
              flexDirection='column'
              gap='8px'
              padding='16px 32px'
              alignItems='flex-start'
              justifyContent='center'
              flex='1'
            >
              <Box as='h2'>dinamo</Box>
              <Box as='p'>
                Amazon Dynamo (Amazon DynamoDB) optionated utilities for
                Node.js.
              </Box>
              <Box
                as='a'
                fontWeight='700'
                lineHeight='120%'
                borderRadius=' 4px'
                border='1px solid #000'
                background='#000'
                boxShadow='8px 8px 0px 0px #9869FF'
                display='flex'
                gap='8px'
                padding='16px 32px'
                alignItems='center'
                justifyContent='center'
                href='https://github.com/rfoel/dinamo'
                target='_blank'
                color='#fff'
                textDecoration='none'
              >
                Know more
              </Box>
            </Box>

            <Box
              fontWeight='700'
              lineHeight='120%'
              borderRadius=' 4px'
              border='1px solid #000'
              background='#FFF'
              boxShadow='8px 8px 0px 0px #000'
              display='flex'
              flexDirection='column'
              gap='8px'
              padding='16px 32px'
              alignItems='flex-start'
              justifyContent='center'
              flex='1'
            >
              <Box as='h2'>strava</Box>
              <Box as='p'>JavaScript wrapper for the Strava JSON API</Box>
              <Box
                as='a'
                fontWeight='700'
                lineHeight='120%'
                borderRadius=' 4px'
                border='1px solid #000'
                background='#000'
                boxShadow='8px 8px 0px 0px #9869FF'
                display='flex'
                gap='8px'
                padding='16px 32px'
                alignItems='center'
                justifyContent='center'
                href='https://github.com/rfoel/strava'
                target='_blank'
                color='#fff'
                textDecoration='none'
              >
                Know more
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        as='section'
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='50vh'
        backgroundColor='#000'
        color='#fff'
      >
        <Box
          as='section'
          display='flex'
          alignItems='stretch'
          maxWidth='980px'
          margin='0 auto'
          gap='24px'
          width='100%'
        >
          <Box
            as='h3'
            fontWeight='700'
            fontSize='64px'
            lineHeight='120%'
            flex='3'
          >
            Lets{' '}
            <Box as='span' color='#9869FF'>
              connect
            </Box>
            ?
          </Box>
          <Box
            as='a'
            fontWeight='700'
            lineHeight='120%'
            borderRadius=' 4px'
            border='1px solid #000'
            background='#fff'
            boxShadow='8px 8px 0px 0px #9869FF'
            display='flex'
            padding='16px 32px'
            alignItems='center'
            justifyContent='center'
            href='https://www.linkedin.com/in/rfoel'
            target='_blank'
            color='#000'
            textDecoration='none'
            flex='1'
          >
            LinkedIn
          </Box>
          <Box
            as='a'
            fontWeight='700'
            lineHeight='120%'
            borderRadius=' 4px'
            border='1px solid #000'
            background='#fff'
            boxShadow='8px 8px 0px 0px #9869FF'
            display='flex'
            gap='8px'
            padding='16px 32px'
            alignItems='center'
            justifyContent='center'
            href='https://github.com/rfoel'
            target='_blank'
            color='#000'
            textDecoration='none'
            flex='1'
          >
            GitHub
          </Box>
        </Box>
      </Box>

      <Box
        as='footer'
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <Box
          as='section'
          display='flex'
          alignItems='stretch'
          maxWidth='980px'
          margin='0 auto'
          gap='24px'
          width='100%'
        >
          <Box flex='1'>
            <FooterIllustration />
          </Box>
          <Box flex='1'>
            <Box
              as='h3'
              fontWeight='700'
              fontSize='64px'
              lineHeight='120%'
              marginBottom='54px'
            >
              Let's grab a{' '}
              <Box as='span' color='#9869FF'>
                coffee
              </Box>
              !
            </Box>
            <Form method='post'>
              <Box display='flex' flexDirection='column'>
                <Box
                  display='flex'
                  gap='8px'
                  flexDirection='column'
                  marginBottom='24px'
                >
                  <Box
                    as='input'
                    type='email'
                    placeholder='Email'
                    borderRadius='4px'
                    fontSize='24px'
                    border='1px solid #000'
                    background='#FFF'
                    padding='16px 24px'
                    name='email'
                  />
                  {actionData?.errors?.email ? (
                    <Box as='span' color='red'>
                      {actionData.errors.email}
                    </Box>
                  ) : null}
                </Box>
                <Box
                  display='flex'
                  gap='8px'
                  flexDirection='column'
                  marginBottom='24px'
                >
                  <Box
                    as='textarea'
                    placeholder='Message'
                    resize='none'
                    rows={6}
                    borderRadius='4px'
                    border='1px solid #000'
                    background='#FFF'
                    padding='16px 24px'
                    fontSize='24px'
                    name='message'
                  />
                  {actionData?.errors?.message ? (
                    <Box as='span' color='red'>
                      {actionData.errors.message}
                    </Box>
                  ) : null}
                </Box>
                <Box
                  as='button'
                  fontWeight='700'
                  lineHeight='120%'
                  borderRadius=' 4px'
                  border='1px solid #000'
                  background='#fff'
                  boxShadow='8px 8px 0px 0px #9869FF'
                  display='flex'
                  gap='8px'
                  padding='16px 32px'
                  alignItems='center'
                  justifyContent='center'
                  color='#000'
                  type='submit'
                >
                  Send message
                  <Box height='24px' width='24px' transform='rotate(-90deg)'>
                    <ArrowDown />
                  </Box>
                </Box>
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
      <Box
        as='section'
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='25vh'
        backgroundColor='#000'
        color='#fff'
      >
        <Box
          as='section'
          display='flex'
          alignItems='center'
          maxWidth='980px'
          margin='0 auto'
          gap='24px'
          width='100%'
        >
          <Box
            as='h3'
            fontWeight='700'
            fontSize='32px'
            lineHeight='120%'
            flex='1'
          >
            Designed by
          </Box>
          <Box
            as='a'
            fontWeight='700'
            lineHeight='120%'
            borderRadius=' 4px'
            border='1px solid #000'
            background='#fff'
            boxShadow='8px 8px 0px 0px #9869FF'
            display='flex'
            gap='8px'
            padding='16px 32px'
            alignItems='center'
            justifyContent='center'
            color='#000'
            textDecoration='none'
            href='https://www.linkedin.com/in/andressa-kanashiro'
            target='_blank'
            flex='1'
          >
            Andressa Kanashiro
          </Box>
        </Box>
      </Box>
    </>
  )
}

export const element = <Component />
