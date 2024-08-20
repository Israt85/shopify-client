import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const NewCustomer = () => {
    const [customer, setCustomer] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/newcustomer')
        .then(res=>{
            console.log(res.data)
            setCustomer(res.data)
        })
    },[])

    const chartData = {
        series: [{
          name: 'New Customers',
          data: customer.map(item => item.newCustomers) // Extract newCustomers values
        }],
        options: {
          chart: {
            type: 'bar',
            stacked: true, // Enable stacking
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false, // Vertical bars
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          xaxis: {
            categories: customer.map(item => item._id), // Extract _id as x-axis labels
            title: {
              text: 'Month'
            }
          },
          yaxis: {
            title: {
              text: 'New Customers'
            }
          },
          title: {
            text: 'New Customers Added Over Time',
            align: 'left'
          }
        }
      };
    return (
        <div>
        <h2>New Customers Added Over Time (Stacked)</h2>
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