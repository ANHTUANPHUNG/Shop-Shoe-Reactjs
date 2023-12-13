import React, { useState } from "react";
function InitState() {
    // để tránh việc 1 hàm bị gọi lại mỗi lần khi set giá trị, nên đưa nó vào
    // initial State để làm callback và nhận về giá trị return để tránh việc hàm chạy lại nhiều lần
    // không nên -----------------
    // const bills = [200, 250, 540, 230]
    // const total = bills.reduce(function (prevValue, curValue) {
    //     return prevValue + curValue;
    // }, 0) 
    // const [totalAmount, setTotalAmount] = useState(total)
    // nên -------------
    const [totalAmount, setTotalAmount] = useState(() => {
        const bills = [200, 250, 540, 230]
        const total = bills.reduce(function (prevValue, curValue) {
            return prevValue + curValue;
        }, 0)
        return total;
    })
    const [amount, setAmount] = useState(0)
    const handleInputAmount = (e) => {
        setAmount(Number(e.target.value))

    }
    const handlePayment = () => {
        setTotalAmount(totalAmount + amount)

    }
    return (
        <div className="container mt-4">
            <h3> để tránh việc 1 hàm bị gọi lại mỗi lần khi set giá trị, nên đưa nó vào initial State để làm callback và nhận về giá trị return để tránh việc hàm chạy lại nhiều lần</h3>

            <input type="number" onInput={handleInputAmount} />
            <button onClick={handlePayment}>Payment</button>
            <br />
            <h1>Total amount: {totalAmount}</h1>
        </div>)
}
export default InitState;