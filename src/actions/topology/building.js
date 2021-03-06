export const SET_CURRENT_DATACENTER = "SET_CURRENT_DATACENTER";
export const RESET_CURRENT_DATACENTER = "RESET_CURRENT_DATACENTER";
export const START_NEW_ROOM_CONSTRUCTION = "START_NEW_ROOM_CONSTRUCTION";
export const START_NEW_ROOM_CONSTRUCTION_SUCCEEDED =
  "START_NEW_ROOM_CONSTRUCTION_SUCCEEDED";
export const FINISH_NEW_ROOM_CONSTRUCTION = "FINISH_NEW_ROOM_CONSTRUCTION";
export const CANCEL_NEW_ROOM_CONSTRUCTION = "CANCEL_NEW_ROOM_CONSTRUCTION";
export const CANCEL_NEW_ROOM_CONSTRUCTION_SUCCEEDED =
  "CANCEL_NEW_ROOM_CONSTRUCTION_SUCCEEDED";
export const START_ROOM_EDIT = "START_ROOM_EDIT";
export const FINISH_ROOM_EDIT = "FINISH_ROOM_EDIT";
export const ADD_TILE = "ADD_TILE";
export const DELETE_TILE = "DELETE_TILE";

export function setCurrentDatacenter(datacenterId) {
  return {
    type: SET_CURRENT_DATACENTER,
    datacenterId
  };
}

export function resetCurrentDatacenter() {
  return {
    type: RESET_CURRENT_DATACENTER
  };
}

export function startNewRoomConstruction() {
  return {
    type: START_NEW_ROOM_CONSTRUCTION
  };
}

export function startNewRoomConstructionSucceeded(roomId) {
  return {
    type: START_NEW_ROOM_CONSTRUCTION_SUCCEEDED,
    roomId
  };
}

export function finishNewRoomConstruction() {
  return (dispatch, getState) => {
    const { objects, construction } = getState();
    if (
      objects.room[construction.currentRoomInConstruction].tileIds.length === 0
    ) {
      dispatch(cancelNewRoomConstruction());
      return;
    }

    dispatch({
      type: FINISH_NEW_ROOM_CONSTRUCTION
    });
  };
}

export function cancelNewRoomConstruction() {
  return {
    type: CANCEL_NEW_ROOM_CONSTRUCTION
  };
}

export function cancelNewRoomConstructionSucceeded() {
  return {
    type: CANCEL_NEW_ROOM_CONSTRUCTION_SUCCEEDED
  };
}

export function startRoomEdit() {
  return (dispatch, getState) => {
    const { interactionLevel } = getState();
    dispatch({
      type: START_ROOM_EDIT,
      roomId: interactionLevel.roomId
    });
  };
}

export function finishRoomEdit() {
  return {
    type: FINISH_ROOM_EDIT
  };
}

export function toggleTileAtLocation(positionX, positionY) {
  return (dispatch, getState) => {
    const { objects, construction } = getState();

    const tileIds =
      objects.room[construction.currentRoomInConstruction].tileIds;
    for (let index in tileIds) {
      if (
        objects.tile[tileIds[index]].positionX === positionX &&
        objects.tile[tileIds[index]].positionY === positionY
      ) {
        dispatch(deleteTile(tileIds[index]));
        return;
      }
    }
    dispatch(addTile(positionX, positionY));
  };
}

export function addTile(positionX, positionY) {
  return {
    type: ADD_TILE,
    positionX,
    positionY
  };
}

export function deleteTile(tileId) {
  return {
    type: DELETE_TILE,
    tileId
  };
}
