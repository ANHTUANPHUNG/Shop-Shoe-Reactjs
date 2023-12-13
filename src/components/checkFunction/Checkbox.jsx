import React, { useState, useEffect } from "react";

const CheckboxFunction = () => {
    const [selected, setSelected] = useState([]);
    const hobbies = ['Football', 'Swimming', 'Walking'];

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const handleChange = (e) => {
        let newList = [...selected];
        if (newList.includes(e.target.value)) {
            newList = newList.filter((item) => item !== e.target.value);
        } else {
            newList = [...newList, e.target.value];
        }
        setSelected(newList);
    };

    return (
        <>
            <h3>Please choice Checkbox Function </h3>
            {hobbies.map((hobby) => (
                <div key={hobby}>
                    <label>
                        <input
                            checked={selected.includes(hobby)}
                            type="checkbox"
                            className="hobby"
                            onChange={handleChange}
                            value={hobby}
                        />
                        {hobby}
                    </label>
                </div>
            ))}
        </>
    );
};

export default CheckboxFunction;
