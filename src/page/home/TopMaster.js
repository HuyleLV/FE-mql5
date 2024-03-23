import { Button, List } from "antd";

const data = [
    {
        id: 1,
        avatar: null,
        name: "xxMasterxx",
        idUser: "541",
        Profit: "10000",
        WinRate: "97%",
        TradePopular: "BTC",
        TimeTrade: "23/03/2023",
        SignalWatcher: "Malone X"
    },
    {
        id: 2,
        avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-File.png",
        name: "SasumRR",
        idUser: "133",
        Profit: "78000",
        WinRate: "98%",
        TradePopular: "BTC",
        TimeTrade: "23/03/2023",
        SignalWatcher: "Malone Y"
    },
    {
        id: 3,
        avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
        name: "DA SUN KID",
        idUser: "12",
        Profit: "38000",
        WinRate: "95%",
        TradePopular: "BTC",
        TimeTrade: "23/03/2023",
        SignalWatcher: "Malone Z"
    },
    {
        id: 4,
        avatar: "https://www.shareicon.net/data/2016/09/01/822739_user_512x512.png",
        name: "Women Dark",
        idUser: "841",
        Profit: "12000",
        WinRate: "87%",
        TradePopular: "BTC",
        TimeTrade: "23/03/2023",
        SignalWatcher: "Malone N"
    },
]

export default function TopMaster() {

    let bgBtn = "linear-gradient(to right, #ff00cc, #333399)";
    const avatarDefault = "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"

    const renderItem = (item) => {
        return (

            <List.Item
                key={item?.id}
            >
                <div className="relative group overflow-hidden hover:overflow-visible item-container pt-8">
                    <div className="flex w-full border p-4" style={{ flexDirection: 'column', borderRadius: 10, gap: 20 }}>
                        <div className="flex w-full" style={{ flexDirection: 'row', gap: 10 }}>
                            {item.avatar != null ?
                                <img alt="avata-product" className="w-auto h-[50px]" style={{ borderRadius: 100 }} src={item.avatar} />
                                : <img alt="avata-product" className="w-auto h-[50px]" style={{ borderRadius: 100 }} src={avatarDefault} />
                            }
                            <div style={{ flexDirection: 'column' }}>
                                <div className="font-semibold text-base">
                                    {item.name}
                                </div>
                                <div className="font-semibold text-base">
                                    Id: {item.idUser}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full" style={{ flexDirection: 'column', gap: 10 }}>
                            <div className="font-semibold text-base">
                                Profit: {item.Profit}
                            </div>
                            <div className="font-semibold text-base">
                                Win rate: {item.WinRate}
                            </div>
                            <div className="font-semibold text-base">
                                Cập nhật giao dịch phổ biến: {item.TradePopular}
                            </div>
                            <div className="font-semibold text-base">
                                Thời gian giao dịch: {item.TimeTrade}
                            </div>
                            <div className="font-semibold text-base">
                                Người theo tín hiệu: {item.SignalWatcher}
                            </div>
                        </div>
                        <div className="flex w-full justify-center items-center">
                            <Button type="primary" className="mx-2" style={{ borderRadius: 50, background: bgBtn, textAlign: "center" }}><p className="font-bold text-base textWhite">Chi tiết</p></Button>
                        </div>
                    </div>
                </div>
            </List.Item>
        );
    }

    return (
        <div className="w-full p-5">
            <p className="font-bold p-4 text-3xl border-b-2 border-blue-500">Top Masters</p>
            {data.length > 0 &&
                <List
                    itemLayout="horizontal"
                    grid={{ gutter: 20, column: 5 }}
                    dataSource={data}
                    renderItem={renderItem}
                />
            }
        </div>
    )
}