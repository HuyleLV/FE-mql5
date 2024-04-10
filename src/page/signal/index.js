import React, { useEffect, useState } from "react";
import { Form, Input, Button, Image, Row, Col, Space, Table, Pagination, message, Tabs, Select, Dropdown } from "antd";
import { useCookies } from "react-cookie";
import axios from "axios";
import dayjsInstance from "../../utils/dayjs";
import { CustomUpload } from "../../component";
import TabPane from "antd/es/tabs/TabPane";
import { useLocation, useNavigate } from "react-router-dom";
import SearchProps from "../../component/SearchProps";
import icon_master from "../../component/image/icon/icon_market.svg"
import { CheckOutlined, FilterOutlined, SmileOutlined } from "@ant-design/icons";
import logo from "../../component/image/logo.png"
import flag_england from "../../component/image/flag_england.png"
import CreateMasterKey from "../../component/createMasterKey";
import { IconSignal } from "../../utils/iconSignal";

export default function SignalPage() {
  const [cookies] = useCookies(["user"]);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [signal, setSignal] = useState([]);
  const [totalSignal, setTotalSignal] = useState([]);
  const [allMaster, setAllMaster] = useState([]);
  const [masterKey, setMasterKey] = useState([]);
  const [masterKeyName, setMasterKeyName] = useState("");
  const [topMaster, setTopMaster] = useState([]);
  const [follower, setFollower] = useState([]);
  const [signalHot, setSignalHot] = useState([]);
  const [messCheck, setMessCheck] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 8,
  });
  const [paginationSignal, setPaginationSignal] = useState({
    page: 1,
    pageSize: 8,
  });

  const type = Form.useWatch('type', form);
  const price = Form.useWatch('price', form);
  const take_profit = Form.useWatch('take_profit', form);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  
  const fetchProfile = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/user/getByEmail/${cookies.user?.email}`
      )
      .then(({ data }) => {
        if (data) setProfile({ ...data?.[0] });
      });
  };

  const getSignal = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/signal/getByMasterKey/${masterKeyName?.master_key}`, {params: paginationSignal})
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        setSignal(data);
      });
  };

  const getAllHot = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/signalHot/getAllHot`)
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        setSignalHot(data);
      });
  };

  const getAllByUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/masterLicense/getAllByUser/${cookies.user?.user_id}`)
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        setAllMaster(data);
      });
  };

  const getFollowerbyMasterKey = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/follower/getbyMasterKey/${masterKeyName?.master_key}`, {params: pagination})
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        setFollower(data);
      });
  };

  const checkMasterKey = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/masterLicense/checkMasterKey/${masterKeyName?.master_key}`);
    if(data?.data[0]?.active_status === 1){
      if(dayjsInstance(data?.data[0]?.exprice_date) > dayjsInstance(new Date())){
        setMasterKey(data?.data[0]);
        message.success("Đăng nhập master thành công!");
      } else {
        setMessCheck("Master đã hết hạn sử dụng!");
        setMasterKey([]);
        const status = {
          master_license_id: data?.data[0].master_license_id,
          active_status: 0
        }

        await axios
          .post(`${process.env.REACT_APP_API_URL}/masterLicense/checkExpriceDate`, status)
          .catch(() => message.error("Error server!"));
        
      }
    } else if(data?.data[0]?.active_status === 0) {
      setMessCheck("Master đã hết hạn sử dụng!");
      setMasterKey([]);
    } else {
      setMessCheck("Account này chưa có master!");
    }
  }

  const getTotalByMasterKey = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/signal/getTotalByMasterKey/${masterKeyName?.master_key}`)
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        setTotalSignal(data);
      });
  };

  const getTopMaster = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/signal/getAllTopMaster`)
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        setTopMaster(data);
      });
  };

  useEffect(() => {
    if (Object.keys(profile)?.length > 0) {
      form.resetFields();
    }
  }, [form, profile]);

  useEffect(() => { 
    if(!cookies?.user && currentPath?.includes('/signal')){ 
      message.warning("Vui lòng đăng nhập!")
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, [pagination, cookies]);

  useEffect(() => { 
    checkMasterKey();
    getTopMaster();
    getAllHot();
    getAllByUser();
    if(masterKeyName?.master_key) {
      getSignal();
      getFollowerbyMasterKey();
      getTotalByMasterKey();
    }
  }, [masterKeyName?.master_key, paginationSignal, pagination]);

  const updateStatus =  async (values) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/signal/updateStatus/${values}`)
      .finally(() => {
        fetchProfile();
        message.success("Cập nhật trạng thái thành công !");
        getSignal();
      });
  }

  const onSendSignal = async (values) => {
    try {
      const merge = {
        ...values,
        master_key: masterKeyName?.master_key,
        type_input: 0
      }
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/signal/create`,
          merge
        )
        .finally(() => {
          message.success("Gửi lệnh thành công !");
          getSignal();
          form.resetFields();
        });
    } catch (error) {
      message.error(error);
    }
  }

  const columnFollower = [
    {
      title: <div>ID</div>,
      key: "follower_license_id",
      dataIndex: "follower_license_id",
      width: 50,
      sorter: (a, b) => a.follower_license_id - b.follower_license_id,
      render: (_, record) => <div>{record?.follower_license_id}</div>,
    },
    {
      title: <div>client_key</div>,
      key: "client_key",
      dataIndex: "client_key",
      width: 50,
      ...SearchProps("client_key"),
      render: (_, record) => <div>{record?.client_key}</div>,
    },
    {
      title: <div>master_key</div>,
      key: "master_key",
      dataIndex: "master_key",
      width: 50,
      render: (_, record) => <div>{record?.master_key}</div>,
    },
    {
      title: <div>start_date</div>,
      key: "start_date",
      dataIndex: "start_date",
      width: 50,
      render: (_, record) => <div>{dayjsInstance(record?.start_date).format("DD/MM/YYYY hh:mm:ss")}</div>,
    },
    {
      title: <div>expire_date</div>,
      key: "expire_date",
      dataIndex: "expire_date",
      width: 50,
      render: (_, record) => <div>{dayjsInstance(record?.expire_date).format("DD/MM/YYYY hh:mm:ss")}</div>,
    },
    {
      title: <div>mt4_acc</div>,
      key: "mt4_acc",
      dataIndex: "mt4_acc",
      width: 50,
      render: (_, record) => <div>{record?.mt4_acc}</div>,
    },
    {
      title: <div>brocker</div>,
      key: "brocker",
      dataIndex: "brocker",
      width: 50,
      render: (_, record) => <div>{record?.brocker}</div>,
    },
    {
      title: <div>Ngày tạo</div>,
      key: "create_at",
      dataIndex: "create_at",
      width: 50,
      render: (_, record) => <div>{dayjsInstance(record?.create_at).format("DD/MM/YYYY hh:mm:ss")}</div>,
    },
    {
      title: <div>Ngày cập nhật</div>,
      key: "update_at",
      dataIndex: "update_at",
      width: 50,
      render: (_, record) => <div>{dayjsInstance(record?.update_at).format("DD/MM/YYYY hh:mm:ss")}</div>,
    }
  ]

  const columnSignal = [
    {
      title: <div>ID</div>,
      key: "signal_id",
      dataIndex: "signal_id",
      width: 50,
      render: (_, record) => <div>{record?.signal_id}</div>,
    },
    {
      title: <div>Master Key</div>,
      key: "master_key",
      dataIndex: "master_key",
      width: 50,
      render: (_, record) => <div>{record?.master_key}</div>,
    },
    {
      title: <div>Type</div>,
      key: "type",
      dataIndex: "type",
      width: 50,
      render: (_, record) => <div>{record?.type}</div>,
    },
    {
      title: <div>symbol</div>,
      key: "symbol",
      dataIndex: "symbol",
      width: 50,
      render: (_, record) => <div>{record?.symbol}</div>,
    },
    {
      title: <div>Giá</div>,
      key: "price",
      dataIndex: "price",
      width: 50,
      render: (_, record) => <div>{record?.price}</div>,
    },
    {
      title: <div>take_profit</div>,
      key: "take_profit",
      dataIndex: "take_profit",
      width: 50,
      render: (_, record) => <div>{record?.take_profit}</div>,
    },
    {
      title: <div>stop_loss</div>,
      key: "stop_loss",
      dataIndex: "stop_loss",
      width: 50,
      render: (_, record) => <div>{record?.stop_loss}</div>,
    },
    {
      title: <div className="text-center">Trạng thái lệnh</div>,
      key: "signal_status",
      dataIndex: "signal_status",
      width: 50,
      render: (_, record) => 
      record?.signal_status === 1 ?
        <div className="flex justify-center text-center">
          <Button type={"primary"} onClick={()=>updateStatus(record?.signal_id)}>
            Close 
          </Button>
        </div> 
      : 
        <div>
          <p className="text-center">close</p>
        </div> 
      ,
    },
    {
      title: <div>Ngày tạo</div>,
      key: "create_at",
      dataIndex: "create_at",
      width: 50,
      render: (_, record) => <div>{dayjsInstance(record?.create_at).format("DD/MM/YYYY hh:mm:ss")}</div>,
    },
    {
      title: <div>Ngày cập nhật</div>,
      key: "update_at",
      dataIndex: "update_at",
      width: 50,
      render: (_, record) => <div>{dayjsInstance(record?.update_at).format("DD/MM/YYYY hh:mm:ss")}</div>,
    },
  ]

  return (
    <div className="my-[60px] max-w-screen-2xl mx-auto">
      <Row className="flex items-center p-[20px] my-10 border border-[var(--mid-gray)] rounded bg-gradient-to-r from-slate-800 to-blue-700 text-white">
        <Col xs={24} xl={6}>
          <div className="flex items-center justify-center">
              <img src={icon_master} style={{width: 100}}/>
              <p className="font-bold text-2xl pl-2">Master Trade</p>
          </div>
        </Col>
        <Col xs={24} xl={12} >
        <div className="flex justify-center">
            <div className="flex items-center px-5">
            <CheckOutlined className="bg-green-400 p-2 rounded-full font-bold text-xl"/>
            <p className="pl-2 font-semibold text-lg">Đăng ký<br/> miễn phí</p>
            </div>
            <div className="flex items-center px-5">
            <CheckOutlined className="bg-green-400 p-2 rounded-full font-bold text-xl"/>
            <p className="pl-2 font-semibold text-lg">Sử dụng indicator<br/> độc quyền</p>
            </div>
            <div className="flex items-center px-5">
            <CheckOutlined className="bg-green-400 p-2 rounded-full font-bold text-xl"/>
            <p className="pl-2 font-semibold text-lg">Đo lường giao dịch<br/> chuyên nghiệp</p>
            </div>
        </div>
        </Col>
        <Col xs={24} xl={6}>
          {profile?.kyc === 0 ? 
            <div className="flex justify-center w-full">
              <p className="font-semibold bg-yellow-500 px-5 py-2 w-[200px] rounded-full text-center">Bạn phải KYC để được xử dụng chức năng này!</p> 
            </div>
            : 
            <div className="flex justify-center w-full">
              <CreateMasterKey allMaster={allMaster}/>
            </div>
          }
        </Col>
      </Row>
      
      <Row justify={"center"} align={"middle"} className="border-b-2">
      {profile?.kyc === 1 ?
        <>
          <Col xs={24} xl={10}>
              <div className="flex border-r-2 p-2">
                <Image
                  preview={false}
                  src={profile?.photos}
                  width={150}
                  height={150}
                />
                <div className="pl-5">
                  <p className="text-[20px] font-none">My name: <span className="text-[22px] font-medium">{profile?.displayName}</span></p>
                  <p className="text-[20px] font-none">Email: <span className="text-[22px] font-medium">{profile?.email}</span></p>
                  {masterKeyName?.master_key && (
                    <p className="text-[20px] font-none">My master Key: <span className="text-[22px] font-medium">{masterKeyName?.master_key}</span></p>
                  )}
                  {masterKeyName?.private_key && (
                    <p className="text-[20px] font-none">My private key: <span className="text-[22px] font-medium">{masterKeyName?.private_key}</span></p>
                  )}
                  {masterKeyName?.description && (
                    <>
                      <p className="text-[20px] font-none">Thông tin: </p>
                      <p className="text-[22px] font-medium">{masterKeyName?.description}</p>
                    </>
                  )}
                </div>
              </div>
          </Col>
          <Col xs={24} xl={14}>
            <div className="p-2 pl-5 text-black">
              <div className="flex justify-between">
                <p className="text-xl font-bold pb-5 float-start h-full">Thống kê giao dịch</p>
                <Dropdown
                  trigger={['click']}
                  dropdownRender={(menu) => (
                    <div className="shadow-lg w-full p-5 rounded-xl bg-white">
                      {allMaster?.map((_, index) => (
                        <p className="my-1 text-lg border-b cursor-pointer" onClick={()=> setMasterKeyName(_)}>{_?.master_key} - {_?.master_key_name}</p>
                      ))}
                    </div>
                  )}
                >
                  <button className="bg-blue-600 px-4 h-10 text-lg font-semibold text-white rounded-full">Lựa chọn chiến dịch <FilterOutlined /></button>
                </Dropdown>
              </div>
              <div className="text-xl font-semibold flex">
                <div>
                  <p>Ranking: {totalSignal?.rank ? totalSignal?.rank : "Chưa có rank!"}</p>
                  <p>Tổng signal: {totalSignal?.results?.[0]?.total ? totalSignal?.results?.[0]?.total : 0}</p>
                  <p>
                    Win / Lost: {totalSignal?.results?.[0]?.win ? totalSignal?.results?.[0]?.win : 0} / {totalSignal?.results?.[0]?.loss ? totalSignal?.results?.[0]?.loss : 0}
                  </p>
                </div>
                <div className="pl-10">
                  <p>Win Rate: {totalSignal?.results?.[0]?.win_rate ? totalSignal?.results?.[0]?.win_rate : 0}</p>
                  <p>Profit: {totalSignal?.results?.[0]?.total_profit ? totalSignal?.results?.[0]?.total_profit : 0}</p>
                </div>
              </div>
            </div>
          </Col>
        </>
        :
        <Col xs={24} xl={24}>
          <div className="flex border-b-2 p-2 h-[200px]">
            <Image
              preview={false}
              src={profile?.photos}
              width={150}
              height={150}
            />
            <div className="pl-5">
              <p className="text-[20px] font-none">My name: <span className="text-[22px] font-medium">{profile?.displayName}</span></p>
              <p className="text-[20px] font-none">Email: <span className="text-[22px] font-medium">{profile?.email}</span></p>
            </div>
          </div>
        </Col>
      }
      </Row>
      <Row justify={"center"} align={"middle"}>
          {masterKey?.master_license_id && profile?.kyc === 1 ?
          <>
            <Col
                lg={24}
                xs={24}
                className="p-[20px] mt-5 border border-[var(--mid-gray)] rounded"
            >
            <Tabs type="card">
                <TabPane tab="Quản lý Follower" key="1">
                  <div className="w-full h-full mt-5 pb-2 relative">
                      <Table
                      className={"custom-table pb-[20px]"}
                      dataSource={follower?.data}
                      columns={columnFollower}
                      pagination={false}
                      />
                      <Pagination
                      className="flex justify-center"
                      current={pagination.page}
                      total={follower?.total}
                      pageSize={pagination.pageSize}
                      showSizeChanger
                      onChange={(p, ps)=> {
                          setPagination({
                          page: p,
                          pageSize: ps
                          })
                      }}
                      />
                  </div>
                </TabPane>
                <TabPane tab="Quản lý lệnh" key="2">
                  <div className="w-full h-full mt-5 pb-2 relative">
                      <Table
                        className={"custom-table pb-[20px]"}
                        dataSource={signal?.data}
                        columns={columnSignal}
                        pagination={false}
                      />
                      <Pagination
                        className="flex justify-center"
                        current={paginationSignal.page}
                        total={signal?.total}
                        pageSize={paginationSignal.pageSize}
                        showSizeChanger
                        onChange={(p, ps)=> {
                            setPaginationSignal({
                            page: p,
                            pageSize: ps
                            })
                        }}
                      />
                  </div>
                </TabPane>
                <TabPane tab="Bắn tín hiệu" key="3">  
                  <div className="flex justify-center">
                      <Form
                      layout={"vertical"}
                      colon={false}
                      form={form}
                      onFinishFailed={(e) => console.log(e)}
                      onFinish={onSendSignal}
                      >
                      <Row className="w-[500px]">
                          <Col lg={24} xs={24}>
                          <Form.Item 
                              label={"Type"} 
                              name="type" 
                              rules={[
                              {
                                required: true,
                                message: 'Vui lòng nhập!',
                              },
                              ]}
                          >
                              <Select
                              size="large"
                              placeholder="Nhập"
                              options={[
                                {
                                  value: "buy"
                                },
                                {
                                  value: "sell"
                                }
                              ]}  
                              />
                          </Form.Item>
                          </Col>
                          <Col lg={24} xs={24}>
                          <Form.Item 
                              label="Symbol" 
                              name="symbol"
                              rules={[
                              {
                                required: true,
                                message: 'Vui lòng nhập!',
                              },
                              ]}
                          >
                              <Input size="large" placeholder="Nhập"/>
                          </Form.Item>
                          </Col>
                          <Col lg={24} xs={24}>
                          <Form.Item 
                              label="Price" 
                              name="price"
                              rules={[
                              {
                                required: true,
                                message: 'Vui lòng nhập!',
                              },
                              ]}
                          >
                              <Input size="large" placeholder="Nhập ..."/>
                          </Form.Item>
                          </Col>
                          <Col lg={24} xs={24}>
                          <Form.Item 
                              label="Take profit" 
                              name="take_profit"
                              rules={[
                              {
                                required: true,
                                message: 'Vui lòng nhập!',
                              },
                              {
                                  validator() {
                                  if(type === "buy" && Number(take_profit) < Number(price)){
                                    return Promise.reject(`Giá mua phải lớn hơn ${price}!`);
                                  } else if(type === "sell" && Number(take_profit) > Number(price)){
                                    return Promise.reject(`Giá bán phải bé hơn ${price}!`);
                                  } else {
                                    return Promise.resolve();
                                  }
                                  }
                              }
                              ]}
                          >
                              <Input size="large" />
                          </Form.Item>
                          </Col>
                          <Col lg={24} xs={24}>
                          <Form.Item 
                              label="Stop losss" 
                              name="stop_loss"
                              rules={[
                              {
                                  required: true,
                                  message: 'Vui lòng nhập!',
                              },
                              ]}
                          >
                              <Input size="large"/>
                          </Form.Item>
                          </Col>
                          <Col lg={24} xs={24} >
                          <Button type={"primary"} htmlType={"submit"} className="w-[200px]">
                              <p className="font-bold">Send</p>
                          </Button>
                          </Col>
                      </Row>
                      </Form>
                  </div>
                </TabPane>
            </Tabs>
            </Col>
          </>
          :
            <Col
              xs={24}
              lg={24}
              className="p-[20px] mt-5 border border-[var(--mid-gray)] rounded bg-gradient-to-r from-slate-800 to-blue-700 text-white"
            >
              {masterKeyName ?
                <>
                  <p className="text-center text-2xl font-semibold">{messCheck}</p>
                  <p className="text-center text-xl font-semibold">Vui lòng liên hệ nhân viên tư vấn để gia hạn thêm!</p>
                </>
                : <p className="text-center text-2xl font-semibold">Vui lòng chọn chiến dịch để xem chi tiết!</p>
              }
              
            </Col>
          }
      </Row>
      <div className="pt-10 border-y-2 mt-10">
        <h1 className="font-bold text-2xl py-5">Top Masters</h1>
        <Row className="py-2">
          {topMaster.map((_, i) => (
            <Col xs={24} xl={8} className="mb-10">
              <div className="border rounded mx-10 p-5 shadow text-black">
                <p className="font-semibold text-xl text-center pb-5">Rank: {_?.rank}</p>
                <div className="flex items-center justify-center border-y py-5">
                  <img 
                    src={_?.user?.photos ? _?.user?.photos : "https://cdn-icons-png.flaticon.com/512/848/848006.png"} 
                    className="rounded-full" 
                    style={{width: 50, height: 50}}/>
                  <div className="pl-5">
                    <p className="font-semibold text-lg"> Email: {_?.user?.email ? _?.user?.email : "Admin@gmail.com"}</p>
                    <p className="font-semibold text-lg"> Master key: {_?.user?.master_key}</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg p-2 flex justify-between">Tổng giao dịch: <span>{_?.results[0]?.total ? _?.results[0]?.total : 0}</span></p>
                  <p className="font-semibold text-lg p-2 flex justify-between">Win rate: <span>{_?.results[0]?.win_rate ? _?.results[0]?.win_rate : 0}</span></p>
                  <p className="font-semibold text-lg p-2 flex justify-between">Win: <span>{_?.results[0]?.win ? _?.results[0]?.win : 0}</span></p>
                  <p className="font-semibold text-lg p-2 flex justify-between">Loss: <span>{_?.results[0]?.loss ? _?.results[0]?.loss : 0}</span></p>
                  <p className="font-semibold text-lg p-2 flex justify-between">Tổng profit: <span>{_?.results[0]?.total_profit ? _?.results[0]?.total_profit : 0}</span></p>
                </div>
                <div className="flex justify-center py-2">
                  <a href={"/master/" + _?.user?.master_key}>
                    <button className="py-1 px-4 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-lg font-semibold text-white">
                      Chi tiết
                    </button>
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="pt-10">
        <h1 className="font-bold text-2xl py-5">Top Signals</h1>
        <Row className="py-2">
          {signalHot?.map((_, i) => (
            <Col xs={24} xl={8} className="px-2 mb-5">
              <div className={_?.type === "sell" ? "bg-red-50 hover:bg-white" : "bg-green-50 hover:bg-white"}>
                <div className={`border-t-4 border border-x-slate-500 ${_?.type === "sell" ? "border-t-red-500" : "border-t-green-500"}`}>
                  <div className="flex justify-between px-10 pt-5">
                    <div className="flex items-center">
                      <p className={`${_?.type === "sell" ? "bg-red-500" : "bg-green-500"} font-semibold text-white text-xl w-min py-1 px-2 rounded-lg`}>
                        {_?.type}
                      </p>
                      <p className="pl-2 font-semibold text-black text-xl">{_?.symbol}</p>
                    </div>
                    
                    <a href={"/master/" + _?.master_key}>
                      <button className="bg-blue-600 font-semibold rounded-full text-white py-2 px-4">FOLLOW</button>
                    </a>
                  </div>
                  <p className="texl-lg font-semibold text-gray-600 py-2 px-10">ID: {_?.ticket}</p>  
                </div>
                <div className="w-full border border-slate-500 px-10 py-5 relative">
                  <div className="flex justify-center opacity-20">
                    <img src={logo} className="h-[150px]" alt="Logo" />
                  </div>
                  <div className="absolute top-10 left-10">
                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold">
                        <p>Entry: {_?.price}</p>
                        <p className="py-2">Take Profit: {_?.take_profit}</p>
                        <p>Stop loss: {_?.stop_loss}</p>
                      </div>
                      <div className="ml-20">
                        <div className="flex justify-center">
                          {IconSignal(_?.symbol)}
                        </div>
                        <p className="font-medium texl-lg pt-2">{dayjsInstance(_?.open_time).format("DD/MM/YYYY hh:mm:ss")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
