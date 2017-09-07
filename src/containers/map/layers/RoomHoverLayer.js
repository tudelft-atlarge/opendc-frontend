import {connect} from "react-redux";
import {toggleTileAtLocation} from "../../../actions/topology";
import RoomHoverLayerComponent from "../../../components/map/layers/RoomHoverLayerComponent";
import {
    deriveValidNextTilePositions,
    findPositionInPositions,
    findPositionInRooms
} from "../../../util/tile-calculations";

const mapStateToProps = state => {
    return {
        isEnabled: () => state.construction.currentRoomInConstruction !== -1,
        isValid: (x, y) => {
            if (state.interactionLevel.mode !== "BUILDING") {
                return false;
            }

            const newRoom = Object.assign({}, state.objects.room[state.construction.currentRoomInConstruction]);
            const oldRooms = Object.keys(state.objects.room)
                .map(id => Object.assign({}, state.objects.room[id]))
                .filter(room => room.datacenterId === state.currentDatacenterId
                    && room.id !== state.construction.currentRoomInConstruction);

            [...oldRooms, newRoom].forEach(room => {
                room.tiles = room.tileIds.map(tileId => state.objects.tile[tileId]);
            });
            if (newRoom.tileIds.length === 0) {
                return findPositionInRooms(oldRooms, x, y) === -1;
            }

            const validNextPositions = deriveValidNextTilePositions(oldRooms, newRoom.tiles);
            return findPositionInPositions(validNextPositions, x, y) !== -1;
        },
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: (x, y) => dispatch(toggleTileAtLocation(x, y)),
    };
};

const RoomHoverLayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomHoverLayerComponent);

export default RoomHoverLayer;