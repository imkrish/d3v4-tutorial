import * as d3 from 'd3'

export const basic01 = () => {

  const data = [200, 250, 160, 220, 300]
  const rectWidth = 100
  const height = 300

  d3.select('svg')
    .attr('width', 1000)
    .selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('x', (d, i) => i * rectWidth)
    .attr('y', d => height - d)
    .attr('width', rectWidth)
    .attr('height', d => d)
    .attr('fill', 'blue')
    .attr('stroke', 'white')

}


  