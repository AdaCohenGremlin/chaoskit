import cx from 'classnames'
import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'

import { list } from '../assets/styles/utility'

const List = ({
  as: Component,
  className,
  space,
  type,
  border,
  noContrast,
  ...rest
}) => {
  const theme = useTheme()

  return (
    <Component
      css={[
        list.reset,
        {
          gap: space && theme.space[space],
        },

        border && {
          '> li:not(:first-of-type)': [
            {
              paddingTop: space && theme.space[space],
              borderTop: theme.border.base,
            },

            theme.settings.contrast.enable &&
              !noContrast && {
                '.u-contrast &': {
                  borderColor: theme.contrast.border,
                },
              },
          ],
        },

        type === 'numbers' &&
          list.numbers({
            theme,
            space: space && theme.space[space],
            border,
            noContrast,
          }),

        type === 'circles' &&
          list.circles({
            theme,
            space: space && theme.space[space],
            border,
            noContrast,
          }),
      ]}
      className={cx('CK__List', className)}
      {...rest}
    />
  )
}

List.propTypes = {
  as: PropTypes.oneOf(['ul', 'ol']),
  border: PropTypes.bool,
  className: PropTypes.string,
  space: PropTypes.oneOf([
    'xsmall',
    'small',
    'base',
    'medium',
    'large',
    'xlarge',
  ]),
  type: PropTypes.oneOf(['numbers', 'circles']),
  noContrast: PropTypes.bool,
}

List.defaultProps = {
  as: 'ul',
}

export default List
