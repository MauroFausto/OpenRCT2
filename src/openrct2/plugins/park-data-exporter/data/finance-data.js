export function getFinancialData() {
    return {
        currentParkValue: park.value,
        cash:             park.cash,
        loan:             park.loan,
        maxLoan:          park.maxLoan,
        entranceFee:      park.entranceFee
    };
}
