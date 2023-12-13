import React, { useState } from "react";

function SuccessAlert(props) {
    const { showAlert, setShowAlert, content } = props;
    return (
        <>
            {
                showAlert && (
                    <div className="alert alert-success d-flex justify-content-between" role="alert">
                        {content || 'Login'}  <span onClick={() => { setShowAlert(false) }} role="button">&times;</span>
                    </div>
                )
            }
        </>
    )
}
export default SuccessAlert