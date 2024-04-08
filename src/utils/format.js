
export const FormatDollar = (price) => {
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return USDollar.format(price)
}

export const FormatVND = (price) => {
    const VND = new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    });

    return VND.format(price)
}