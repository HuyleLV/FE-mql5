import React, { useEffect, useState } from "react";
import { Form, Input, Button, Image, Row, Col, Space, Table, Pagination, message, Tabs, Select, Flex, DatePicker } from "antd";
import { useCookies } from "react-cookie";
import axios from "axios";
import dayjsInstance from "../../utils/dayjs";
import { CustomUpload } from "../../component";
import TabPane from "antd/es/tabs/TabPane";
import { useLocation, useNavigate } from "react-router-dom";
import SearchProps from "../../component/SearchProps";
import icon_master from "../../component/image/icon/icon_market.svg"
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidErrorCircle } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Dialog, DialogBody } from "@material-tailwind/react";
import AccuracyKYC from "../../component/AccuracyKYC";

const historyLogin = [
  {
    id: 1,
    time: "23-4-2024 10:22",
    ip: "118.68.109.43",
    devide: "Firefox 123 on Windows"
  },
  {
    id: 2,
    time: "12-4-2024 22:39",
    ip: "118.68.109.43",
    devide: "Chrome 122 on Windows"
  }
]

export default function ProfilePage() {
  const [cookies] = useCookies(["user"]);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [signal, setSignal] = useState([]);
  const [masterKey, setMasterKey] = useState([])
  const [follower, setFollower] = useState([])
  const [editProfile, setEditProfile] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 8,
  });
  const [paginationSignal, setPaginationSignal] = useState({
    page: 1,
    pageSize: 8,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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
      .get(`${process.env.REACT_APP_API_URL}/signal/getByMasterKey/${masterKey?.master_key}`, { params: paginationSignal })
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then((res) => {
        const data = res?.data;
        setSignal(data);
      });
  };

  const getFollowerbyMasterKey = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/follower/getbyMasterKey/${masterKey?.master_key}`, { params: pagination })
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then((res) => {
        const data = res?.data;
        setFollower(data);
      });
  };

  const checkMasterKey = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/masterLicense/checkMasterKey/${cookies.user?.user_id}`);
    if (data?.data[0]?.active_status === 1) {
      if (dayjsInstance(data?.data[0]?.exprice_date) > dayjsInstance(new Date())) {
        setMasterKey(data?.data[0]);
        message.success("Đăng nhập master thành công!");
      } else {
        setMasterKey([]);
        const status = {
          master_license_id: data?.data[0].master_license_id,
          active_status: 0
        }

        await axios
          .post(`${process.env.REACT_APP_API_URL}/masterLicense/checkExpriceDate`, status)
          .catch(() => message.error("Error server!"));
      }
    } else {
      setMasterKey([]);
    }
  }

  const createMaster = async () => {
    const data = {
      displayName: cookies.user?.displayName,
      user_id: cookies.user?.user_id
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL}/masterLicense/create`, data)
      .then((res) => {
        message.success(String(res?.data?.message));
      })
      .catch(() => message.error("Error server!"));
  }

  useEffect(() => {
    if (Object.keys(profile)?.length > 0) {
      form.resetFields();
    }
  }, [form, profile]);

  useEffect(() => {
    if (!cookies?.user && currentPath?.includes('/signal')) {
      message.warning("Vui lòng đăng nhập!")
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, [pagination, cookies]);

  useEffect(() => {
    checkMasterKey();
    if (masterKey?.master_key) {
      getSignal();
      getFollowerbyMasterKey();
    }
  }, [masterKey?.master_key, paginationSignal, pagination]);

  const updateStatus = async (values) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/signal/updateStatus/${values}`)
      .finally(() => {
        fetchProfile();
        setEditProfile(false);
        message.success("Cập nhật trạng thái thành công !");
        getSignal();
      });
  }

  const onSendSignal = async (values) => {
    try {
      const merge = {
        ...values,
        master_key: masterKey?.master_key,
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

  const onSubmit = async (values) => {
    if (values?.passwordNew === values?.comfirmPassword && values?.passwordNew !== undefined) {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/user/updateProfile/${profile?.user_id}`,
          values
        )
        .finally(() => {
          fetchProfile();
          setEditProfile(false);
          message.success("Cập nhật thông tin thành công !");
        });
    } else {
      message.error("Thông tin điền bị sai hoặc thiếu!");
    }
  };

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
            <Button type={"primary"} onClick={() => updateStatus(record?.signal_id)}>
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
  const onChange = (date, dateString) => {
    console.log(date, dateString);
};

  return (
    <div className="my-[60px]">
      <Row justify={"center"} align={"middle"}>
        <Col
          lg={20}
          xs={24}
          className="p-[20px] border border-[var(--mid-gray)] rounded"
        >
          <Form
            layout={"vertical"}
            colon={false}
            form={form}
            initialValues={profile}
            onFinishFailed={(e) => console.log(e)}
            onFinish={onSubmit}
          >
            <div className="w-full" style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
              <div style={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Space className="w-full justify-center pb-4">
                  {cookies.user?.account_balance === null &&
                    <div className="flex items-center " style={{ flexDirection: 'column' }}>
                      <div className="flex items-center " style={{ flexDirection: 'row' }}>
                        <div className="text-base font-medium">
                          Tài khoản chưa xác thực
                        </div>
                        <BiSolidErrorCircle color="#E72929" size={20} />
                      </div>
                      <Button onClick={handleOpen} type="primary" className="mx-2"><p className="font-semibold text-sm textWhite">Xác thực ngay</p>
                      </Button>
                    </div>}
                </Space>

                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div style={{ width: "50%" }}>
                    {editProfile && (
                      <>
                        {profile?.password !== null &&
                          <Col xs={24} xl={8}>
                            <Form.Item label="Password Current" name="password" className="w-[300px]">
                              <Input
                                disabled={!editProfile}
                                size="large"
                                placeholder="*********"
                              />
                            </Form.Item>
                          </Col>
                        }
                        <Col xs={24} xl={8}>
                          <Form.Item label="Password New" name="passwordNew" className="w-[300px]">
                            <Input
                              disabled={!editProfile}
                              size="large"
                              placeholder="*********"
                            />
                          </Form.Item>
                        </Col>
                      </>
                    )}
                    <Col xs={24}>
                      <Form.Item label="Tài khoản" name="username" className="w-[300px]">
                        <Input disabled={!editProfile} size="large" placeholder={profile?.displayName} />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item label="Họ tên" name="fullname" className="w-[300px]">
                        <Input disabled={!editProfile} size="large" placeholder={profile?.fullname} />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item label="Số dư" name="balance" className="w-[300px]">
                        <Input disabled={!editProfile} size="large" placeholder={profile?.account_balance === null ? 0 : profile?.account_balance} />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item label="Ngày đăng ký" name="createtime" className="w-[300px]">
                        <Input disabled={!editProfile} size="large" placeholder={moment(profile?.create_at).format("DD-MM-YYYY")} />
                      </Form.Item>
                    </Col>
                  </div>
                  <div style={{ width: "50%" }}>
                    {editProfile && (
                      <>
                        <Col xs={24} xl={8}>
                          <Form.Item label="Confirm Password" name="comfirmPassword" className="w-[300px]">
                            <Input
                              disabled={!editProfile}
                              size="large"
                              placeholder="*********"
                            />
                          </Form.Item>
                        </Col>
                      </>
                    )}
                    <Col xs={24}>
                      <Form.Item label="Số điện thoại" name="phonenumber" className="w-[300px]">
                        <Input disabled={!editProfile} size="large" placeholder={profile?.phone} />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item label="Email" name="email" className="w-[300px]">
                        <Input disabled={!editProfile} size="large" placeholder={profile?.email} />
                      </Form.Item>
                    </Col>
                    <Row xs={24} style={{ gap: 10, alignItems: 'center', marginTop: 60 }}>
                      <div className="text-base font-medium">
                        Kết nối ZALO
                      </div>
                      <Row xs={24} style={{ gap: 2, alignItems: 'center' }}>
                        <IoIosCheckmarkCircle color="#65B741" />
                        <div className="text-xs font-medium" style={{ color: "#65B741" }}>
                          Đã kết nối
                        </div>
                      </Row>
                    </Row>
                    <Row xs={24} style={{ gap: 10, alignItems: 'center', marginTop: 70 }}>
                      <div className="text-base font-medium">
                        Kết nối Telegram
                      </div>
                      <Row xs={24} style={{ gap: 2, alignItems: 'center' }}>
                        <BiSolidErrorCircle color="#EF4040" />
                        <div className="text-xs font-medium" style={{ color: "#EF4040" }}>
                          Chưa kết nối
                        </div>
                      </Row>
                    </Row>
                  </div>
                </div>

                <Space className="w-full justify-center pt-4">
                  <Button
                    className="w-[100px]"
                    type={"primary"}
                    onClick={() => setEditProfile(!editProfile)}
                  >
                    Edit profile
                  </Button>
                  {editProfile && (
                    <Button className="w-[100px]" type={"primary"} htmlType={"submit"}>
                      Save
                    </Button>
                  )}
                </Space>
              </div>
              <div style={{ width: "40%", display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
                <Col className="w-full text-center p-4" style={{ borderLeftWidth: 2, borderBottomWidth: 2, gap: 6 }}>
                  {!editProfile ? (
                    <Image
                      preview={false}
                      src={profile?.photos}
                      width={120}
                      height={120}
                    />
                  ) : (
                    <>
                      <Form.Item name="photos">
                        <CustomUpload
                          type="image"
                          accept=".png, .jpg, .jpeg, .jfif"
                        />
                      </Form.Item>
                    </>
                  )}

                  <div className="text-[26px] font-medium">
                    {profile?.displayName}
                  </div>
                  <div className="text-xs font-semibold textGreen">Online</div>
                </Col>
                <Col className="w-full text-center p-4" style={{ borderLeftWidth: 2, gap: 6 }}>
                  <div className="text-base font-medium">
                    Lịch sử đăng nhập
                  </div>
                  <div className="w-full p-2 text-center pt-2">
                    {historyLogin.map((item) => (
                      <scroll>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 4, marginTop: 20, justifyContent: 'center' }}>
                          <div className="text-xs font-bold p-1 textWhite" style={{ background: "#FFC700", borderRadius: 2 }}>
                            {item.time}
                          </div>
                          <div className="text-xs font-bold p-1 textWhite" style={{ background: "#65B741", borderRadius: 2 }}>
                            IP: {item.ip}
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          Device: {item.devide}
                        </div>
                      </scroll>
                    ))}

                  </div>
                </Col>
              </div>
            </div>
          </Form>
        </Col>
        {masterKey?.master_license_id ?
          <>
            <Col
              lg={20}
              xs={24}
              className="p-[20px] mt-5 border border-[var(--mid-gray)] rounded"
            >
              <div className="flex justify-center py-2">
                <p className="text-center font-semibold mx-5 p-4 bg-blue-100 text-xl">My master Key: {masterKey?.master_key}</p>
                <p className="text-center font-semibold mx-5 p-4 bg-blue-100 text-xl">My private key: {masterKey?.private_key}</p>
              </div>
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
                      onChange={(p, ps) => {
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
                      onChange={(p, ps) => {
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
                        <Col lg={20} xs={24}>
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
                        <Col lg={20} xs={24}>
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
                            <Input size="large" placeholder="Nhập" />
                          </Form.Item>
                        </Col>
                        <Col lg={20} xs={24}>
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
                            <Input size="large" placeholder="Nhập ..." />
                          </Form.Item>
                        </Col>
                        <Col lg={20} xs={24}>
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
                                  if (type === "buy" && Number(take_profit) < Number(price)) {
                                    return Promise.reject(`Giá mua phải lớn hơn ${price}!`);
                                  } else if (type === "sell" && Number(take_profit) > Number(price)) {
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
                        <Col lg={20} xs={24}>
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
                            <Input size="large" />
                          </Form.Item>
                        </Col>
                        <Col lg={20} xs={24} >
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
            lg={20}
            className="p-[20px] mt-5 border border-[var(--mid-gray)] rounded bg-gradient-to-r from-slate-800 to-blue-700 text-white"
          >
            <Row className="flex items-center">
              <Col xs={24} xl={4}>
                <div className="flex items-center">
                  <img src={icon_master} style={{ width: 100 }} />
                  <p className="font-bold text-2xl pl-2">Master Trade</p>
                </div>
              </Col>
              <Col xs={24} xl={16} >
                <div className="flex justify-center">
                  <div className="flex items-center px-5">
                    <CheckOutlined className="bg-green-400 p-2 rounded-full font-bold text-xl" />
                    <p className="pl-2 font-semibold text-lg">Đăng ký<br /> miễn phí</p>
                  </div>
                  <div className="flex items-center px-5">
                    <CheckOutlined className="bg-green-400 p-2 rounded-full font-bold text-xl" />
                    <p className="pl-2 font-semibold text-lg">Sử dụng indicator<br /> độc quyền</p>
                  </div>
                  <div className="flex items-center px-5">
                    <CheckOutlined className="bg-green-400 p-2 rounded-full font-bold text-xl" />
                    <p className="pl-2 font-semibold text-lg">Đo lương giao dịch<br /> chuyên nghiệp</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} xl={4}>
                <button
                  className="bg-yellow-500 px-5 py-2 rounded-xl hover:bg-yellow-600"
                  onClick={() => createMaster()}
                >
                  <p className="font-semibold text-lg">Đăng ký làm master</p>
                </button>
              </Col>
            </Row>
          </Col>

        }
      </Row>

      <Dialog open={open} handler={handleOpen} style={{ background: "#00000099", position: 'relative' }} >
        <DialogBody style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
          <AccuracyKYC handleOpen={handleOpen}/>
        </DialogBody>
      </Dialog>
    </div>
  );
}
