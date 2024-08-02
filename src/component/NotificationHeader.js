import { Dialog, DialogBody } from "@material-tailwind/react";
import { Col, Dropdown, Modal, Row } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from "react-time-ago";
import parse from "html-react-parser";

import en from 'javascript-time-ago/locale/en'

export default function NotificationHeader({ notifications, lengthSocket, length, setRefresh, refresh, user_id }) {

    const [isRead, setIsRead] = useState(null)

    const [count, setCount] = useState(0)

    const [isRefresh, setIsRefresh] = useState(false)

    const [index, setIndex] = useState(null)

    const handleRead = (id) => {
        setIsRead(id);
    }

    const handleReaded = async (id, value) => {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/notification/updateUser/${id}`, { check_read: value }
        ).then(async (res) => {
            setRefresh(!refresh)
        })
    }

    const countRead = async () => {
        setIsRefresh(true)
        let numbers = await notifications.filter((word) => word.check_read.length > 2)

        let cutArr = numbers.map((item, index) => {
            var noti_user = item?.notification_user;
            let userArr = noti_user.split(',')
            const indexUser = userArr.indexOf(user_id.toString());
            var fruits = item?.check_read;
            let dd = fruits?.split(',')
            return dd[indexUser - 1]
        })

        let count = await cutArr.reduce((acc, child) => {
            if (!acc[child]) {
                acc[child] = "0";
            }
            acc[child]++;
            return acc;
        }, {});

        let numberLess2 = await notifications.filter((word) => word.check_read.length < 2)

        let less2Arr = await numberLess2.reduce((acc, child) => {
            if (!acc[child.check_read]) {
                acc[child.check_read] = "0";
            }
            acc[child.check_read]++;
            return acc;
        }, {});

        setCount((count[0] === undefined ? 0 : count[0]) + (less2Arr[0] === undefined ? 0 : less2Arr[0]));
        setIsRefresh(false)
    }

    useEffect(() => {
        countRead()
    }, [lengthSocket, isRefresh])

    const decrease = () => {
        setCount(prevCount => {
            if (prevCount - 1 < 0) return prevCount;
            return prevCount - 1;
        })
    }

    useEffect(() => {
        TimeAgo.addDefaultLocale(en)
    }, [])

    const indexOfArr = async (value) => {
        var noti_user = value?.notification_user;
        let userArr = noti_user.split(',')
        const index = userArr.indexOf(user_id.toString());
        var fruits = value?.check_read;
        let dd = fruits?.split(',')
        dd[index - 1] = "1"
        await dd?.length <= 1 ? handleReaded(value.notification_id, 1) : handleReaded(value.notification_id, dd.toString())
    }

    const items =
        notifications.map((item, index) => {
            var noti_user = item?.notification_user;
            let userArr = noti_user.split(',')
            const indexUser = userArr.indexOf(user_id.toString());
            var fruits = item?.check_read;
            let dd = fruits?.split(',')

            return (
                {
                    key: index,
                    label: (
                        <Row
                            id="drow-noti"
                            className="scrollNoti"
                            onChange={index === isRead && indexOfArr(item)}
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomColor: index === length - 1 ? "#fff" : "#c0bfbf", borderBottomWidth: 1 }}
                            onClick={() => (
                                handleRead(index), (item.check_read === "0" || dd[indexUser - 1] === "0") && (decrease()),
                                showInfo(item)
                            )}
                        >
                            <Col className="w-[300px]">
                                <div style={{ width: "100%", display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span className="text-sm font-bold line-clamp-2">{item.notification_title}</span>
                                        <span className="text-[14px] font-semibold light-gray line-clamp-2">{parse(item.notification_description)}</span>
                                    </div>
                                    <span className="text-[10px] font-semibold light-gray"> 
                                        <ReactTimeAgo date={item.create_at} locale="en-US" />
                                    </span>
                                </div>
                            </Col>
                            {(item.check_read === "0" || dd[indexUser - 1] === "0")
                                && <GoDotFill color="#0866FF" />}
                        </Row>

                    ),
                }
            )
        }
        )

    const showInfo = (values) => {
        Modal.info({
            title: "Thông báo chi tiết",
            width: 900,
            content: (
                <div className="py-5">
                    <p className="text-xl font-semibold">{values?.notification_title}</p>
                    <span className="text-[10px] font-semibold light-gray">
                        <ReactTimeAgo date={values?.create_at} locale="en-US" />
                    </span>
                    <p className="py-2 text-lg">{parse(values?.notification_description)}</p>
                </div>
            ),
        });
    }

    return (
        <>
            <Dropdown placement="bottomRight" menu={{ items }}>
                <div className="w-auto" style={{ position: 'relative' }}>
                    <IoIosNotifications size={30} style={{ marginRight: 6 }} />
                    {count > 0 &&
                        <div style={{ width: 14, height: 14, textAlign: 'center', borderRadius: 100, background: "red", color: "#fff", fontSize: 10, fontWeight: 'bold', position: 'absolute', top: 0, right: 4 }}>{count}</div>
                    }
                </div>

            </Dropdown>
        </>
    );
}
