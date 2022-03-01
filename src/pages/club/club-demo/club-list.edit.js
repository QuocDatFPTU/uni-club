import { Form, Modal } from "antd";
import React, { useState } from "react";

const ClubEditForm = ({ item, onCallback, isEditModal, setIsEditModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState();

  return (
    <div>
      <Modal visible={false} on></Modal>
    </div>
  );
};

export default ClubEditForm;
