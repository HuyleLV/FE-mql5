import { Button, List } from "antd";

const data = [
    {
        id: 1,
        img: "https://extrading.vn/wp-content/uploads/2023/08/dang-nhap-exness-tren-mt5-13.webp",
        description: "Đăng nhập Exness trên MT5: Hướng dẫn, thao tác và lưu ý",
        report: "Published by Crypto Research Report"
    },
    {
        id: 2,
        img: "https://extrading.vn/wp-content/uploads/2023/08/exness-mt5-20.webp",
        description: "Exness MT5: lựa chọn thông minh của các nhà giao dịch",
        report: "Published by Crypto Research Report"
    },
    {
        id: 3,
        img: "https://extrading.vn/wp-content/uploads/2023/08/mt4-exness.webp",
        description: "MT4 Exness chìa khóa làm giàu trong đầu tư ngoại hối",
        report: "Published by Crypto Research Report"
    },
    {
        id: 4,
        img: "https://extrading.vn/wp-content/uploads/2023/08/lien-ket-exness-voi-mt5.webp",
        description: "Chia Sẻ Cách Liên Kết Exness với MT5 trên Các Thiết bị",
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
                <div className="w-full mt-8">
                    <img alt={item.description} className="w-[350px] h-[200px]" style={{ borderRadius: 6 }} src={item.img} />
                    <div className="font-semibold text-base line-clamp-2 mb-4 mt-4">{item.description}</div>
                    <div className="font-semibold text-xs light-gray">{item.report}</div>
                </div>
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