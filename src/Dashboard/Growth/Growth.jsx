import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Growth = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        height: 350,
        background: '#000', // Set the chart background to black
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Year',
          style: {
            color: '#fff' // Set x-axis title to white
          }
        },
        labels: {
          style: {
            colors: '#fff' // Set x-axis labels to white
          }
        }
      },
      yaxis: {
        title: {
          text: 'Growth Rate (%)',
          style: {
            color: '#fff' // Set y-axis title to white
          }
        },
        labels: {
          style: {
            colors: '#fff' // Set y-axis labels to white
          },
          formatter: (value) => `${value}%`
        }
      },
      title: {
        text: 'Sales Growth Rate Over Time',
        align: 'left',
        style: {
          color: '#fff' // Set chart title to white
        }
      },
      tooltip: {
        theme: 'dark', // Set tooltip theme to dark
        y: {
          formatter: (value) => `${value}%`
        }
      },
      legend: {
        labels: {
          colors: '#fff' // Set legend labels to white
        }
      }
    }
  });
  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await axios.get('https://shopify-server-rouge.vercel.app/yearly'); // Adjust the API endpoint as needed
        const data = response.data;

        // Ensure data is sorted by year if needed
        data.sort((a, b) => a._id.localeCompare(b._id));

        // Calculate growth rates
        const growthRates = data.map((item, index, array) => {
          if (index === 0) return { year: item._id, growthRate: 0 };
          const previousSales = array[index - 1].totalSales;
          const currentSales = item.totalSales;
          const growthRate = ((currentSales - previousSales) / previousSales) * 100;
          return {
            year: item._id,
            growthRate: growthRate.toFixed(2)
          };
        });

        // Prepare data for chart
        setChartData({
          series: [{
            name: 'Growth Rate',
            data: growthRates.map(item => parseFloat(item.growthRate))
          }],
          options: {
            ...chartData.options,
            xaxis: {
              categories: growthRates.map(item => item.year) 
            }
          }
        });
      } catch (error) {
        console.error('Error fetching pie data:', error);
      }
    };

    fetchPieData();
  }, [chartData.options]);

  return (
    <div>
      <h2>Sales Growth Rate Over Time</h2>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line" // Line chart type
        height={350}
      />
    </div>
  );
};

export default Growth;
