import { useEffect, useState } from 'react'
import Displaycard from './Displaycard'
import { getPreviousImages } from '../../redux/api/getPreviousImages'
import { ToastContainer, toast } from 'react-toastify'

const PrevUploads = () => {
  const [prevUploads, setPrevUploads] = useState<any>([])
  useEffect(() => {
    ;(async () => {
      try {
        const res = await getPreviousImages()
        console.log(res.data)
        if (res.error) {
          toast.error(res.error)
        } else {
          toast.success('previous Results fetched successfully')
          setPrevUploads(res.data)
        }
      } catch (error) {
        console.log(error)
        toast.error('Error fetching previous Results')
      }
    })()
  }, [])

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="grid grid-cols-3 place-content-center gap-x-10 gap-y-10 ">
        {prevUploads?.map((item: any) => {
          console.log(item)
          return <Displaycard key={item._id} item={item} />
        })}
      </div>
    </div>
  )
}

export default PrevUploads
