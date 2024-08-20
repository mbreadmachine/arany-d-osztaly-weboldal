import React from "react";
import { Button, Typography, Divider } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { App } from "antd";
import { MDXEditor, headingsPlugin } from "@mdxeditor/editor";

export const DevTesting = () => {
    const { notification } = App.useApp();

  const callMessage = () => {
    notification.warning({
        message: "Iskolai változás",
        description:
          "Valami megváltozott az iskolában, kérdezz meg valakit erről.",
        duration: 0,
      })
  }
  return (
    <div>
      <Typography.Title>Fejlesztői tesztelés</Typography.Title>
      <Link to="/">
        <Button type="primary" icon={<HomeOutlined />}>
          Vissza a főoldalra
        </Button>
      </Link>
      <Divider />
      <Button
        onClick={callMessage}
      >
        Üzenet tesztelése
      </Button>
      <MDXEditor markdown="" plugins={[headingsPlugin()]} />
    </div>
  );
};
