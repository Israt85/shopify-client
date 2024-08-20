import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Lifetime = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
          chart: {
            type: 'donut'
          },
          labels: [], // Labels for each cohort (month-year)
          title: {
            text: 'Customer Lifetime Value by Cohorts'
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      });
    
      useEffect(() => {
        axios.get('http://localhost:5000/lifetime')
          .then(res => {
            const data = res.data;
    
            const labels = data.map(item => item._id); // Cohort months
            const series = data.map(item => item.cohortCLTV); // CLTV for each cohort
    
            setChartData({
              ...chartData,
              series,
              options: {
                ...chartData.options,
                labels
              }
            });
          })
          .catch(err => console.error(err));
      }, [chartData]);
    
    return (
        <div>
      <ReactApexChart options={chartData.options} series={chartData.series} type="donut" height={350} />
    </div>
    );
};

export default Lifetime;