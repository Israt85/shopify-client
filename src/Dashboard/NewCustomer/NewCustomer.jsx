import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const NewCustomer = () => {
    const [customer, setCustomer] = useState([])

    useEffect(()=>{
        axios.get('https://shopify-server-rouge.vercel.app/newcustomer')
        .then(res=>{
            console.log(res.data)
            setCustomer(res.data)
        })
    },[])

    const chartData = {
      series: [{
        name: 'New Customers',
        data: customer.map(item => item.newCustomers)
      }],
      options: {
        chart: {
          type: 'area',
          stacked: true,
          height: 350,
          background: '#000' // Set chart background to black
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        xaxis: {
          categories: customer.map(item => item._id),
          title: {
            text: 'Month',
            style: {
              color: '#fff' // Set x-axis title color to white
            }
          },
          labels: {
            style: {
              colors: '#fff' // Set x-axis labels color to white
            }
          }
        },
        yaxis: {
          title: {
            text: 'New Customers',
            style: {
              color: '#fff' // Set y-axis title color to white
            }
          },
          labels: {
            style: {
              colors: '#fff' // Set y-axis labels color to white
            }
          }
        },
        title: {
          text: 'New Customers Added Over Time',
          align: 'left',
          style: {
            color: '#fff' 
          }
        },
        tooltip: {
          theme: 'dark'
        }
      }
    };
    
    return (
        <div>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area" // Bar chart type
          height={350}
        />
      </div>
    );
};

export default NewCustomer;