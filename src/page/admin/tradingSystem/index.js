import { Button, Col, List, Row, Spin, message } from "antd";
import { IconSignal } from "../../../utils/iconSignal";
import dayjsInstance from "../../../utils/dayjs";
import logo from "../../../component/image/logo_black.png"
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../utils/axios";
import check_icon from "../../../component/image/icon/check.png"
import { Link } from "react-router-dom";
import TradingSymtem from "../../../component/TradingSymtem";

export default function TradingSymtemDashboard() {

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div>
                <Row gutter={10} className={"mb-[8px]"}>
                    <Col flex={1}>
                        <div className={"text-[20px] font-medium"}>Quản lý trading system</div>
                    </Col>
                    <Col>
                        <Link to={"/admin/trading-system/create"}>
                            <Button type={"primary"} onClick={() => {}}>
                                Tạo
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>
            <div className="pt-10">
                <TradingSymtem />
            </div>
        </div>
    )
}