import { Table, message, Button, Row, Col, Pagination, Select, DatePicker, Breadcrumb } from "antd";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";
import dayjsInstance from "../../../utils/dayjs";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchProps from "../../../component/SearchProps";
import dayjs from "dayjs";

export default function MasterDetail() {
    const params = useParams();
    const id = params?.id;
    const [follower, setFollower] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getFollowerbyMasterKey = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/follower/getbyMasterKey/${id}`, {params: pagination})
        .catch(function (error) {
          message.error(error.response.status);
        })
        .then(( res ) => {
          const data = res?.data;
          setFollower(data);
        });
    };

  useEffect(() => {
    getFollowerbyMasterKey();
  }, [pagination]);

    const columns = [
        {
            title: <div>ID</div>,
            key: "follower_license_id",
            dataIndex: "follower_license_id",
            width: 50,
            render: (_, record) => <div>{record?.follower_license_id}</div>,
        },
        {
            title: <div>client_key</div>,
            key: "client_key",
            dataIndex: "client_key",
            width: 50,
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
            render: (_, record) => <div>{dayjsInstance(record?.start_date).format("DD/MM/YYYY HH:mm:ss")}</div>,
        },
        {
            title: <div>expire_date</div>,
            key: "expire_date",
            dataIndex: "expire_date",
            width: 50,
            render: (_, record) => <div>{dayjsInstance(record?.expire_date).format("DD/MM/YYYY HH:mm:ss")}</div>,
        },
        {
            title: <div>active_status</div>,
            key: "active_status",
            dataIndex: "active_status",
            width: 50,
            render: (_, record) => 
            record?.active_status === 1 ?
                <div>
                    <p>Active</p>
                </div> 
            : 
                <div>
                    <p>Inactive</p>
                </div> 
            ,
        },
        {
            title: <div>payment_status</div>,
            key: "payment_status",
            dataIndex: "payment_status",
            width: 50,
            render: (_, record) => 
            record?.payment_status === 1 ?
                <div>
                    <p>Active</p>
                </div> 
            : 
                <div>
                    <p>Inactive</p>
                </div> 
            ,
        },
        {
            title: <div>Ngày tạo</div>,
            key: "create_at",
            dataIndex: "create_at",
            width: 50,
            render: (_, record) => <div>{dayjsInstance(record?.create_at).format("DD/MM/YYYY HH:mm:ss")}</div>,
        },
        {
            title: <div>Ngày cập nhật</div>,
            key: "update_at",
            dataIndex: "update_at",
            width: 50,
            render: (_, record) => <div>{dayjsInstance(record?.update_at).format("DD/MM/YYYY HH:mm:ss")}</div>,
        }
    ]

  return (
    <>
      <div>
        <Row gutter={10} className={"mb-[8px]"}>
          <Col flex={1}>
            <div className={"text-[20px] font-medium"}>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/admin/master">Danh sách Master</Link>,
                        },
                        {
                            title: "Master key: "+ id,
                        }
                    ]}
                />
            </div>
          </Col>
        </Row>
      </div>
      <div className="w-full h-full mt-5 pb-20 relative">
        <Table
          className={"custom-table"}
          dataSource={follower?.data}
          columns={columns}
          pagination={false}
        />
        <Pagination
          className="flex justify-center absolute inset-x-0 bottom-10"
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
    </>
  );
}
