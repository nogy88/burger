import React, { useState } from "react";
import Burger from "../../components/Burger";
import BurgerControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import OrderSummary from "../../components/OrderSummary";

const BurgerPage = (props) => {
  
  const [confirmOrder, setConfirmOrder] = useState(false);
 

  const continueOrder = () => {
    closeConfirmModal();
    props.history.push("/ship");
  };

  const showConfirmModal = () => {
    setConfirmOrder(true);
  };

  const closeConfirmModal = () => {
    setConfirmOrder(false);    
  };

    return (
      <div>
        <Modal
          closeConfirmModal={closeConfirmModal}
          show={confirmOrder}
        >
            <OrderSummary
              continueOrder={continueOrder}
              closeConfirmModal={closeConfirmModal}
            />
        </Modal>

        <Burger />
        
        <BurgerControls showConfirmModal={showConfirmModal} />
      </div>
    );
}

export default BurgerPage;
