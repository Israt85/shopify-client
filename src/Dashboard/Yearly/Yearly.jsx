import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Yearly = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'pie',
        height: 350,
        background: '#000', // Set the chart background to black
      },
      labels: [], 
      legend: {
        position: 'bottom',
        labels: {
          colors: '#fff', // Set legend labels to white
        }
      },
      title: {
        text: 'Yearly Sales',
        align: 'left', 
        style: {
          color: '#fff' // Corrected 'colors' to 'color' to set title color to white
        },
      },
      tooltip: {
        theme: 'dark', // Set tooltip theme to dark
      }
    }
  });
  
      useEffect(() => {
        const fetchPieData = async () => {
          try {
            const response = await axios.get('https://shopify-server-rouge.vercel.app/yearly'); 
            const data = response.data;
            const labels = data.map(item => item._id);
            const series = data.map(item => item.totalSales);
    
            setChartData({
              ...chartData,
              series,
              options: {
                ...chartData.options,
                labels
              }
            });
          } catch (error) {
            console.error('Error fetching pie data:', error);
          }
        };
    
        fetchPieData();
      }, [chartData]);
    
    return (
        <div>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={350}
          width={400}
        />
      </div>
    );
};

export default Yearly;