import React, { useEffect, useState } from "react";
import { Form, Input, Button, Image, Row, Col, Space } from "antd";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function ProfilePage() {
  const [cookies] = useCookies(["user"]);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState({});
  const [editProfile, setEditProfile] = useState(false);

  console.log('cookies', cookies, profile)
  const fetchProfile = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/user/getByEmail/${cookies.user.email}`
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
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/updateProfile/${profile?.user_id}`,
        values
      )
      .finally(() => {
        fetchProfile();
        setEditProfile(false);
      });
  };
  return (
    <div className="my-[60px]">
      <Row justify={"center"} align={"middle"}>
        <Col
          lg={20}
          xs={24}
          className="p-[20px] border border-[var(--mid-gray)]"
        >
          <Row gutter={20}>
            <Col>
              <Image
                preview={false}
                src={profile?.photos}
                width={120}
                height={120}
              />
            </Col>
            <Col>
              <div className="text-[26px] font-medium">
                {profile?.displayName}
              </div>
              <div className="text-[18px] font-normal">{profile?.email}</div>
            </Col>
          </Row>
          <Form
            className="pt-[20px]"
            layout={"vertical"}
            colon={false}
            form={form}
            initialValues={profile}
            onFinishFailed={(e) => console.log(e)}
            onFinish={onSubmit}
          >
            <Col xs={24} lg={12}>
              {!editProfile ? (
                <Form.Item label="Password">
                  <Input
                    disabled={!editProfile}
                    size="large"
                    placeholder="*********"
                  />
                </Form.Item>
              ) : (
                <Form.Item label="Password" name="password">
                  <Input disabled={!editProfile} size="large" />
                </Form.Item>
              )}

              <Form.Item label="Phone number" name="phone">
                <Input disabled={!editProfile} size="large" />
              </Form.Item>

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
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
