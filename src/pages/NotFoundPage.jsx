import { Empty, Typography } from 'antd'

import CustomButton from '../components/CustomButton/CustomButton'

function NotFoundPage() {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={<Typography.Text>Sorry, this page does not exist.</Typography.Text>}
    >
      <CustomButton to="/">Back to home</CustomButton>
    </Empty>
  )
}

export default NotFoundPage
