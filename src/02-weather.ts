import * as d3 from 'd3'

export const weather02 = () => {
  interface IData {
    date: Date
    'New York': number
    'San Francisco': string
    'Austin': string
  }

  const city   = 'New York'
  const margin = {top: 20, bottom: 20, left: 20, right: 20}
  const width  = 800
  const height = 300

  d3.tsv('data/weather.tsv', (err, data: any) => {
    // clean data
    data.forEach((d: IData) => {
      d.date = <Date> d3.timeParse("%Y%m%d")((d.date).toString())
      d[city] = Number(d[city]) // convert string to integer
      delete d['San Francisco']
      delete d['Austin']
    })
    
    // x scales
    const xExtent: any = d3.extent(data, (d: IData) => d.date)
    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right])
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(date => d3.timeFormat('%b, %Y')(<Date> date))

    // y scales
    const yExtent: any = d3.extent(data, (d: IData) => d[city])
    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([height - margin.bottom, margin.bottom])
    const heightScale = d3.scaleLinear()
      .domain(yExtent)
      .range([0, height - margin.top - margin.bottom])
    const yAxis = d3.axisLeft(yScale)
    
    // select svg elements
    const svg = d3.select('svg')

    // create the rectangles
    const rect = svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('width', 2)
      .attr('height', (d: IData) => heightScale(d[city]))
      .attr('x', (d: IData) => xScale(d.date))
      .attr('y', (d: IData) => yScale(d[city]))
      .attr('fill', 'blue')
      .attr('stroke', 'white')

    svg.append('g')
      .attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      .call(xAxis)

    svg.append('g')
      .attr('transform', 'translate(' + margin.left + ')')
      .call(yAxis)
    
  })
}