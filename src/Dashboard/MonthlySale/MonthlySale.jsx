import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


const MonthlySale = () => {
    const [chartData, setChartData] = useState({
        series: [{
          name: 'Total Sales',
          data: []
        }],
        options: {
          chart: {
            type: 'line',
            height: 350
          },
          xaxis: {
            categories: [] 
          },
          title: {
            text: 'Monthly Sales',
            align: 'left'
          },
          yaxis: {
            title: {
              text: 'Sales Amount'
            },
            labels: {
                formatter: (value) => value.toFixed(0)
              }
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy'
            }
          }
        }
      });

      useEffect(() => {
        const fetchDailySales = async () => {
          try {
            const response = await axios.get('http://localhost:5000/monthlysale'); 
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
          type="bar"
          height={350}
          width={500}
        />
      </div>
    );
};

export default MonthlySale;