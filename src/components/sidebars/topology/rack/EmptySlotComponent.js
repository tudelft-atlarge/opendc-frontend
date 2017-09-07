import React from "react";
import FontAwesome from "react-fontawesome";

const EmptySlotComponent = ({position, onAdd}) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
            <span className="badge badge-default badge-info mr-1">
                {position}
            </span>
        <button className="btn btn-outline-primary" onClick={onAdd}>
            <FontAwesome name="plus" className="mr-1"/>
            Add machine
        </button>
    </li>
);

export default EmptySlotComponent;
