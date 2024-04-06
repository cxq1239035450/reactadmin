import './index.scss'
import { Input, Button, Form, type FormProps, Select } from 'antd'
type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const LoginPage: FC = () => {
  const provinceData: string[] = []
  const selectBefore = (
    <Select
      defaultValue="http://"
      options={provinceData.map(province => ({
        label: province,
        value: province,
      }))}
    ></Select>
  )

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div id="loginPage">
      <div className="card">
        <h1>Login Page</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Input addonBefore={selectBefore} className="mb-16px" />

          <Input />
          <Button className="loginBtn">登陆/注册</Button>
          <div className="mt-30px ft-12">
            注册或登录即代表您同意《用户协议》和《隐私协议》
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
