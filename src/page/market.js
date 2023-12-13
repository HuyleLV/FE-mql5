import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  bank  from "../component/image/bank.png";
import  ae  from "../component/image/ae.png";
import  ea  from "../component/image/ea.png";
import  star  from "../component/image/star.png";


export default function Market() {

    useEffect(() => {
        
    });

    return (
        <div className='max-w-screen-2xl items-center mx-auto pt-10'>
            <div className='grid grid-cols-12'>
                <div className='col-span-2 border'>
                    <div className='pr-5 py-10 pl-5'>
                        <p className='flex'>
                            <img src={bank} class="h-5 w-5" /> <span className='pl-2'>MetaTrader 5</span>
                        </p>
                            <p className='flex pl-4 pt-3'>
                                <img src={bank} class="h-5 w-5" /> <span className='pl-2'>Experts</span>
                            </p>
                            <p className='flex pl-4 pt-3'>
                                <img src={bank} class="h-5 w-5" /> <span className='pl-2'>Indicators</span>
                            </p>
                            <p className='flex pl-4 pt-3'>
                                <img src={bank} class="h-5 w-5" /> <span className='pl-2'>Libraries</span>
                            </p>
                            <p className='flex pl-4 pt-3'>
                                <img src={bank} class="h-5 w-5" /> <span className='pl-2'>Utilities</span>
                            </p>
                        <p className='flex pt-3'>
                            <img src={bank} class="h-5 w-5" /> <span className='pl-2'>MetaTrader 4</span>
                        </p>
                            <p className='flex pl-4 pt-3'>
                                <img src={bank} class="h-5 w-5" /> <span className='pl-2'>Experts</span>
                            </p>
                            <p className='flex pl-4 pt-3'>
                                <img src={bank} class="h-5 w-5" /> <span className='pl-2'>Indicators</span>
                            </p>
                            <p className='flex pl-4 pt-3'>
                                <img src={bank} class="h-5 w-5" /> <span className='pl-2'>Libraries</span>
                            </p>
                            <p className='flex pl-4 pt-3'>
                                <img src={bank} class="h-5 w-5" /> <span className='pl-2'>Utilities</span>
                            </p>
                        <p className='flex pt-3'>
                            <img src={bank} class="h-5 w-5" /> <span className='pl-2'>MetaTrader 4</span>
                        </p>
                        <p className='flex pt-3'>
                            <img src={bank} class="h-5 w-5" /> <span className='pl-2'>MetaTrader 4</span>
                        </p>
                    </div>
                    <div className='pr-5 py-5 pl-5 border-t'>
                        <p className='flex items-center'><img src={bank} class="h-5 w-5" /><span className='pl-4'>Watch the Market tutorial videos on YouTube</span></p>
                        <p className='flex pt-5 items-center'><img src={bank} class="h-5 w-5" /><span className='pl-4'>How to buy а trading robot or an indicator</span></p>
                        <p className='flex pt-5 items-center'><img src={bank} class="h-5 w-5" /><span className='pl-4'>Run your EA on virtual hosting</span></p>
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

                    <div className='flex grid grid-cols-12'>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ae} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <p className='font-semibold p-5 text-2xl'>MetaTrader 4</p>

                    <div className='flex grid grid-cols-12'>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ea} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ea} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ea} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ea} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ea} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ea} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-2 w-[220px] p-5'>
                            <Link to="/market/detail">
                                <div className='text-center border'>
                                    <img src={ea} class="h-50 w-50" />
                                    <p className='p-1 font-semibold'>Quantum Emperor MT5</p>
                                    <div className='flex items-center justify-center p-5'>
                                        <img src={star} class="h-4 w-4" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                        <img src={star} class="h-4 w-4 ml-1" />
                                    </div>
                                    <p className='border-t p-2 font-bold text-[#42639c] hover:bg-[#42639c] hover:text-white'>599.99 <span>USD</span></p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};