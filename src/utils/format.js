
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

export const DecimalNumber = (num, n) => {
    let base = 10**n;
    let result = Math.round(num * base) / base ;
    
    return result;
}