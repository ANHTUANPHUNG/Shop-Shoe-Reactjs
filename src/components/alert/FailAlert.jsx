import React from "react";

function FailAlert(props) {
    const { showAlert, setShowAlert, content } = props
    return (
        <>
            {
                showAlert && (
                    <div className="alert alert-danger d-flex justify-content-between" role="alert">
                        {content || ' Login Fail'} <span onClick={() => { setShowAlert(false) }} role="button">&times;</span>
                    </div>
                )
            }
        </>
    )
}
export default FailAlert