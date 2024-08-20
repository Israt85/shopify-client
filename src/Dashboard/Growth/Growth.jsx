import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Growth = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Year'
        }
      },
      yaxis: {
        title: {
          text: 'Growth Rate (%)'
        },
        labels: {
          formatter: (value) => `${value}%`
        }
      },
      title: {
        text: 'Sales Growth Rate Over Time',
        align: 'left'
      },
      tooltip: {
        y: {
          formatter: (value) => `${value}%`
        }
      }
    }
  });

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/yearly');
        const data = response.data;

        const growthRates = data.map((item, index, array) => {
          if (index === 0) return null; 
          const previousSales = array[index - 1].totalSales;
          const currentSales = item.totalSales;
          const growthRate = ((currentSales - previousSales) / previousSales) * 100;
          return {
            year: item._id,
            growthRate: growthRate.toFixed(2) 
          };
        }).slice(1);
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
  }, [chartData]);

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default Growth;
