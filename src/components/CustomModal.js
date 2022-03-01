import React from "react";
import { Modal } from "antd";
import { useEffect, useState } from "react";

const CustomModal = (props) => {
	const [visible, setVisible] = useState(false);

	const onClose = () => {
		setVisible(false);
		props.callbackVisiableOff();
	};

	const onOk = () => {
		props.onOk();
		setVisible(false);
		props.callbackVisiableOff();
	};

	useEffect(() => {
		if (props.visibleOn) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}, [props]);

	return (
		<Modal
			footer={null}
			forceRender
			visible={visible}
			onOk={onClose}
			onCancel={onClose}
		>
			{props.children}
		</Modal>
	);
};

export default CustomModal;
