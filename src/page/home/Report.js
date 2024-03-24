import { Button, List } from "antd";
import { Link } from "react-router-dom";
import ListReports from "./ListReports";

const data = [
    {
        id: 1,
        img: "https://extrading.vn/wp-content/uploads/2023/08/dang-nhap-exness-tren-mt5-13.webp",
        title: "Đăng nhập Exness trên MT5: Hướng dẫn, thao tác và lưu ý",
        description: `Cointelegraph Research presents "DEXScape: Scaling, Innovating, Aggregating," a transformative report delving deeply into the dynamic world of decentralized exchanges (DEXs). This comprehensive study covers groundbreaking innovations and projections, including blockchains of choice, the evolution of market maker mechanisms, the impact of rollup technologies and Bitcoin DeFi solutions, and the rise of DEX aggregators.`,
        report: "Published by Crypto Research Report"
    },
    {
        id: 2,
        img: "https://extrading.vn/wp-content/uploads/2023/08/exness-mt5-20.webp",
        title: "Exness MT5: lựa chọn thông minh của các nhà giao dịch",
        description: `Cointelegraph Research presents "DEXScape: Scaling, Innovating, Aggregating," a transformative report delving deeply into the dynamic world of decentralized exchanges (DEXs). This comprehensive study covers groundbreaking innovations and projections, including blockchains of choice, the evolution of market maker mechanisms, the impact of rollup technologies and Bitcoin DeFi solutions, and the rise of DEX aggregators.`,
        report: "Published by Crypto Research Report"
    },
    {
        id: 3,
        img: "https://extrading.vn/wp-content/uploads/2023/08/mt4-exness.webp",
        title: "MT4 Exness chìa khóa làm giàu trong đầu tư ngoại hối",
        description: `Cointelegraph Research presents "DEXScape: Scaling, Innovating, Aggregating," a transformative report delving deeply into the dynamic world of decentralized exchanges (DEXs). This comprehensive study covers groundbreaking innovations and projections, including blockchains of choice, the evolution of market maker mechanisms, the impact of rollup technologies and Bitcoin DeFi solutions, and the rise of DEX aggregators.`,
        report: "Published by Crypto Research Report"
    },
    {
        id: 4,
        img: "https://extrading.vn/wp-content/uploads/2023/08/lien-ket-exness-voi-mt5.webp",
        title: "Chia Sẻ Cách Liên Kết Exness với MT5 trên Các Thiết bị",
        description: `Cointelegraph Research presents "DEXScape: Scaling, Innovating, Aggregating," a transformative report delving deeply into the dynamic world of decentralized exchanges (DEXs). This comprehensive study covers groundbreaking innovations and projections, including blockchains of choice, the evolution of market maker mechanisms, the impact of rollup technologies and Bitcoin DeFi solutions, and the rise of DEX aggregators.`,
        report: "Published by Crypto Research Report"
    },
]

export default function Reports() {

    let bgBtn = "linear-gradient(to right, #ff00cc, #333399)";

    const renderItem = (item) => {
        return (

            <List.Item
                key={item?.id}
            >
                <ListReports id={item.id} img={item.img} title={item.title} description={item.description} report={item.report} />

            </List.Item>
        );
    }

    return (
        <div className="w-full p-5">
            <p className="font-bold p-4 text-3xl border-b-2 border-blue-500">Reports</p>
            {data.length > 0 &&
                <List
                    itemLayout="horizontal"
                    grid={{ gutter: 20, column: 4 }}
                    dataSource={data}
                    renderItem={renderItem}
                />
            }
        </div>
    )
}