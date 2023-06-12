import React, { useState } from 'react';


export default function DatePicker(props: { setDatetime: React.Dispatch<React.SetStateAction<string>> }) {
    const { setDatetime } = props
    const [selectedDT, setSelectedDT] = useState({ date: '', time: '' })

    function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault()
        if (selectedDT.date && selectedDT.time) {
            setDatetime(`${selectedDT.date}T${selectedDT.time}:00`)
        }
    }

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        console.log(evt)
        setSelectedDT({ ...selectedDT, [evt.target.name]: evt.target.value })
        console.log(selectedDT)
    }

    function handleReset(evt: React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault()
        const target = evt.target as HTMLButtonElement;
        setDatetime('');
        if (target.form) {
            target.form.date.value = '';
            target.form.time.value = '';
        }

    }

    function openForm(evt: React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault()
        const target = evt.target as HTMLButtonElement;
        if (target.form) {
            target.form.classList.toggle('closedForm');
        }
        target.innerText = target.innerText === "▲" ? "▼" : "▲"
    }


    return <form onSubmit={handleSubmit} className="datetimeForm closedForm">
        <label className="infoLabel">Get historical data</label>
        <button className="button" id="formExpand" onClick={openForm}>▼</button>
        <br />
        <input type="date" onChange={handleChange} name="date" />
        <input type="time" onChange={handleChange} name="time" />
        <button className="button">Go</button>
        <button className="button" onClick={handleReset}>Reset</button>
    </form>
}