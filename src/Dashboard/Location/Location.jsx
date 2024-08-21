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
          title: {
            text: 'Geographical Distribution of Customers',
            align:'center',
            style: {
              color: '#fff' // Set title text color to white
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                labels: {
                  colors: '#fff' // Set legend text color to white
                },
                
                position: 'bottom',
                
                
              }
            }
          }],
          labels: []
        }
      });
    
      useEffect(() => {
        axios.get('https://shopify-server-rouge.vercel.app/location')
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
        <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" height={350} width={500} />
      </div>
    </div>
    );
};

export default Location;