// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  SHOW_ADD_UNIT_POPUP: "[SHOW ADD UNIT] Action",
  SHOW_EDIT_UNIT_POPUP: "[SHOW EDIT UNIT POPUP] Action",
  HIDE_POPUP: "[HIDE_POPUP] Action",
  FORCE_RELOAD: "[FORCE_RELOAD] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  showAddEdit: false,
  selectedUnitId: null,
  needReload: false,
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET: {
      return initialState;
    }

    case actionTypes.SHOW_ADD_UNIT_POPUP: {
      return { ...state, showAddEdit: true, selectedUnitId: null };
    }

    case actionTypes.SHOW_EDIT_UNIT_POPUP: {
      return { ...state, showAddEdit: true, selectedUnitId: action.payload };
    }

    case actionTypes.HIDE_POPUP: {
      return { ...state, showAddEdit: null, selectedUnitId: null };
    }

    case actionTypes.FORCE_RELOAD: {
      return { ...state, needReload: true };
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  showAddPopup: () => ({ type: actionTypes.SHOW_ADD_UNIT_POPUP }),
  showEditPopup: (payload) => ({
    type: actionTypes.SHOW_EDIT_UNIT_POPUP,
    payload,
  }),
  hidePopup: () => ({ type: actionTypes.HIDE_POPUP }),
  forceReload: () => ({ type: actionTypes.FORCE_RELOAD }),
};
