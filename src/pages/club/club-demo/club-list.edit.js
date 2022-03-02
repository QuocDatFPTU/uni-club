import { Col, Form, Modal, Upload, Row, Input, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { createClub, updateClub } from "./club.service";
import "./styles.less";
const ClubEditForm = ({ item, onCallback, isEditModal, setIsEditModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [isEditModal]);

  const getDateNow = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const onCancel = () => {
    setIsEditModal(false);
  };
  const initalValue = {
    id: item ? item.id : undefined,
    "club-name": item ? item["club-name"] : "",
    "short-name": item ? item["short-name"] : "",
    description: item ? item.description : "",
    "short-description": item ? item["short-description"] : "",
    "avatar-url": item ? item["avart-url"] : "",
    "established-date": item ? item["established-date"] : "",
    slogan: item ? item.slogan : "",
  };

  return (
    <div>
      <Modal
        title={item ? "Edit Club" : "Create Club"}
        visible={isEditModal}
        width={1024}
        centered
        footer={null}
        forceRender={true}
        afterClose={() => {
          form.resetFields();
        }}
        onCancel={onCancel}
      >
        <Form
          colon={false}
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={async (values) => {
            try {
              setLoading(true);
              //create
              if (!item) {
                const createClubData = {
                  ...values,
                  "established-date": getDateNow(),
                };
                await createClub(createClubData)
                  .then(message.success("Create club successfully!"))
                  .catch((error) => message.error(error.message));
                setLoading(false);
                onCallback();
              } else {
                //update
                const updateClubData = {
                  ...values,
                  "avatar-url": "",
                  "established-date": item["established-date"],
                };
                await updateClub(updateClubData)
                  .then((result) => {
                    message.success("Update club successfully");
                    setLoading(false);
                    onCallback();
                  })
                  .catch((error) => {
                    message.error(error.message);
                    setLoading(false);
                  });
              }
            } catch (error) {
              message.error(error.message);
              setLoading(false);
              return false;
            }
          }}
          initialValues={initalValue}
        >
          <Row>
            <Col span={8}>
              <Form.Item name="avatar-url" label="Avartar Image">
                <Upload
                  accept="image/*"
                  maxCount={1}
                  className="UploadImage"
                  listType="picture-card"
                >
                  {"+ Upload "}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Row gutter={24} type="flex">
                {item && (
                  <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                    <Form.Item
                      label="ID"
                      name="id"
                      rules={[
                        {
                          required: true,
                          message: "ID must be entered!",
                        },
                      ]}
                    >
                      <Input disabled={true} />
                    </Form.Item>
                  </Col>
                )}
                <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Club Name"
                    name="club-name"
                    rules={[
                      {
                        required: true,
                        message: "Club name must be entered!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Short Name"
                    name="short-name"
                    rules={[
                      {
                        required: true,
                        message: "Club name must be entered!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Club name must be entered!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Short description"
                    name="short-description"
                    rules={[
                      {
                        required: true,
                        message: "Club name must be entered!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                  <Form.Item
                    label="Slogan"
                    name="slogan"
                    rules={[
                      {
                        required: true,
                        message: "Club name must be entered!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <div
                className="ant-modal-footer"
                style={{ marginLeft: -24, marginRight: -24, marginBottom: -24 }}
              >
                <Row gutter={24} type="flex" style={{ textAlign: "right" }}>
                  <Col
                    className="gutter-row"
                    span={24}
                    style={{ textAlign: "right" }}
                  >
                    <Button
                      type="clear"
                      onClick={onCancel}
                      style={{ fontWeight: "bold" }}
                    >
                      {"Cancel"}
                    </Button>
                    {loading === false ? (
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ fontWeight: "bold" }}
                      >
                        {"Save"}
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        loading
                        style={{ fontWeight: "bold" }}
                      >
                        {"Loading"}
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ClubEditForm;
