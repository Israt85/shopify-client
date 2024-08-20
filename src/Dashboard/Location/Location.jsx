import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


const Location = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
          chart: {
            type: 'polarArea',
          },
          stroke: {
            colors: ['#fff']
          },
          fill: {
            opacity: 0.8
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
          }],
          labels: []
        }
      });
    
      useEffect(() => {
        axios.get('http://localhost:5000/location')
          .then(res => {
            const newdata = res?.data;
            console.log(newdata);
    
            // Example data transformation
            const series = newdata?.map(item => item.customerCount); // Extract counts or similar
            const labels = newdata?.map(item => item._id); // Extract city names or similar
    
            setChartData({
              series,
              options: {
                ...chartData.options,
                labels
              }
            });
          })
          .catch(err => {
            console.error(err);
          });
      }, [chartData.options]);
    return (
        <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" height={350} />
      </div>
    </div>
    );
};

export default Location;