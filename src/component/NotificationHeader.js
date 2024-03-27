import { Dropdown, Row } from "antd";
import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";

export default function NotificationHeader({ notifications, length, setNotifications }) {

    const [isRead, setIsRead] = useState(null)

    const handleRead = (id) => {
        setIsRead(id)
    }

    const items =
        notifications.map((item, index) => (
            {
                key: index,
                label: (
                    <Row
                        className="flex items-center"
                        onClick={() => (
                            handleRead(index)
                        )}
                    >
                        <span className="cursor-pointer mr-4">{item.message}</span>
                    </Row>
                ),
            }
        ))


    return (
        <Dropdown placement="bottomRight" menu={{ items }}>
            <div className="w-auto" style={{ position: 'relative' }}>
                <IoIosNotifications size={30} style={{ marginRight: 6 }} />
                {length >= 0 &&
                    <div style={{ width: 14, height: 14, textAlign: 'center', borderRadius: 100, background: "red", color: "#fff", fontSize: 10, fontWeight: 'bold', position: 'absolute', top: 0, right: 4 }}>{length}</div>
                }
            </div>

        </Dropdown>

    );
}
