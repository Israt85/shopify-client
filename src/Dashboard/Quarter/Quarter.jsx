import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Quarter = () => {
    const [chartData, setChartData] = useState({
      series: [{
        name: 'Total Sales',
        data: []
      }],
      options: {
        chart: {
          type: 'line',
          height: 350,
          background: 'bg-gray-600',
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#fff' // Set x-axis labels to white
            }
          }
        },
        yaxis: {
          title: {
            text: 'Sales Amount',
            style: {
              color: '#fff'
            }
          },
          labels: {
            style: {
              colors: '#fff' // Set y-axis labels to white
            },
            formatter: (value) => value.toFixed(0)
          }
        },
        title: {
          text: 'quarterly Sales',
          align: 'center',
          style: {
            color: '#fff' // Set chart title to white
          }
        },
        tooltip: {
          theme: 'dark' // Use a dark theme for the tooltip
        },
        legend: {
          labels: {
            colors: '#fff' // Set legend labels to white
          }
        }
      }
    });
    
      useEffect(() => {
        const fetchDailySales = async () => {
          try {
            const response = await axios.get('https://shopify-server-rouge.vercel.app/quarter');
            const salesData = response.data;
    
            const dates = salesData?.map(sale => sale._id);
            const sales = salesData?.map(sale => sale.totalSales);
            console.log(response.data);
    
            setChartData({
              ...chartData,
              series: [{ name: 'Total Sales', data: sales }],
              options: {
                ...chartData.options,
                xaxis: { categories: dates }
              }
            });
          } catch (error) {
            console.error('Error fetching daily sales data:', error);
          }
        };
    
        fetchDailySales();
      }, [chartData]);
    
    
    return (
        <div >
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
          width={450}
        />
      </div>
    );
};

export default Quarter;