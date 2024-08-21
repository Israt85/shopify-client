
import Growth from './Growth/Growth';
import Lifetime from './Lifetime/Lifetime';
import Location from './Location/Location';
import MonthlySale from './MonthlySale/MonthlySale';
import NewCustomer from './NewCustomer/NewCustomer';
import Quarter from './Quarter/Quarter';
import TotalSales from './TotalSales/TotalSales';
import Yearly from './Yearly/Yearly';


const Dashboard = () => {
    return (
        <div className='bg-black'>
           <div className='flex gap-10 justify-center mx-6'>
            <div>
            <TotalSales/>
            
            </div>
           </div>
           <div className='flex gap-10 justify-center mx-6'>
            <div>
            <Quarter/>
            
            </div>
            <div>
            <MonthlySale/>
            </div>
           </div>
           <div className='flex gap-10 justify-center mx-6'>
            <div>
            <Yearly/>
            
            </div>
            <div>
            <Growth/>
            </div>
           </div>
           <NewCustomer/>
          <div className='flex justify-center my-6 mx-2'>
          <Location/>
          <Lifetime/>
          </div>
        </div>
    );
};

export default Dashboard;