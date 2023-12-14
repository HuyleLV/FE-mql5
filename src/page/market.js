import { Link } from 'react-router-dom';
import  bank  from "../component/image/bank.png";
import  ae  from "../component/image/ae.png";
import  ea  from "../component/image/ea.png";
import  star  from "../component/image/star.png";

import { List, } from 'antd'
import { MenuItem, Products } from '../database';

export default function Market() {

    const renderItemTrader5 = (item) => {
        return (
          <List.Item>
            <List.Item.Meta
              description={
                <>
                <div className="relative group overflow-hidden hover:overflow-visible">
                    <div className="absolute z-[2] invisible group-hover:visible duration-300 translate-x-[-50%] group-hover:translate-x-0 translate-y-[50%] group-hover:translate-y-0 bg-white shadow-full p-[10px] pb-0 w-[calc(200%_+_20px)] max-w-[calc(200%_+_20px)] h-full overflow-y-hidden transition-all">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div class="flex relative z-[1]">
                                    <img src={ae} alt={item?.name} className="w-[36px] h-[36px] object-cover"/>
                                    <div>
                                        <p className='p-1'>{item?.name}</p>
                                        <div class="flex items-center">
                                            {[1,2,3,4,5]?.map((i) => {
                                                return <img id={i} alt='icon-star' src={star} className="w-[10px] h-[10px]" />
                                            })}
                                            <span className="w-[18px] h-[18px] block">
                                                
                                            </span>
                                            <span>Experts</span>
                                        </div>
                                    </div>
                                </div>
                                <div>        
                                    Sezar EA was tested and has successfully passed the stress test with slippage and commission approximate to the real market conditions
                                    using real ticks  quality in a period of 22 years. The Expert Advisor contains the algorithm of statistics collection and slippage control
                                    with complete statistics control; this  information is   used to protect you from broker’s tricks. Sezar EA controls the quality of the
                                    broker execution before placing an order and It also has successfully passed strict criter
                                </div>
                            </div>
                            <p className='border-t text-center cursor-pointer p-2 w-full font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>${item?.price} <span>USD</span></p>
                        </div>
                    </div>

                    <Link to={`/market/detail/`}>
                       <div className='text-center border'>
                           <div className="flex justify-center  w-full" ><img alt='avata-product' src={ae}  /></div>
                           <p className='p-1 font-semibold'>{item?.name}</p>
                           <div className='flex items-center justify-center pt-[8px] pb-[16px]'>
                               {[1,2,3,4,5]?.map((i) => {
                                   return <img id={i} alt='icon-star' src={star} className="w-[10px] h-[10px]" />
                               })}   
                           </div>
                           <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>${item?.price} <span>USD</span></p>
                       </div>
                   </Link>
                </div>
                </>
              }
            />
          </List.Item>
        )
      }

      const renderItemTrader4 = (item) => {
        return (
          <List.Item>
            <List.Item.Meta
              description={
                <>
                <div class="relative">
                    <div className="absolute z-[2] invisible group-hover:visible duration-300 translate-x-[-50%] group-hover:translate-x-0 translate-y-[50%] group-hover:translate-y-0 bg-white shadow-full p-[10px] pb-0 w-[calc(200%_+_20px)] max-w-[calc(200%_+_20px)] h-full overflow-y-hidden transition-all">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div class="flex relative z-[1]">
                                    <img src={ae} alt={item?.name} className="w-[36px] h-[36px] object-cover"/>
                                    <div>
                                        <p className='p-1'>{item?.name}</p>
                                        <div class="flex items-center">
                                            {[1,2,3,4,5]?.map((i) => {
                                                return <img id={i} alt='icon-star' src={star} className="w-[10px] h-[10px]" />
                                            })}
                                            <span className="w-[18px] h-[18px] block">
                                                
                                            </span>
                                            <span>Experts</span>
                                        </div>
                                    </div>
                                </div>
                                <div>        
                                    Sezar EA was tested and has successfully passed the stress test with slippage and commission approximate to the real market conditions
                                    using real ticks  quality in a period of 22 years. The Expert Advisor contains the algorithm of statistics collection and slippage control
                                    with complete statistics control; this  information is   used to protect you from broker’s tricks. Sezar EA controls the quality of the
                                    broker execution before placing an order and It also has successfully passed strict criter
                                </div>
                            </div>
                            <p className='border-t text-center cursor-pointer p-2 w-full font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>${item?.price} <span>USD</span></p>
                        </div>
                    </div>
                    <Link to={`/market/detail/`}>
                        <div className='text-center border'>
                            <div className="flex justify-center  w-full" > <img src={ea} alt='avata-product' /></div>
                           
                            <p className='p-1 font-semibold'>{item?.name}</p>
                            <div className='flex items-center justify-center p-[10px]'>
                                {[1,2,3,4,5]?.map((i) => {
                                    return <img id={i} alt='icon-star' src={star} className="w-[10px] h-[10px]" />
                                })} 
                            </div>
                            <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>${item?.price} <span>USD</span></p>
                        </div>
                    </Link>
                </div>
                </>
              }
            />
          </List.Item>
        )
      }

    return (
        <>
            <div className='max-w-screen-2xl items-center mx-auto pt-10'>
            <div className='grid grid-cols-12'>
                <div className='hidden sm:block col-span-2 border'>
                    <div className='pr-5 py-10 pl-5'>
                        {MenuItem?.map((item) => {
                            const children = item?.children
                            return(
                                <div id={item?.id}>
                                    <p className='flex'>
                                        <img alt='icon-menu' src={bank} className="h-5 w-5" /> <span className='pl-2'>{item?.name}</span>
                                    </p>
                                    {children && children?.map((i) => {
                                        return (
                                            <p className='flex pl-4 pt-3'>
                                                <img alt='icon-menu' src={bank} className="h-5 w-5" /> <span className='pl-2'>{i?.name}</span>
                                            </p>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <div className='pr-5 py-5 pl-5 border-t'>
                        <p className='flex items-center'><img alt='icon-menu' src={bank} className="h-5 w-5" /><span className='pl-4'>Watch the Market tutorial videos on YouTube</span></p>
                        <p className='flex pt-5 items-center'><img alt='icon-menu' src={bank} className="h-5 w-5" /><span className='pl-4'>How to buy а trading robot or an indicator</span></p>
                        <p className='flex pt-5 items-center'><img alt='icon-menu' src={bank} className="h-5 w-5" /><span className='pl-4'>Run your EA on virtual hosting</span></p>
                    </div>
                </div>
                <div className='col-span-10 border w-full'>         
                    <div className='p-5 flex'>
                        <input type="text" name="search" className='block w-full border p-2' placeholder='Search'/>
                        <select className='border'>
                            <option value="" className='font-semibold' selected>MetaTrader 5</option>
                            <option value="" className='font-semibold'>MetaTrader 4</option>
                        </select>
                    </div>
                    <p className='font-semibold p-5 text-2xl'>MetaTrader 5</p>
                    <List
                        className='ml-[20px]'
                        grid={{ gutter: 20, xs: 2, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }}
                        //loading={loading}
                        itemLayout="horizontal"
                        dataSource={Products}
                        renderItem={renderItemTrader5}
                    />
                    <p className='font-semibold p-5 text-2xl'>MetaTrader 4</p>
                    <List
                        className='ml-[20px]'
                        grid={{ gutter: 20, xs: 2, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }}
                        //loading={loading}
                        itemLayout="horizontal"
                        dataSource={Products}
                        renderItem={renderItemTrader4}
                    />
                </div>
            </div>
        </div>
        </>
        
    );
};
