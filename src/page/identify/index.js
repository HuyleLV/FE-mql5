
export default function Identify() {  
    return (
        <div className="max-w-screen-2xl items-center mx-auto">
            <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] my-5 pl-4">
                <p className="font-bold text-2xl py-5">Biểu đồ thị trường</p>
            </div>
            <iframe
                src="https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A700%2C%22symbol%22%3A%22FX%3AGBPUSD%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22enable_publishing%22%3Atrue%2C%22withdateranges%22%3Atrue%2C%22range%22%3A%22YTD%22%2C%22hide_side_toolbar%22%3Afalse%2C%22allow_symbol_change%22%3Atrue%2C%22details%22%3Atrue%2C%22hotlist%22%3Atrue%2C%22calendar%22%3Afalse%2C%22show_popup_button%22%3Atrue%2C%22popup_width%22%3A%221000%22%2C%22popup_height%22%3A%22650%22%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%2C%22utm_source%22%3A%22netpartner.com.vn%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22advanced-chart%22%2C%22page-uri%22%3A%22netpartner.com.vn%2Fmarkets-chart%2F%22%7D"
                width="100%"
                height="700"
                frameBorder="0"
                allowFullScreen=""
            />
            <div className="bg-gradient-to-r from-sky-500 to-blue-700 w-[400px] my-10 pl-4">
                <p className="font-bold text-2xl py-5">Nhận định thị trường</p>
            </div>
        </div>
    )
}