import { Button, Checkbox, Col, Divider, Dropdown, Form, Input, List, Row, Select, Spin, Tabs, message, DatePicker } from "antd";
import { IconSignal } from "../../utils/iconSignal";
import dayjsInstance from "../../utils/dayjs";
import logo from "../../component/image/logo_black.png"
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axios";
import { DecimalNumber, FormatDollar } from "../../utils/format";
import { useCookies } from "react-cookie";
import check_icon from "../../component/image/icon/check.png"
import { plainOptions } from "../../helper";
import dayjs from "dayjs";
import SuperComputer from "../../utils/superComputer";
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

export default function TradingSymtem() {
    const [signalOpen, setSignalOpen] = useState([]);
    const [trading, setTrading] = useState([]);
    const [tradingSystem, setTradingSystem] = useState(1);
    const [symbolApi, setSymbolApi] = useState([]);
    const [dataSuper, setDataSuper] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['admin']);
    const [form] = Form.useForm();
    
    const [checkedList, setCheckedList] = useState([]);
    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list) => {
        setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };
    
    const getAllTradingSystem = async () => {
        await axiosInstance.get(`/tradingSystem/getAllTradingSystem`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setTrading(data);
            });
    };    

    const getAllSymbol = async (symbol) => {
        await axiosInstance
            .get(`/symbol/getAll`)
            .then((res) => {
                const data = res?.data;
                setSymbolApi(data);
            })
            .catch(() => message.error("Error server!"));
    }

    const getSignalOpen = async (tradingSystem, checkedList) => {
        const list = "('" + checkedList.join("','") + "')";
        await axiosInstance.get(`/tradingSystem/getSignalOpenByAdmin`, {params: {
            trading_system: tradingSystem,
            symbol_condition: list
        }})
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                const data = res?.data;
                setSignalOpen(data);
            });
    };

    const updateStatus = async (trading_system_id) => {
        await axiosInstance.post(`/tradingSystem/updateStatus/${trading_system_id}`)
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                message.success(String(res?.data?.message));
            });
    };

    const closeSignal = async (trading_system_id, pips) => {
        await axiosInstance.post(`/tradingSystem/closeSignal/${trading_system_id}`, {
                pips: pips
            })
            .catch(function (error) {
                message.error(error.response.status);
            })
            .then(( res ) => {
                message.success(String(res?.data?.message));
            });
    };

    const onSubmit = async (values) => {

        await axiosInstance
          .get(`/tradingSystem/getProfitByDate`, {params: {
            trading_system: values?.trading_system,
            symbol: values?.symbol,
            date_start: dayjs(values?.time[0]).format("YYYY/MM/DD"),
            date_end: dayjs(values?.time[1]).format("YYYY/MM/DD")
          }})
          .then((res) => {
            const data = {
                trading_system: values?.trading_system,
                symbol: values?.symbol,
                profit: res?.data[0]?.total_profit,
                volume: values?.volume,
                date_start: dayjs(values?.time[0]).format("YYYY/MM/DD"),
                date_end: dayjs(values?.time[1]).format("YYYY/MM/DD")
            }
            setDataSuper(data);
          })
          .catch(({ response }) => {
            message.error(String(response?.data?.message));
          });
    };
     
    useEffect(() => { 
        getAllTradingSystem();
        getAllSymbol();
    }, []);
        
    useEffect(() => { 
        const interval = setInterval(async () => {
            try {
                if(checkedList.length > 0) {
                    await getSignalOpen(tradingSystem, checkedList);
                } else {
                    await getSignalOpen(tradingSystem, plainOptions);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [signalOpen, tradingSystem, checkedList]);

    return (
        <>
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex justify-between py-10">
                    <div className="flex">
                        {trading?.map((_, i) => (
                            <div 
                                className={`${_?.trading_system === tradingSystem ? "bg-gray-200" : ""} px-5 py-2 mx-1 border hover:bg-gray-200 hover:cursor-pointer`} 
                                onClick={()=>setTradingSystem(_?.trading_system)}
                            >
                                <p className="float-start font-semibold text-xl">Trading System {_?.trading_system}</p>
                            </div>
                        ))}
                    </div>
                
                    <div>
                        <Dropdown
                            dropdownRender={() => (
                                <div className="flex justify-center">
                                    <div className="bg-slate-50 w-[900px] mt-3 p-5 rounded-xl drop-shadow-md">
                                        <Form
                                            layout={"vertical"}
                                            colon={false}
                                            form={form}
                                            onFinishFailed={(e) => console.log(e)}
                                            onFinish={onSubmit}
                                        >
                                            <div className="grid grid-cols-3">
                                                <Form.Item
                                                    label="Trading System"
                                                    name="trading_system"
                                                    style={{paddingRight: 5}}
                                                    rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                                                >
                                                    <Select
                                                        size="large"
                                                        placeholder="Select trading system"
                                                        optionFilterProp="children"
                                                        options={trading.map((_,i)=>({
                                                            value: _?.trading_system,
                                                            label: "Trading system " + _?.trading_system,
                                                        }))}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Symbol"
                                                    name="symbol"
                                                    style={{paddingLeft: 5, paddingRight: 5}}
                                                    rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                                                >
                                                    <Select
                                                        size="large"
                                                        placeholder="Select a symbol"
                                                        optionFilterProp="children"
                                                        options={symbolApi?.map((_,i)=>({
                                                            value: _?.symbol,
                                                            label: _?.symbol,
                                                        }))}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Budget"
                                                    name="budget"
                                                    style={{paddingLeft: 5}}
                                                    rules={[{ required: true, message: "Vui lòng nhập budget!" }]}
                                                >
                                                    <Input type="number" size="large" placeholder={"Budget"} />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Thời gian"
                                                    name="time"
                                                    className="col-span-2"
                                                    rules={[{ required: true, message: "Vui lòng chọn khoảng thời gian!" }]}
                                                >
                                                    <RangePicker size="large" className="w-content"/>
                                                </Form.Item>

                                                <Form.Item
                                                    label="Volume"
                                                    name="volume"
                                                    rules={[{ required: true, message: "Vui lòng nhập volume!" }]}
                                                >
                                                    <Input type="number" size="large" placeholder={"volume"} />
                                                </Form.Item>
                                            </div>

                                            <Button type={"primary"} htmlType={"submit"}>
                                                Tính toán
                                            </Button>
                                            <Button 
                                                type={"primary"} 
                                                style={{marginLeft: 10}} 
                                                onClick={()=> {
                                                    form.resetFields(); 
                                                    setDataSuper([])
                                                }}
                                            >
                                                Làm mới
                                            </Button>
                                        </Form>
                                        {Object.keys(dataSuper).length > 0 && (
                                            <div className="grid grid-cols-6 pb-5 pt-10 text-center text-lg font-semibold">
                                                <div>
                                                    <li className="bg-blue-200 py-2">Trading System</li>
                                                    <li className="border py-2">{dataSuper?.trading_system}</li>
                                                </div>
                                                <div>
                                                    <li className="bg-blue-200 py-2">Symbol</li>
                                                    <li className="border py-2">{dataSuper?.symbol}</li>
                                                </div>
                                                <div>
                                                    <li className="bg-blue-200 py-2">Date Start</li>
                                                    <li className="border py-2">{dataSuper?.date_start}</li>
                                                </div>
                                                <div>
                                                    <li className="bg-blue-200 py-2">Date End</li>
                                                    <li className="border py-2">{dataSuper?.date_end}</li>
                                                </div>
                                                <div>
                                                    <li className="bg-blue-200 py-2">Profit (pips)</li>
                                                    <li className="border py-2">{dataSuper?.profit ? DecimalNumber(dataSuper?.profit, 2) : 0}</li>
                                                </div>
                                                <div>
                                                    <li className="bg-blue-200 py-2">Profit ($)</li>
                                                    <SuperComputer 
                                                        symbol={dataSuper?.symbol}
                                                        pips={dataSuper?.profit}
                                                        volume={dataSuper?.volume} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            placement="bottomLeft"
                            trigger={['click']}
                        >
                            <button className="float-end border px-5 py-2 rounded-full font-semibold text-xl hover:bg-blue-500 hover:text-white mr-5">
                                Siêu Máy Tính
                            </button>
                        </Dropdown>
                        <Dropdown
                            dropdownRender={() => (
                                <div className="flex justify-center">
                                    <div className="bg-slate-50 w-[500px] mt-3 p-5 rounded-xl drop-shadow-md">
                                        <Checkbox 
                                            indeterminate={indeterminate} 
                                            onChange={onCheckAllChange} 
                                            checked={checkAll}
                                        >
                                            Hiển thị tất cả cặp tiền
                                        </Checkbox>
                                        <Divider />
                                        <CheckboxGroup
                                            options={plainOptions} 
                                            value={checkedList} 
                                            onChange={onChange} 
                                        />
                                    </div>
                                </div>
                            )}
                            placement="bottom"
                            trigger={['click']}
                        >
                            <button className="float-end border px-5 py-2 rounded-full font-semibold text-xl hover:bg-blue-500 hover:text-white mr-5">
                                Cặp Tiền Hiển Thị
                            </button>
                        </Dropdown>
                    </div>
                </div>

                {signalOpen?.map((_, i)=> (
                    <>
                        <div className="flex justify-between items-center">
                            <p className="float-start font-bold text-2xl">Trading System {_?.tradingSystem}</p>
                            {/* <div>
                                <button className="float-end border px-5 py-2 rounded-full font-semibold text-xl hover:bg-blue-500 hover:text-white">
                                    Siêu Máy Tính
                                </button>
                                <Dropdown
                                    dropdownRender={() => (
                                        <div className="flex justify-center">
                                            <div className="bg-white w-[500px] mt-3 p-5 rounded-xl drop-shadow-md">
                                                <Checkbox 
                                                    indeterminate={indeterminate} 
                                                    onChange={onCheckAllChange} 
                                                    checked={checkAll}
                                                >
                                                    Hiển thị tất cả cặp tiền
                                                </Checkbox>
                                                <Divider />
                                                <CheckboxGroup
                                                    options={plainOptions} 
                                                    value={checkedList} 
                                                    onChange={onChange} 
                                                />
                                            </div>
                                        </div>
                                    )}
                                    placement="bottom"
                                    trigger={['click']}
                                >
                                    <button className="float-end border px-5 py-2 rounded-full font-semibold text-xl hover:bg-blue-500 hover:text-white mr-5">
                                        Cặp Tiền Hiển Thị
                                    </button>
                                </Dropdown>
                            </div> */}
                        </div>
                        <div className="py-10 border mb-10 mt-5 grid grid-cols-12"> 
                            <div></div>
                            <div className="grid col-span-2 pb-10">
                                <p className="font-semibold text-xl text-center">M15</p>
                            </div>
                            <div className="grid col-span-2">
                                <p className="font-semibold text-xl text-center">M30</p>
                            </div>
                            <div className="grid col-span-2">
                                <p className="font-semibold text-xl text-center">H1</p>
                            </div>
                            <div className="grid col-span-2">
                                <p className="font-semibold text-xl text-center">H4</p>
                            </div>
                            <div className="grid col-span-2">
                                <p className="font-semibold text-xl text-center">Daily</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xl text-center">Thống kê</p>
                            </div>
                            {_?.data.map((_,i)=> (
                                <>
                                    <div className="flex items-center justify-center mb-10">
                                        <div>
                                        <p className="text-center font-bold text-[#004AAD] text-xl">{_?.symbol}</p>
                                            <p className="text-center font-bold text-lg">${_?.price}</p>
                                            <p className="text-center font-semibold text-green-600 text-sm">
                                                {_?.change_price > 0 ? "+"+ _?.change_price : _?.change_price}%
                                            </p>
                                        </div>
                                    </div>

                                    {_?.data.map((_,i)=> (
                                        <>
                                            {_?.value !== null ? (
                                                <div className={`grid col-span-2 mx-2 border border-t-4 border-slate-500 hover:bg-white mb-10 ${_?.type === "BUY" ? "border-t-green-600" : "border-t-red-600"}`}>
                                                    <div className="border-b border-b-slate-500 border-x-slate-500 p-2">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center">
                                                                <p className={`${_?.type === "BUY" ? "bg-green-500" : "bg-red-500"} font-semibold text-white text-xs w-min py-1 px-1 rounded-lg`}>
                                                                    {_?.type}
                                                                </p>
                                                                <p className="pl-2 font-semibold text-black text-xs">{_?.symbol}</p>
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-center">
                                                                    {IconSignal(_?.symbol)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <p className="text-xs">ID: {_?.ticket}</p>
                                                            <p className="font-medium text-xs text-gray-700">{dayjsInstance(_?.create_at).format("DD/MM/YYYY hh:mm:ss")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full p-2 relative">
                                                        <div className="flex justify-center opacity-10">
                                                            <img src={logo} className="h-[120px]" alt="Logo" />
                                                        </div>
                                                        <div className="absolute flex items-center top-2 left-2 w-full">
                                                            <div className="w-1/2">
                                                                <p className="text-sm font-bold pb-1">Entry: <span className="font-normal pl-2">{_?.price}</span></p>
                                                                <p className="text-sm font-bold flex items-center pb-1">
                                                                    Tp1: <span className="font-normal pl-2">{_?.tp1}</span>
                                                                    {_?.time_tp1 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                                </p>
                                                                <p className="text-sm font-bold flex items-center pb-1">
                                                                    Tp2: <span className="font-normal pl-2">{_?.tp2}</span>
                                                                    {_?.time_tp2 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                                </p>
                                                                <p className="text-sm font-bold flex items-center pb-1">
                                                                    Tp3: <span className="font-normal pl-2">{_?.tp3}</span>
                                                                    {_?.time_tp3 ? (<img src={check_icon} className="h-5 ml-1"/>) : (<Spin style={{marginLeft: 5}}/>)}
                                                                </p>
                                                                <p className="text-sm font-bold">SL: <span className="font-normal pl-2">{_?.sl_show}</span></p>
                                                            </div>
                                                            <div className="px-2 py-1 bg-cyan-100">
                                                                <p>P&L (Pips)</p>
                                                                <p className="text-xl font-bold text-emerald-500 text-center">
                                                                    {_?.type === "BUY" ?
                                                                        DecimalNumber((((_?.price_symbol - _?.price) / _?.point_symbol) / 10), 2) :
                                                                        DecimalNumber((((_?.price - _?.price_symbol) / _?.point_symbol) / 10), 2)
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center pb-2">
                                                            {_?.status == 0 && cookies?.admin && (
                                                                <Button type="primary" className="w-20" onClick={()=>updateStatus(_?.trading_system_id)}>
                                                                    Hiển Thị
                                                                </Button>
                                                            )}
                                                            {cookies?.admin && (
                                                                <Button 
                                                                    type="primary" 
                                                                    className="ml-2" 
                                                                    onClick={()=>{
                                                                        closeSignal(
                                                                            _?.trading_system_id, 
                                                                            _?.type === "BUY" ? 
                                                                                DecimalNumber((((_?.price_symbol - _?.price) / _?.point_symbol) / 10), 2) :
                                                                                DecimalNumber((((_?.price - _?.price_symbol) / _?.point_symbol) / 10), 2)
                                                                        )
                                                                    }} 
                                                                    danger
                                                                >
                                                                    Close lệnh
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className="grid col-span-2 mx-2 border border-t-4 border-t-red-600 border-slate-500 hover:bg-white flex items-center mb-10">
                                                    <Spin tip="Đang cập nhật" size="large">
                                                        <div className="h-full">
                                                        </div>
                                                    </Spin>
                                                </div>
                                            )
                                            }
                                            
                                        </>
                                    ))}

                                    <div className="flex items-center justify-center mb-10">
                                        <div>
                                            <div className=" py-1 px-2 text-center m-2">
                                                <p className="text-sm font-semibold">Lời lỗ:</p>
                                                <p className="font-semibold text-lg text-emerald-500">{_?.pips ? DecimalNumber(_?.pips, 2) : "Null"}</p>
                                            </div>
                                            <div className=" py-1 px-2 text-center m-2">
                                                <p className="text-sm font-semibold">Tuần trước:</p>
                                                <p className="font-semibold text-lg text-emerald-500">{_?.pips_week ? DecimalNumber(_?.pips_week, 2) : "Null"}</p>
                                            </div>
                                            <div className=" py-1 px-2 text-center m-2">
                                                <p className="text-sm font-semibold">Tháng trước:</p>
                                                <p className="font-semibold text-lg text-emerald-500">{_?.pips_month ? DecimalNumber(_?.pips_month, 2) : "Null"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}