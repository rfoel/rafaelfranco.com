import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'

const Code: React.FC<{ className?: string }> = ({ className, children }) => (
  <Highlight
    {...defaultProps}
    code={children as string}
    language={className ? (className.split('-')[1] as Language) : 'javascript'}
    theme={theme}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)

export default Code
