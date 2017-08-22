import PropTypes from "prop-types";
import React from 'react';
import {Link} from "react-router-dom";

const SimulationActionButtons = ({simulationId, onViewUsers, onDelete}) => (
    <div className="simulation-icons">
        <Link to={"/simulations/" + simulationId} className="open" title="Open this simulation">
            <span className="fa fa-play"/>
        </Link>
        <div className="users" title="View and edit collaborators on this simulation"
             onClick={() => onViewUsers(simulationId)}>
            <span className="fa fa-users"/>
        </div>
        <div className="delete" title="Delete this simulation" onClick={() => onDelete(simulationId)}>
            <span className="fa fa-trash"/>
        </div>
    </div>
);

SimulationActionButtons.propTypes = {
    simulationId: PropTypes.number.isRequired,
    onViewUsers: PropTypes.func,
    onDelete: PropTypes.func,
};

export default SimulationActionButtons;