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
  const [editProfile, setEditProfile] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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
  }, [cookies]);

  const onSubmit = async (values) => {
    if(values?.passwordNew?.length > 0){
      if (values?.passwordNew === values?.comfirmPassword && values?.passwordNew !== undefined ) {
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
    } else {
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
    }

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
                  {cookies.user?.kyc === 0 &&
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

                <div>
                  {editProfile ? (
                    <Row>
                      {profile?.password !== null &&
                        <Col xs={24} xl={12}>
                          <Form.Item label="Password Current" name="password" className="w-[300px]">
                            <Input
                              size="large"
                              placeholder="*********"
                            />
                          </Form.Item>
                        </Col>
                      }
                      <Col xs={24} xl={12}>
                        <Form.Item label="Password New" name="passwordNew" className="w-[300px]">
                          <Input
                            size="large"
                            placeholder="*********"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} xl={24}>
                        <Form.Item label="Confirm Password" name="comfirmPassword" className="w-[300px]">
                          <Input
                            size="large"
                            placeholder="*********"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} xl={12}>
                        <Form.Item label="Số điện thoại" name="phone" className="w-[300px]">
                          <Input size="large" placeholder={profile?.phone} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} xl={12}>
                        <Form.Item label="ID Telegram" name="telegram" className="w-[300px]">
                          <Input size="large" placeholder={profile?.telegram} />
                        </Form.Item>
                      </Col>
                    </Row>)
                    : 
                    <Row>
                      <Col xs={24} xl={12}>
                        <Form.Item label="Tài khoản" name="username" className="w-[300px]">
                          <Input disabled size="large" placeholder={profile?.displayName} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} xl={12}>
                        <Form.Item label="Họ tên" name="fullname" className="w-[300px]">
                          <Input disabled size="large" placeholder={profile?.fullname} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} xl={12}>
                        <Form.Item label="Số dư" name="balance" className="w-[300px]">
                          <Input disabled size="large" placeholder={profile?.account_balance === null ? 0 : profile?.account_balance} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} xl={12}>
                        <Form.Item label="Ngày đăng ký" name="createtime" className="w-[300px]">
                          <Input disabled size="large" placeholder={moment(profile?.create_at).format("DD-MM-YYYY")} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} xl={24}>
                        <Form.Item label="Email" name="email" className="w-[300px]">
                          <Input disabled size="large" placeholder={profile?.email} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} xl={12}>
                        <Form.Item label="Số điện thoại" name="phonenumber" className="w-[300px]">
                          <Input disabled size="large" placeholder={profile?.phone} />
                        </Form.Item>
                      </Col>
                      {cookies.user?.kyc === 1 &&
                        <Col xs={24} xl={12}>
                          <div className="flex items-center h-full">
                            <div className="text-base font-medium">
                              Kết nối ZALO
                            </div>
                            <IoIosCheckmarkCircle color="#65B741" className="mx-2"/>
                            <div className="text-xs font-medium" style={{ color: "#65B741" }}>
                              Đã kết nối
                            </div>
                          </div>
                        </Col>
                      }
                      <Col xs={24} xl={12}>
                        <Form.Item label="ID Telegram" name="telegram" className="w-[300px]">
                          <Input disabled size="large" placeholder={profile?.telegram} />
                        </Form.Item>
                      </Col>
                      {cookies.user?.kyc === 1 &&
                        <Col xs={24} xl={12}>
                          <div className="flex items-center h-full">
                            <div className="text-base font-medium">
                              Kết nối TELEGRAM
                            </div>
                            <IoIosCheckmarkCircle color="#65B741" className="mx-2"/>
                            <div className="text-xs font-medium" style={{ color: "#65B741" }}>
                              Đã kết nối
                            </div>
                          </div>
                        </Col>
                      }
                    </Row>
                  }
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
                <Col className="w-full border-2 text-center p-4">
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
              </div>
            </div>
          </Form>
        </Col>
      </Row>

      <Dialog open={open} handler={handleOpen} style={{ background: "#00000099", position: 'relative' }} >
        <DialogBody style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center" }}>
          <AccuracyKYC handleOpen={handleOpen}/>
        </DialogBody>
      </Dialog>
    </div>
  );
}
