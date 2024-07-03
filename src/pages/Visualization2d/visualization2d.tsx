import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getImageData } from '../../redux/api/getImageApi'
import { ToastContainer, toast } from 'react-toastify'
import { BASE_Model_URL } from '../../redux/actions/utils'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Visualization2d = () => {
  const location = useLocation()
  const [imageData, setImageData] = useState<any>()
  useEffect(() => {
    ;(async () => {
      try {
        const id = new URLSearchParams(location.search).get('id') as string
        const res = await getImageData(id)
        if (res.error) {
          toast.error(res.error)
          return
        }
        toast.success('Image fetched Successfully')
        setImageData(res.data)
        console.log(res.data)
      } catch (error) {
        toast.error('unexpected Error Occurred')
      }
    })()
  }, [])

  return (
    <div className="h-full w-full ">
      <ToastContainer />
      <h1 className="text-center font-mono text-xl font-bold">
        2D Segmanatation Result{' '}
      </h1>
      <div className="grid grid-cols-2 place-content-evenly pl-36 pt-2">
        <div>
          <h5 className="ml-36 mb-2 font-bold font-poppins text-lg">Image</h5>
          <img
            src={`${BASE_Model_URL}/download-image/${imageData?.image_path}`}
            alt="image"
            className="h-80 rounded"
          />
          <div className="">
            <a
              href={`${BASE_Model_URL}/download-image/${imageData?.image_path}`}
              download
              className="mx-10 my-5  bg-black  py-3 px-4 w-20 rounded  h-10 text-white font-semibold font-mono"
            >
              Download
            </a>
            <CopyToClipboard
              text={`${BASE_Model_URL}/download-image/${imageData?.image_path}`}
              onCopy={() => {
                toast.success('url copied')
                console.log('copied ')
              }}
            >
              <button className="mx-10 my-5  bg-black py-3 px-4  w-20 rounded  text-white font-semibold font-mono">
                Share
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div>
          <h5 className="ml-36 mb-2 font-bold font-poppins text-lg">Mask</h5>
          <img
            src={`${BASE_Model_URL}/image/${imageData?.mask_path}`}
            alt="image"
            className="h-80 rounded"
          />
          <div className="">
            <a
              href={`${BASE_Model_URL}/download-image/${imageData?.mask_path}`}
              download
              className="mx-10 my-5 bg-black  py-3 px-4 w-20 h-10 rounded text-white font-semibold font-mono"
            >
              Download
            </a>
            <CopyToClipboard
              text={`${BASE_Model_URL}/download-image/${imageData?.mask_path}`}
              onCopy={() => {
                toast.success('url copied')
                console.log('copied ')
              }}
            >
              <button className="mx-10 my-5  bg-black py-3 px-4  w-20 rounded  text-white font-semibold font-mono">
                Share
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Visualization2d
