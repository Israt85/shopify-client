
import Growth from './Growth/Growth';
import MonthlySale from './MonthlySale/MonthlySale';
import Quarter from './Quarter/Quarter';
import TotalSales from './TotalSales/TotalSales';
import Yearly from './Yearly/Yearly';


const Dashboard = () => {
    return (
        <div className=''>
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
        </div>
    );
};

export default Dashboard;