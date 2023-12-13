import React from "react";


class RadioFunction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '',
            hobbies: ['Football', 'Swimming', 'Walking']
        }
    }
    componentDidUpdate() {
        console.log(this.state.selected);
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            selected: e.target.value
        })
    }
    render() {
        return (
            <>
                <h3>Please choice Radio Function</h3>
                {
                    this.state.hobbies.map((e) => (
                        <div key={e}>
                            <label>
                                <input
                                    checked={this.state.selected === e}
                                    type="radio"
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
export default RadioFunction;