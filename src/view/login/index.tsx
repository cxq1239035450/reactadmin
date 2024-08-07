import './index.scss'
import { Input, Button, Form, type FormProps, Select } from 'antd'
type FieldType = {
  username?: string
  password?: string
}

const LoginPage: FC = () => {
  const provinceData: string[] = []

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div id="loginPage">
      <div className="card">
        <h1 className='title'>Login Page</h1>
        <Form
          name="basic"
          initialValues={{
            username: "",
            password: "",
            remember:true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember">
            <Button type="primary" htmlType="submit" className="loginBtn">登陆/注册</Button>
          </Form.Item>
          <div className="mt-30px ft-12">
            注册或登录即代表您同意《用户协议》和《隐私协议》
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
