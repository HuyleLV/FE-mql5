import { Dialog, DialogBody } from "@material-tailwind/react";
import { Col, Dropdown, Row } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from "react-time-ago";

import en from 'javascript-time-ago/locale/en'

export default function NotificationHeader({ notifications, lengthSocket, length, setRefresh, refresh }) {

    const [isRead, setIsRead] = useState(null)

    const [count, setCount] = useState(0)

    const handleRead = (id) => {
        setIsRead(id)
    }

    const handleReaded = async (id, value) => {

        await axios.post(
            `${process.env.REACT_APP_API_URL}/notification/updateUser/${id}`, { check_read: value }
        );
    }

    const countRead = async () => {
        let numbers = await notifications.reduce((acc, child) => {
            if (!acc[child.check_read]) {
                acc[child.check_read] = 0;
            }
            acc[child.check_read]++;
            return acc;
        }, {});

        setCount(numbers[0] === undefined ? (0 + lengthSocket) : (numbers[0] + lengthSocket));
    }

    useEffect(() => {
        countRead()
    }, [lengthSocket])

    const decrease = () => {
        setCount(prevCount => {
            if (prevCount - 1 < 0) return prevCount;
            return prevCount - 1;
        })
    }

    useEffect(() => {
        TimeAgo.addDefaultLocale(en)
    }, [])

    const items =
        notifications.map((item, index) => (
            {
                key: index,
                label: (
                    <Row
                        id="drow-noti"
                        className="scrollNoti"
                        onChange={index === isRead && (handleReaded(item.notification_id, item.notification_user === "-1" ? 0 : 1))}
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomColor: index === length - 1 ? "#fff" : "#c0bfbf", borderBottomWidth: 1 }}
                        onClick={() => (
                            handleRead(index), item.check_read === 0 && (setRefresh(!refresh), decrease())
                        )}
                    >
                        <Col className="w-[200px]">
                            <div style={{ width: "100%", display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'start', alignItems: 'end' }}>
                                <span className="text-sm font-bold">{item.notification_title}</span>
                                <span className="text-[10px] font-semibold light-gray">
                                    <ReactTimeAgo date={item.create_at} locale="en-US" />
                                </span>
                            </div>
                            <span className="text-[14px] font-semibold light-gray">{item.notification_description}</span>
                        </Col>

                        {item.check_read === 0 && <GoDotFill color="#0866FF" />}
                    </Row>

                ),
            }
        ))


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
