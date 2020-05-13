import React, { useRef, useEffect } from 'react';
import './App.css';
import { select, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3'
import { data } from './data';

function App() {

  const svgRef = useRef();
  const xValue =  d => d.population;
  const yValue = d => d.country;
  const margin = { top: 20, right: 20, bottom: 20, left: 70}


  useEffect(() => {
    const svg = select(svgRef.current);



    const width = +(svg.attr('width'));
    const height = +(svg.attr('height'));
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // bar scale below---------------------------

    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth])

    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.2)


      //svg below------------------------

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    g.append('g').call(axisLeft(yScale))
    g.append('g').call(axisBottom(xScale))
    .attr('transform', `translate(0,${innerHeight})`)



    g.style('background-color', 'purple')
      .selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'steelblue')
    
    
   }, [])



  return (
    <div className="App">
      <h1>Making a Bar Chart in D3.js</h1>
       <svg ref={svgRef} width="960" height="500">
      </svg>
    </div>
  );
}

export default App;
