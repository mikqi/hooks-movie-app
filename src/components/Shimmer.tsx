import React from 'react'

const Shimmer = ({
  width = 0,
  height = 0,
  style = {}
}: {
  width: number
  height: number
  style?: {}
}) => {
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
    ></div>
  )
}

export default Shimmer
