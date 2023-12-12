import React from 'react'
import "../ShimmerCategory/ShimmerCategory.css"
function ShimmerCategory() {
  return (
    <div id="container">
    <div id="square" class="shimmer"></div>
    <div id="content">
      <div id="title" class="shimmer"></div>
      <div id="desc">
        <div class="line shimmer"></div>
        <div class="line shimmer"></div>

      </div>
    </div>
  </div>
  )
}

export default ShimmerCategory