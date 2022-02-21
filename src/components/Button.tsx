import { darken, lighten } from 'polished'
import styled, { css } from 'styled-components'

export const Button = styled.button(
  ({ theme: { colors } }) => css`
    background-color: ${colors.bgDefault};
    border-color: ${darken(0.1, colors.bgDefault)};
    border-radius: 8px;
    border-style: solid;
    border-width: 2px 2px 4px;
    color: ${colors.fgDefault};
    cursor: pointer;
    font-size: 16px;
    padding: 8px 16px;
    text-transform: uppercase;

    :active {
      border-width: 2px;
      margin-bottom: 2px;
      transform: translate3d(0, 2px, 0);
    }

    :hover {
      background-color: ${darken(0.025, colors.bgDefault)};
      border-color: ${darken(0.15, colors.bgDefault)};
    }
  `,
)

export const ButtonPrimary = styled(Button)(
  ({ theme: { colors } }) => css`
    background-color: ${colors.bgPrimary};
    border-bottom-color: ${darken(0.1, colors.bgPrimary)};
    border-left-color: ${colors.bgPrimary};
    border-right-color: ${colors.bgPrimary};
    border-top-color: ${colors.bgPrimary};
    border-width: 0px 0px 4px;
    color: ${colors.fgPrimary};

    :active {
      border-width: 0;
      margin-bottom: 4px;
      transform: translate3d(0, 4px, 0);
    }

    :hover {
      background-color: ${lighten(0.025, colors.bgPrimary)};
      border-bottom-color: ${darken(0.025, colors.bgPrimary)};
    }
  `,
)
