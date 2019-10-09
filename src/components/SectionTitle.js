import PropTypes from 'prop-types';
import cx from 'classnames';

import { misc } from '../assets/styles/utility';

export const StylesSectionTitleWrapper = theme => [
  misc.trimChildren,
  misc.fluidSize({
    theme,
    property: 'marginBottom',
    from: theme.space.large,
    to: theme.space.xlarge,
  }),
  {
    textAlign: 'center',
  },
];

export const StylesSectionTitleSub = theme => ({
  color: theme.fontColor.muted,
  fontSize: theme.fontSize.medium,
  maxWidth: 625,
  margin: '0 auto',

  '.u-contrast &': {
    color: theme.contrast.muted,
  },
});

const SectionTitle = ({ title, as, sub, className, ...opts }) => {
  const TitleTag = as;

  return (
    <div
      className={(cx('CK__SectionTitle'), className)}
      css={theme => StylesSectionTitleWrapper(theme)}
      {...opts}
    >
      <TitleTag
        css={theme => [
          misc.fluidSize({
            theme,
            property: 'marginBottom',
            from: theme.space.small,
            to: theme.space.base,
          }),
        ]}
        className="CK__SectionTitle__Header"
      >
        {title}
      </TitleTag>
      {sub && (
        <div
          className="CK__SectionTitle__Sub"
          css={theme => StylesSectionTitleSub(theme)}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  as: PropTypes.string,
  sub: PropTypes.string,
  className: PropTypes.string,
};

SectionTitle.defaultProps = {
  as: 'h3',
};

export default SectionTitle;