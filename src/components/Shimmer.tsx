import React from 'react'

const Shimmer = ({ width, height, style = {} }: { width: number; height: number; style?: {} }) => {
  return (
    <div
      className="shimmer"
      style={Object.assign(
        {},
        {
          width,
          height
        },
        { ...style }
      )}
    />
  )
}

export default Shimmer
