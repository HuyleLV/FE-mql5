import React, { useEffect, useState } from "react";
import { Form, Input, Button, Image, Row, Col, Space, Table, Pagination, message, Tabs, Select } from "antd";
import { useCookies } from "react-cookie";
import axios from "axios";
import dayjs from "dayjs";
import dayjsInstance from "../../utils/dayjs";
import { WarningOutlined } from "@ant-design/icons";
import { CustomUpload } from "../../component";
import { useDevice } from "../../hooks";
import TabPane from "antd/es/tabs/TabPane";
import { useNavigate } from "react-router-dom";
import SearchProps from "../../component/SearchProps";

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

  const type = Form.useWatch('type', form);
  const price = Form.useWatch('price', form);
  const take_profit = Form.useWatch('take_profit', form);
  
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
      .get(`${process.env.REACT_APP_API_URL}/signal/getByMasterKey/${masterKey?.master_key}`, {params: paginationSignal})
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        setSignal(data);
      });
  };

  const getFollowerbyMasterKey = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/follower/getbyMasterKey/${masterKey?.master_key}`, {params: pagination})
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        setFollower(data);
      });
  };

  const checkMasterKey = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/masterLicense/checkMasterKey/${cookies.user?.user_id}`);
    if(data?.data[0]?.active_status === 1){
      if(dayjsInstance(data?.data[0]?.exprice_date) > dayjsInstance(new Date())){
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
    fetchProfile();
  }, [pagination]);

  useEffect(() => { 
    checkMasterKey();
    if(masterKey?.master_key) {
      getSignal();
      getFollowerbyMasterKey();
    }
  }, [masterKey?.master_key, paginationSignal, pagination]);

  const updateStatus =  async (values) => {
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
    }else {
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
          <Row gutter={20}>
            <Col>
            {!editProfile ? (
              <Image
                preview={false}
                src={profile?.photos}
                width={120}
                height={120}
              />
            ): (
              <>
                <Form.Item name="photos">
                  <CustomUpload
                    type="image"
                    accept=".png, .jpg, .jpeg, .jfif"
                  />
                </Form.Item>
              </>
            )}
            </Col>
            <Col>
              <div className="text-[26px] font-medium">
                {profile?.displayName}
              </div>
              <div className="text-[18px] font-normal">{profile?.email}</div>
            </Col>
          </Row>
          <Row xs={24} lg={12} className="pt-10">
            {!editProfile ? (
              <>
                <Form.Item label="Password" className="w-[300px]">
                  <Input
                    disabled={!editProfile}
                    size="large"
                    placeholder="*********"
                  />
                </Form.Item>
              </>
            ) : (
              <>
                {profile?.password !== null ?
                  <Col xs={24} xl={8}>
                    <Form.Item label="Password Current" name="password" className="w-[300px]">
                      <Input
                        disabled={!editProfile}
                        size="large"
                        placeholder="*********"
                      />
                    </Form.Item>
                  </Col>
                  : <></>
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
              <Form.Item label="Phone number" name="phone" className="w-[300px]">
                <Input disabled={!editProfile} size="large"/>
              </Form.Item>
            </Col>
            <Space>
              <Button
                type={"primary"}
                onClick={() => setEditProfile(!editProfile)}
              >
                Edit profile
              </Button>
              {editProfile && (
                <Button type={"primary"} htmlType={"submit"}>
                  Save
                </Button>
              )}
            </Space>
          </Row>
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
                            <Input size="large" placeholder="Nhập"/>
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
                            <Input size="large" placeholder="Nhập ..."/>
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
                            <Input size="large"/>
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
            lg={20}
            xs={24}
            className="p-[20px] mt-5 border border-[var(--mid-gray)] rounded"
          >
            <p className="text-center text-xl font-bold pt-5 pb-10">Bạn muốn trở thành master ?</p>
            <div className="flex justify-center">
              <Button
                type={"primary"}
                onClick={()=>createMaster()}
              >
                <p className="font-semibold">Đăng ký làm master</p>
              </Button>
            </div>
          </Col>
        }
      </Row>
    </div>
  );
}
