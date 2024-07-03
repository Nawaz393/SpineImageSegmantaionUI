import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import { BASE_Model_URL } from '../../redux/actions/utils'
import { useNavigate } from 'react-router-dom'

interface ImageDetailProps {
  item: {
    _id: string
    image_path: string
    image_type: string
    name: string
    description: string
  }
}
const Displaycard: React.FC<ImageDetailProps> = ({ item }) => {
  const navigate = useNavigate()

  const handelClick = () => {
    if (item.image_type == '3d')
      navigate(`../visualize3d?id=${item._id}`, { replace: true })
    else navigate(`../visualize2d?id=${item._id}`, { replace: true })
  }
  return (
    <Card
      style={{ width: 300 }}
      hoverable
      cover={
        <img
          style={{ height: 250 }}
          alt="example"
          src={
            item?.image_type == '3d'
              ? `${BASE_Model_URL}/download-image/3d.jpg`
              : `${BASE_Model_URL}/download-image/${item?.image_path}`
          }
        />
      }
      onClick={handelClick}
    >
      <Meta title={item?.name} description={item?.description} />
    </Card>
  )
}

export default Displaycard
