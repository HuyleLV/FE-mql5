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

export default function ProfilePage() {
  const [cookies] = useCookies(["user"]);
  const [form] = Form.useForm();
  const { isMobile } = useDevice();
  const [profile, setProfile] = useState({});
  const [transfer, setTransfer] = useState([]);
  const [signal, setSignal] = useState([]);
  const [masterKey, setMasterKey] = useState([])
  const [editProfile, setEditProfile] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 8,
  });

  const fetchProfile = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/user/getByEmail/${cookies.user?.email}`
      )
      .then(({ data }) => {
        if (data) setProfile({ ...data?.[0] });
      });
  };

  const fetchTransfer = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/transfer/getByIdUser/${cookies.user?.user_id}`, {params: pagination})
      .then(( res ) => {
        const data = res?.data;
        setTransfer(data);
      });
  };

  const getSignal = async () => {
    console.log(masterKey?.master_key);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/signal/getByMasterKey/${masterKey?.master_key}`, {params: pagination})
      .catch(function (error) {
        message.error(error.response.status);
      })
      .then(( res ) => {
        const data = res?.data;
        console.log(data);
        setSignal(data);
      });
  };

  const checkMasterKey = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/masterLicense/checkMasterKey/${cookies.user?.user_id}`);
    if(data?.data[0]?.active_status === 2){
      if(dayjsInstance(data?.data[0]?.exprice_date).format("DD/MM/YYYY") > dayjsInstance(new Date()).format("DD/MM/YYYY")){
        setMasterKey(data?.data[0]);
        message.success("Đăng nhập master thành công!");
      } else {
        setMasterKey([]);
        const status = {
          master_license_id: data?.data[0].master_license_id,
          active_status: 1
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
        message.success("Gửi lệnh đăng ký làm Master thành công!");
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
    fetchTransfer()
  }, [pagination]);

  useEffect(() => { 
    checkMasterKey();
    
    if(masterKey?.master_key) {
      getSignal();
    }
  }, [masterKey?.master_key]);

  const onSendSignal = async (values) => {
    try {
      const merge = {
        ...values,
        master_key: masterKey?.master_key
      }
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/signal/create`,
          merge
        )
        .finally(() => {
          fetchProfile();
          setEditProfile(false);
          message.success("Gửi lệnh thành công !");
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
      title: <div>Trạng thái lệnh</div>,
      key: "signal_status",
      dataIndex: "signal_status",
      width: 50,
      render: (_, record) => <div>{record?.signal_status}</div>,
    },
    {
      title: <div>Ngày tạo</div>,
      key: "create_at",
      dataIndex: "create_at",
      width: 50,
      render: (_, record) => <div>{dayjsInstance(record?.create_at).format("DD/MM/YYYY")}</div>,
    },
    {
      title: <div>Ngày cập nhật</div>,
      key: "update_at",
      dataIndex: "update_at",
      width: 50,
      render: (_, record) => <div>{dayjsInstance(record?.update_at).format("DD/MM/YYYY")}</div>,
    },
  ]

  const columns = [
    {
      title: <div>ID</div>,
      key: "transfer_id",
      dataIndex: "transfer_id",
      width: 50,
      render: (_, record) => <div>{record?.transfer_id}</div>,
    },
    {
      title: <div>Nội dung</div>,
      key: "transfer_content",
      dataIndex: "transfer_content",
      width: 160,
      hidden: isMobile ? true : false,
      render: (_, record) => <div>{record?.transfer_content}</div>,
    },
    {
      title: <div>Giá</div>,
      key: "transfer_price",
      dataIndex: "transfer_price",
      width: 160,
      render: (_, record) => <div>{record?.transfer_price}</div>,
    },
    {
      title: <div>Trạng thái</div>,
      key: "transfer_status",
      dataIndex: "transfer_status",
      width: 160,
      render: (_, record) => (
        <div>
          {record?.transfer_status === "1" ?
            <p className="font-bold text-yellow-500">Đang chờ xác nhận</p>
            : <p className="font-bold text-green-500">Đã xác nhận</p>
          }
        </div>
      ),
    },
    {
      title: <div>Ảnh</div>,
      key: "transfer_price",
      dataIndex: "transfer_price",
      width: 160,
      hidden: isMobile ? true : false,
      render: (_, record) => <div><img src={record?.transfer_image} className="h-20"/></div>,
    },
    {
      title: <div>Sản phẩm</div>,
      key: "product_id",
      dataIndex: "product_id",
      width: 160,
      render: (_, record) => <div>{record?.product_id}</div>,
    },,
    {
      title: <div className={"base-table-cell-label "}>Ngày tạo</div>,
      key: "create_at",
      dataIndex: "create_at",
      width: 160,
      hidden: isMobile ? true : false,
      render: (_, record) => {
        return (
          <div>
            <span className={"!inline-block min-w-[100px]"}>
              {dayjsInstance(record?.create_at).format("DD/MM/YYYY")}
            </span>
          </div>
        );
      },
    },
    {
      key: "operation",
      dataIndex: "operation",
      width: 50,
      render: (_, record) => {
        return (
          <Space>
            <div
              className={"text-[var(--red)]"}
            >
              <WarningOutlined />
            </div>
          </Space>
        );
      },
    }
  ].filter(item => !item.hidden);;

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
              <Tabs type="card">
                <TabPane tab="Quản lý Follower" key="1">
                  Content of Tab Pane 1
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
                      current={pagination.page}
                      total={signal?.total}
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

        {transfer?.data?.length > 0 ?
          <Col
            lg={20}
            xs={24}
            className="p-[20px] mt-5 border border-[var(--mid-gray)] rounded"
          >
            <p className="text-center text-xl font-bold pt-5 pb-10"> Quản lý lệnh chuyển tiền</p>
            <Table 
              className={"custom-table pb-10"}
              rowKey={(record) => record?.transfer_id + ""}
              dataSource={transfer?.data} 
              columns={columns} 
              pagination={false}
            />
            <Pagination
              className="flex justify-center"
              current={pagination.page}
              total={transfer?.total}
              pageSize={pagination.pageSize}
              onChange={(p)=> {
                setPagination({
                  page: p,
                  pageSize: pagination.pageSize
                })
              }}
            />
          </Col>
          : <></>
        }

      </Row>
    </div>
  );
}
