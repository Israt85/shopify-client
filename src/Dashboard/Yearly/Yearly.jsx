import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Yearly = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
          chart: {
            type: 'pie',
            height: 350
          },
          labels: [], 
          legend: {
            position: 'bottom'
          },
          title: {
            text: 'Yearly Sales',
            align: 'left'
          },
          tooltip: {
            y: {
            }
          }
        }
      });
    
      useEffect(() => {
        const fetchPieData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/yearly'); 
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