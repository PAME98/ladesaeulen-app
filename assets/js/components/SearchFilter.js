import React, {useEffect, useState} from 'react';

const LoadingStationTable = (props) => {

    const [filters, setFilters] = useState(
        {
            city: "",
            address: "",
            postalCode: "",
            description: ""
        }
    );

    function handleChange(event) {
        setFilters({
                ...filters,
                [event.target.name]: event.target.value
            },
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.setFilters(filters);
        props.loadCsvData(filters)

    }

    useEffect(() => {

    }, [])

    return (
        <div className="searchFilter">
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="form-row searchGroup">

 <span className=""><input className="form-control" placeholder="Ort " name="city" type="text"
                                           value={filters.city}
                                           onChange={(event) => handleChange(event)}/></span>
                    <span className="d-flex"><input className="form-control" placeholder="Straße"
                                                                          name="address" type="text"
                                                                          value={filters.address}
                                                                          onChange={(event) => handleChange(event)}/></span>
                    <span className=""><input className="form-control"
                                                                          placeholder="PLZ"
                                                                          name="postalCode" type="text"
                                                                          value={filters.postalCode}
                                                                          onChange={(event) => handleChange(event)}/></span>
                    <span className=""><input className="form-control"
                                                                          placeholder="Ladeleistung"
                                                                          name="description" type="text"
                                                                          value={filters.description}
                                                                          onChange={(event) => handleChange(event)}/></span>
                    <button type="submit" className="d-none"></button>
                </div>
            </form>
        </div>
    );
}

export default LoadingStationTable;