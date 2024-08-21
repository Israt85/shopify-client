import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Lifetime = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
        background: '#000', // Set the background color to black
      },
      labels: [], // Labels for each cohort (month-year)
      title: {
        text: 'Customer Lifetime Value by Cohorts',
        align:'center',
        style: {
          color: '#fff' // Corrected to 'color' to set the title text to white
        }
      },
      legend: {
        labels: {
          colors: '#fff', // Set legend labels to white
        },
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            labels: {
              colors: '#fff', // Set legend labels to white in the responsive setting
            },
            position: 'bottom'
          }
        }
      }]
    }
  });
  
      useEffect(() => {
        axios.get('https://shopify-server-rouge.vercel.app/lifetime')
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