/**
 * @file NurbsLine.js
 */
import * as React from 'react'
import PropTypes from 'prop-types'

import styles from './NurbsLine.module.css'

const NurbsLine = (props) => {
  const { tagName: Tag, className, variant, children } = props

  return (
    <Tag
      className={`${styles.nurbs_line} ${
        styles[`nurbs_line__${variant}`]
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

NurbsLine.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

NurbsLine.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default NurbsLine
