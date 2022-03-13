import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      return onError(new Error("请确认两次输入的密码相同"));
    }
    run(
      register(values).catch((err) => {
        onError(err);
      })
    );
    // try {
    //   await register(values);
    // } catch (err) {
    //   // onError(err);
    // }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input
          placeholder={"确认密码"}
          type="password"
          id={"cpassword"}
        ></Input>
      </Form.Item>
      <Button loading={isLoading} htmlType={"submit"} type={"primary"}>
        注册
      </Button>
    </Form>
  );
};
