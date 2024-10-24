export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
    }).format(value);
};

export const formatCurrencySingle = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    }).format(amount);
};

