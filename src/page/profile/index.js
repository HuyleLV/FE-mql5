import React, { useEffect, useState } from "react";
import { Form, Input, Button, Image, Row, Col, Space, Table, Pagination, message } from "antd";
import { useCookies } from "react-cookie";
import axios from "axios";
import dayjs from "dayjs";
import dayjsInstance from "../../utils/dayjs";
import { WarningOutlined } from "@ant-design/icons";
import { CustomUpload } from "../../component";

export default function ProfilePage() {
  const [cookies] = useCookies(["user"]);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [transfer, setTransfer] = useState([]);
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

  useEffect(() => {
    if (Object.keys(profile)?.length > 0) {
      form.resetFields();
    }
  }, [form, profile]);

  useEffect(() => {
    fetchProfile();
    fetchTransfer()
  }, [pagination]);

  const onSubmit = async (values) => {
    console.log(values);
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
  ];

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
              <Form.Item label="Password" className="w-[300px]">
                <Input
                  disabled={!editProfile}
                  size="large"
                  placeholder="*********"
                />
              </Form.Item>
            ) : (
              <>
                <Col xs={6}>
                  <Form.Item label="Password Current" name="password" className="w-[300px]">
                    <Input
                      disabled={!editProfile}
                      size="large"
                      placeholder="*********"
                    />
                  </Form.Item>
                </Col>
                <Col xs={6}>
                  <Form.Item label="Password New" name="passwordNew" className="w-[300px]">
                    <Input
                      disabled={!editProfile}
                      size="large"
                      placeholder="*********"
                    />
                  </Form.Item>
                </Col>
                <Col xs={6}>
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
        <Col
          lg={20}
          xs={24}
          className="p-[20px] mt-5 border border-[var(--mid-gray)] rounded"
        >
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
      </Row>
    </div>
  );
}
