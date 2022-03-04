import { Modal } from "antd";
import React from "react";

export const success = (title) => {
	Modal.success({
		content: title,
		onOk() {
			window.history.back();
		}
	});
};
