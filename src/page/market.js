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
                 <Link to={`/market/detail/`}>
                    <div className='text-center border'>
                        <div className="flex justify-center  w-full" ><img alt='avata-product' src={ae}  /></div>
                        <p className='p-1 font-semibold'>{item?.name}</p>
                        <div className='flex items-center justify-center p-5'>
                            {[1,2,3,4,5]?.map((i) => {
                                return <img id={i} alt='icon-star' src={star} className="h-4 w-4 ml-1" />
                            })}   
                        </div>
                        <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>${item?.price} <span>USD</span></p>
                    </div>
                </Link>
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
                    <Link to={`/market/detail/`}>
                        <div className='text-center border'>
                            <div className="flex justify-center  w-full" > <img src={ea} alt='avata-product' /></div>
                           
                            <p className='p-1 font-semibold'>{item?.name}</p>
                            <div className='flex items-center justify-center p-5'>
                                {[1,2,3,4,5]?.map((i) => {
                                    return <img id={i} alt='icon-star' src={star} className="h-4 w-4 ml-1" />
                                })} 
                            </div>
                            <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>${item?.price} <span>USD</span></p>
                        </div>
                    </Link>
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
                        grid={{ gutter: 20, xs: 1, sm: 1, md: 4, lg: 4, xl: 6, xxl: 6 }}
                        //loading={loading}
                        itemLayout="horizontal"
                        dataSource={Products}
                        renderItem={renderItemTrader5}
                    />
                    <p className='font-semibold p-5 text-2xl'>MetaTrader 4</p>
                    <List
                        className='ml-[20px]'
                        grid={{ gutter: 20, xs: 1, sm: 1, md: 4, lg: 4, xl: 6, xxl: 6 }}
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