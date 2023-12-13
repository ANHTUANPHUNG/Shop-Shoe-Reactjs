import React from "react";


class CheckboxClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            hobbies: ['Football', 'Swimming', 'Walking']
        }
    }
    componentDidUpdate() {
        console.log(this.state.selected);
    }
    handleChange = (e) => {
        let newList = [...this.state.selected]
        if (newList.includes(e.target.value)) {
            newList = newList.filter((item) => (item != e.target.value))
        } else {
            newList = [...newList, e.target.value]
        }
        this.setState({
            ...this.state,
            selected: newList
        })
    }
    render() {
        return (
            <>
                <h3>Please choice Checkbox Class</h3>
                {
                    this.state.hobbies.map((e) => (
                        <div key={e}>
                            <label>
                                <input
                                    checked={this.state.selected.includes(e)}
                                    type="checkbox"
                                    className="hobby"
                                    onChange={this.handleChange}
                                    value={e}
                                />
                                {e}
                            </label>
                        </div>
                    ))
                }
            </>
        )
    }
}
export default CheckboxClass;